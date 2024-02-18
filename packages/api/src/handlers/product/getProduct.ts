import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const product = Prisma.validator<Prisma.ProductDefaultArgs>()({});

type Product = Prisma.ProductGetPayload<typeof product>;

export const getProduct: ApiFn<{}, AxiosPromise<Product>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/products/korong");
};

type QueryFnType = typeof getProduct;

type UseGetProductQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProductQuery = ({ config }: UseGetProductQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["product"],
    queryFn: () => getProduct({}, { axios }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...config,
  });
};
