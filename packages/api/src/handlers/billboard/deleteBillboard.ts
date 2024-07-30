import defaultAxios, { AxiosPromise } from "axios";
import { Billboard } from "@shelby/db";
import { EditBillboardDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const deleteBillboard: ApiFn<{ id: string }, AxiosPromise<Billboard>> = (
  { id },
  { axios = defaultAxios }
) => {
  return axios.delete(`/billboard/${id}`);
};

type MutationFnType = typeof deleteBillboard;

export const useDeleteBillboardMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => deleteBillboard(body, { axios }),
    ...config,
  });
};
