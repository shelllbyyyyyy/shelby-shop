import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const Billboard = Prisma.validator<Prisma.BillboardDefaultArgs>()({});

type Billboard = Prisma.BillboardGetPayload<typeof Billboard>;

export const fetchBillboard: ApiFn<{}, AxiosPromise<Billboard[]>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/billboard");
};

type QueryFnType = typeof fetchBillboard;

type UseGetBillboardQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchBillboardQuery = ({
  config,
}: UseGetBillboardQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["billboard"],
    queryFn: () => fetchBillboard({}, { axios }),
    staleTime: 60 * 1000, // 60 seconds
    ...config,
  });
};
