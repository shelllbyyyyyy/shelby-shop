import defaultAxios, { AxiosPromise } from "axios";
import { Cart } from "@shelby/db";
import { AddToCartDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const addCart: ApiFn<AddToCartDTO, AxiosPromise<Cart>> = (
  payload,
  { axios = defaultAxios }
) => {
  return axios.post(`/cart`, payload);
};

type MutationFnType = typeof addCart;

export const useAddCartMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => addCart(body, { axios }),
    ...config,
  });
};
