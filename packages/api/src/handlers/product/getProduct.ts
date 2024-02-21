import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const product = Prisma.validator<Prisma.ProductDefaultArgs>()({});

type Product = Prisma.ProductGetPayload<typeof product>;

export const getProduct: ApiFn<string, AxiosPromise<Product>> = (
  slug,
  { axios = defaultAxios }
) => {
  return axios.get(`/products/${slug}`);
};

export const useGetProductBySlugQuery = (
  slug: string,
  options?: Omit<UseQueryOptions<unknown, unknown, Product, any[]>, "queryKey">
) => {
  const { axios, api } = useApiClient();

  return useQuery({
    ...options,
    queryKey: ["product", slug],
    queryFn: async () => {
      const product = await api(getProduct(slug, { axios }));

      return product;
    },
  });
};
