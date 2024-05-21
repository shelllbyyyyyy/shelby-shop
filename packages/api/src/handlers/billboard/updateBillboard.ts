import defaultAxios, { AxiosPromise } from "axios";
import { Billboard } from "@shelby/db";
import { EditBillboardDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type UpdateBillboardDTOWithFile = EditBillboardDTO & {
  imageFile?: File;
  id: string;
};

const updateBillboard: ApiFn<
  UpdateBillboardDTOWithFile,
  AxiosPromise<Billboard>
> = (UpdateBillboardDTO, { axios = defaultAxios }) => {
  const { tittle, section, imageFile, label, id } = UpdateBillboardDTO;

  const updateBillboardFormData = new FormData();

  if (tittle) {
    updateBillboardFormData.append("tittle", tittle);
  }

  if (label) {
    updateBillboardFormData.append("label", label);
  }

  if (section) {
    updateBillboardFormData.append("section", section);
  }

  if (imageFile) {
    updateBillboardFormData.append("billboard-image", imageFile);
  }

  return axios.patch(`/billboard/${id}`, UpdateBillboardDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type MutationFnType = typeof updateBillboard;

export const useUpdateBillboardMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => updateBillboard(body, { axios }),
    ...config,
  });
};
