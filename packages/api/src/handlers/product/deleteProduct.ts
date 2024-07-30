import defaultAxios, { AxiosPromise } from "axios";
import { Product } from "@shelby/db";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const deleteProduct: ApiFn<{ slug: string }, AxiosPromise<Product>> = (
  { slug },
  { axios = defaultAxios }
) => {
  return axios.delete(`/products/${slug}`);
};

type MutationFnType = typeof deleteProduct;

export const useDeleteProductMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => deleteProduct(body, { axios }),
    ...config,
  });
};
