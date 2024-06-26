import defaultAxios, { AxiosPromise } from "axios";

import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";
import { CheckoutDTO } from "@shelby/dto";

type Checkout = CheckoutDTO;

const checkout: ApiFn<Checkout, AxiosPromise<any>> = (
  payloadInput,
  { axios = defaultAxios }
) => {
  return axios.post(`/order/get-token`, payloadInput);
};

type MutationFnType = typeof checkout;

export const useCheckoutMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => checkout(body, { axios }),
    ...config,
  });
};
