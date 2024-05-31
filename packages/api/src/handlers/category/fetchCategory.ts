import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const Category = Prisma.validator<Prisma.CategoryDefaultArgs>()({});

type Category = Prisma.CategoryGetPayload<typeof Category>;

export const fetchCategory: ApiFn<{}, AxiosPromise<Category[]>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/categories");
};

type QueryFnType = typeof fetchCategory;

type UseGetCategoryQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchCategoryQuery = ({
  config,
}: UseGetCategoryQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["getCategory"],
    queryFn: () => fetchCategory({}, { axios }),
    staleTime: 60 * 1000, // 60 seconds
    ...config,
  });
};
