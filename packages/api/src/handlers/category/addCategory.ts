import defaultAxios, { AxiosPromise } from "axios";
import { Category } from "@shelby/db";
import { CategoryDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type AddCategory = CategoryDTO;

const addCategory: ApiFn<AddCategory, AxiosPromise<Category>> = (
  payloadInput,
  { axios = defaultAxios }
) => {
  return axios.post(`/categories`, payloadInput);
};

type MutationFnType = typeof addCategory;

export const useAddCategoryMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => addCategory(body, { axios }),
    ...config,
  });
};
