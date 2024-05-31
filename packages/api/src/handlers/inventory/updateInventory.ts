import defaultAxios, { AxiosPromise } from "axios";
import { Inventory } from "@shelby/db";
import { UpdateInventoryDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type UpdateInventory = UpdateInventoryDTO & { id: string };

const updateInventory: ApiFn<UpdateInventory, AxiosPromise<Inventory>> = (
  payloadInput,
  { axios = defaultAxios }
) => {
  return axios.patch(`/inventory/${payloadInput.id}`, payloadInput);
};

type MutationFnType = typeof updateInventory;

export const useUpdateInventoryMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => updateInventory(body, { axios }),
    ...config,
  });
};
