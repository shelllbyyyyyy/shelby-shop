import defaultAxios, { AxiosPromise } from "axios";
import { Cart } from "@shelby/db";
import { UpdateCartDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const updateCart: ApiFn<UpdateCartDTO, AxiosPromise<Cart>> = (
  payload,
  { axios = defaultAxios }
) => {
  return axios.patch(`/cart`, payload);
};

type MutationFnType = typeof updateCart;

export const useUpdateCartMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => updateCart(body, { axios }),
    ...config,
  });
};
