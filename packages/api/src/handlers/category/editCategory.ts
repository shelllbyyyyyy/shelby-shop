import defaultAxios, { AxiosPromise } from "axios";
import { Category } from "@shelby/db";
import { CategoryDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type EditCategory = CategoryDTO & { id: string };

const editCategory: ApiFn<EditCategory, AxiosPromise<Category>> = (
  payloadInput,
  { axios = defaultAxios }
) => {
  return axios.patch(`/categories/${payloadInput.id}`, payloadInput.name);
};

type MutationFnType = typeof editCategory;

export const useEditCategoryMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => editCategory(body, { axios }),
    ...config,
  });
};
