"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useUpdateBillboardMutation } from "@shelby/api";

import {
  EditBillboardFormInnerr,
  BillboardDisplaySection,
} from "@/features/billboard";

import { queryClient } from "@/lib/react-query";
import { EditBillboardFormSchema } from "@/types";

const EditBillboardPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = params;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutateAsync: editBillboardMutate } = useUpdateBillboardMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billboard"],
      });
    },
  });

  const handleEditBillboardSubmit = async (
    values: EditBillboardFormSchema & { imageFile?: File; id: string }
  ) => {
    try {
      setLoading(true);
      await editBillboardMutate(values);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center flex-col gap-8 lg:gap-10">
        {isEditMode ? (
          <>
            <EditBillboardFormInnerr
              onCancel={() => setIsEditMode(false)}
              onSubmit={handleEditBillboardSubmit}
              id={id}
              isLoading={loading}
            />
          </>
        ) : (
          <BillboardDisplaySection
            onEditBillboard={() => setIsEditMode(true)}
            id={id}
          />
        )}
      </div>
    </>
  );
};

export default EditBillboardPage;
