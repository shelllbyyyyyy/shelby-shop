import defaultAxios, { AxiosPromise } from "axios";

import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";
import { SuccessDTO } from "@shelby/dto";

const success: ApiFn<SuccessDTO, AxiosPromise<any>> = (
  payloadInput,
  { axios = defaultAxios }
) => {
  return axios.post(`/order/success`, payloadInput);
};

type MutationFnType = typeof success;

export const useSuccessMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => success(body, { axios }),
    ...config,
  });
};
