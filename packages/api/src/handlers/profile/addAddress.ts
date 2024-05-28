import defaultAxios, { AxiosPromise } from "axios";
import { Address } from "@shelby/db";
import { AddAddressDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type AddAddress = AddAddressDTO;

const addAddress: ApiFn<AddAddress, AxiosPromise<Address>> = (
  payloadInput,
  { axios = defaultAxios }
) => {
  return axios.post(`/profiles/address`, payloadInput);
};

type MutationFnType = typeof addAddress;

export const useAddAddressMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => addAddress(body, { axios }),
    ...config,
  });
};
