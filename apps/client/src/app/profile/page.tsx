"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useEditProfileMutation } from "@shelby/api";

import Container from "@/components/elements/Container";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

import {
  EditProfileFormInner,
  ProfileDisplaySection,
} from "@/features/profile/components";

import { queryClient } from "@/lib/react-query";
import { EditProfileFormSchema } from "@/types";

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

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Profile" />
      <Container className="flex min-h-screen items-center justify-center flex-col gap-8 lg:gap-10">
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
      </Container>
    </AuthenticatedRoute>
  );
};

export default ProfilePage;
