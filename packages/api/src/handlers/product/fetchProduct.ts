import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const product = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    categoriesOnProducts: { select: { category: { select: { name: true } } } },
  },
});

type Product = Prisma.ProductGetPayload<typeof product>;

export const fetchProduct: ApiFn<{}, AxiosPromise<Product[]>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/products");
};

type QueryFnType = typeof fetchProduct;

type UseGetProductQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchProductQuery = ({ config }: UseGetProductQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["product"],
    queryFn: () => fetchProduct({}, { axios }),
    ...config,
  });
};
