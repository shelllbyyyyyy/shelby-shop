import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { ApiFn } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const category = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { categoriesOnProducts: { include: { product: true } } },
});

type Category = Prisma.CategoryGetPayload<typeof category>;

export const getCategory: ApiFn<{ id: string }, AxiosPromise<Category>> = (
  { id },
  { axios = defaultAxios }
) => {
  return axios.get(`/categories/${id}`);
};

export const useGetCategoryQuery = (
  query: { id: string },
  options?: Omit<UseQueryOptions<unknown, unknown, Category, any[]>, "queryKey">
) => {
  const { axios, api } = useApiClient();

  return useQuery({
    queryKey: ["category", query],
    queryFn: async () => {
      const category = await api(getCategory(query, { axios }));

      return category;
    },
    ...options,
  });
};
