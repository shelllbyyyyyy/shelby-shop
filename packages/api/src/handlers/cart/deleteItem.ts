import defaultAxios, { AxiosPromise } from "axios";
import { Cart } from "@shelby/db";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const deleteCart: ApiFn<{}, AxiosPromise<Cart>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.put(`/cart`, {});
};

type MutationFnType = typeof deleteCart;

export const useDeleteCartMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => deleteCart(body, { axios }),
    ...config,
  });
};
