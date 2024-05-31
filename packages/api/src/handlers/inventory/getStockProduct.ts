import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { ApiFn } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const inventory = Prisma.validator<Prisma.InventoryDefaultArgs>()({});

type GetStockProduct = Prisma.InventoryGetPayload<typeof inventory>;

export const GetStockProduct: ApiFn<
  { id: string },
  AxiosPromise<GetStockProduct>
> = ({ id }, { axios = defaultAxios }) => {
  return axios.get(`/inventory/${id}`);
};

export const useGetStockProductQuery = (
  query: { id: string },
  options?: Omit<
    UseQueryOptions<unknown, unknown, GetStockProduct, any[]>,
    "queryKey"
  >
) => {
  const { axios, api } = useApiClient();

  return useQuery({
    queryKey: ["getInventory", query],
    queryFn: async () => {
      const Inventory = await api(GetStockProduct(query, { axios }));

      return Inventory;
    },
    ...options,
  });
};
