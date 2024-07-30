import defaultAxios, { AxiosPromise } from "axios";
import { Category } from "@shelby/db";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const deleteCategory: ApiFn<{ id: string }, AxiosPromise<Category>> = (
  id,
  { axios = defaultAxios }
) => {
  return axios.delete(`/categories/${id}`);
};

type MutationFnType = typeof deleteCategory;

export const useDeleteCategoryMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => deleteCategory(body, { axios }),
    ...config,
  });
};
