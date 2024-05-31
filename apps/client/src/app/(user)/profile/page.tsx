"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useAddAddressMutation, useEditProfileMutation } from "@shelby/api";

import Container from "@/components/elements/Container";
import { HeadMetaData } from "@/components/meta/HeadMetaData";

import {
  AddAddressFormInner,
  EditProfileFormInner,
  ProfileDisplaySection,
} from "@/features/profile";

import { queryClient } from "@/lib/react-query";
import { AddAddressFormSchema, EditProfileFormSchema } from "@/types";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutateAsync: editProfileMutate } = useEditProfileMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  const handleEditProfileSubmit = async (
    values: EditProfileFormSchema & { profilePictureFile?: File }
  ) => {
    try {
      await editProfileMutate(values);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    }
  };

  const { mutateAsync: addAddressMutate, isPending } = useAddAddressMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAddress"],
      });
    },
  });

  const handleAddAddressSubmit = async (values: AddAddressFormSchema) => {
    try {
      await addAddressMutate(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    }
  };

  return (
    <>
      <HeadMetaData title="Profile" />
      <Container className="space-y-8">
        {isEditMode ? (
          <>
            <EditProfileFormInner
              onCancel={() => setIsEditMode(false)}
              onSubmit={handleEditProfileSubmit}
            />
          </>
        ) : (
          <ProfileDisplaySection onEditProfile={() => setIsEditMode(true)} />
        )}

        <AddAddressFormInner
          onSubmit={handleAddAddressSubmit}
          isLoading={isPending}
        />
      </Container>
    </>
  );
};

export default ProfilePage;
