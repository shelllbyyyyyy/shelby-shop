import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@shelby/db";
import defaultAxios, { AxiosPromise } from "axios";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const cart = Prisma.validator<Prisma.CartDefaultArgs>()({
  include: {
    productVariant: { include: { inventory: true } },
  },
});

export type Cart = Prisma.CartGetPayload<typeof cart>;

export const getCart: ApiFn<{}, AxiosPromise<Cart[]>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/cart");
};

type QueryFnType = typeof getCart;

type UseGetCartQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetCartQuery = ({ config }: UseGetCartQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["getCart"],
    queryFn: () => getCart({}, { axios }),
    ...config,
  });
};
