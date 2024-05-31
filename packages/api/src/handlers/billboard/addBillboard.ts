import defaultAxios, { AxiosPromise } from "axios";
import { Billboard } from "@shelby/db";
import { BillboardDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type AddBillboardDTOWithFile = BillboardDTO & { imageFile: File | null };

const addBillboard: ApiFn<AddBillboardDTOWithFile, AxiosPromise<Billboard>> = (
  addBillboardDTO,
  { axios = defaultAxios }
) => {
  const { tittle, section, imageFile, label } = addBillboardDTO;

  const addBillboardFormData = new FormData();

  if (tittle) {
    addBillboardFormData.append("tittle", tittle);
  }

  if (label) {
    addBillboardFormData.append("label", label);
  }

  if (section) {
    addBillboardFormData.append("section", section);
  }

  if (imageFile) {
    addBillboardFormData.append("billboard-image", imageFile);
  }

  return axios.post("/billboard", addBillboardDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type MutationFnType = typeof addBillboard;

export const useAddBillboardMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => addBillboard(body, { axios }),
    ...config,
  });
};
