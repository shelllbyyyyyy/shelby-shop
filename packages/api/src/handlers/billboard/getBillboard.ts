import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { ApiFn } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const billboard = Prisma.validator<Prisma.BillboardDefaultArgs>()({});

type Billboard = Prisma.BillboardGetPayload<typeof billboard>;

export const getBillboard: ApiFn<{ id: string }, AxiosPromise<Billboard>> = (
  { id },
  { axios = defaultAxios }
) => {
  return axios.get(`/billboard/${id}`);
};

export const useGetBillboardQuery = (
  query: { id: string },
  options?: Omit<
    UseQueryOptions<unknown, unknown, Billboard, any[]>,
    "queryKey"
  >
) => {
  const { axios, api } = useApiClient();

  return useQuery({
    queryKey: ["billboard", query],
    queryFn: async () => {
      const Billboard = await api(getBillboard(query, { axios }));

      return Billboard;
    },
    ...options,
  });
};
