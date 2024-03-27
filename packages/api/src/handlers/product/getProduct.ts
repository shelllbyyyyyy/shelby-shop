import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { ApiFn } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const product = Prisma.validator<Prisma.ProductDefaultArgs>()({});

type Product = Prisma.ProductGetPayload<typeof product>;

export const getProduct: ApiFn<{ slug: string }, AxiosPromise<Product>> = (
  { slug },
  { axios = defaultAxios }
) => {
  return axios.get(`/products/${slug}`);
};

export const useGetProductQuery = (
  query: { slug: string },
  options?: Omit<UseQueryOptions<unknown, unknown, Product, any[]>, "queryKey">
) => {
  const { axios, api } = useApiClient();

  return useQuery({
    queryKey: ["product", query],
    queryFn: async () => {
      const product = await api(getProduct(query, { axios }));

      return product;
    },
    ...options,
  });
};
