import { useMutation } from "@tanstack/react-query";
import { User } from "@shelby/db";
import { EditProfileDTO } from "@shelby/dto";
import defaultAxios, { AxiosPromise } from "axios";
import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type EditProfileDTOWithFile = EditProfileDTO & { profilePictureFile?: File };

export const editProfile: ApiFn<EditProfileDTOWithFile, AxiosPromise<User>> = (
  editProfileDTO,
  { axios = defaultAxios }
) => {
  const { name, phoneNumber, profilePictureFile } = editProfileDTO;

  const editProfileFormData = new FormData();

  if (name) {
    editProfileFormData.append("name", name);
  }

  if (phoneNumber) {
    editProfileFormData.append("phoneNumber", phoneNumber);
  }

  if (profilePictureFile) {
    editProfileFormData.append("profile-picture", profilePictureFile);
  }

  return axios.patch("/profiles", editProfileFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type MutationFnType = typeof editProfile;

export const useEditProfileMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationKey: [""],
    mutationFn: (body) => editProfile(body, { axios }),
    ...config,
  });
};
