import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const inventory = Prisma.validator<Prisma.InventoryDefaultArgs>()({
  include: {
    productVariant: { include: { product: true } },
  },
});

type Inventory = Prisma.InventoryGetPayload<typeof inventory>;

export const fetchInventory: ApiFn<{}, AxiosPromise<Inventory[]>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/inventory");
};

type QueryFnType = typeof fetchInventory;

type UseGetInventoryQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchInventoryQuery = ({
  config,
}: UseGetInventoryQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["getInventory"],
    queryFn: () => fetchInventory({}, { axios }),
    ...config,
  });
};
