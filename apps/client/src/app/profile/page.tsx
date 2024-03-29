"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEditProfileMutation } from "@shelby/api";

import Container from "@/components/elements/Container";
import { HeadMetaData } from "@/components/meta/HeadMetaData";

import {
  EditProfileFormInner,
  ProfileDisplaySection,
} from "@/features/profile/components";

import { queryClient } from "@/lib/react-query";
import { EditProfileFormSchema } from "@/types";
import { supabaseClient } from "@/utils/supabase/client";

const ProfilePage = () => {
  const router = useRouter();
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

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth");
      }
    });
  }, []);

  return (
    <>
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
    </>
  );
};

export default ProfilePage;
