"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useEditProfileMutation } from "@shelby/api";
import { toast } from "sonner";

import Container from "@/components/elements/Container";
import { HeadMetaData } from "@/components/meta/HeadMetaData";

import {
  EditProfileFormInner,
  ProfileDisplaySection,
} from "@/features/profile";

import { queryClient } from "@/lib/react-query";
import { EditProfileFormSchema } from "@/types";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutateAsync: editProfileMutate } = useEditProfileMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast.success("Profile has been updated");
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

        toast.error(err.response?.data.errors[0]);
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
      </Container>
    </>
  );
};

export default ProfilePage;
