"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useUpdateBillboardMutation } from "@shelby/api";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  EditBillboardFormInnerr,
  BillboardDisplaySection,
} from "@/features/billboard";

import { queryClient } from "@/lib/react-query";
import { EditBillboardFormSchema } from "@/types";

interface EditBillboardProps {
  id: string;
}

export const EditBillboard: React.FC<EditBillboardProps> = ({ id }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutateAsync: editBillboardMutate, isPending } =
    useUpdateBillboardMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getBillboard"],
        });
      },
    });

  const handleEditBillboardSubmit = async (
    values: EditBillboardFormSchema & { imageFile?: File; id: string }
  ) => {
    try {
      await editBillboardMutate(values);
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span>Edit Billboard</span>
        </DialogTrigger>
        <DialogContent className="pt-0 mt-5 mb-5 sm:max-w-[900px]">
          {isEditMode ? (
            <>
              <EditBillboardFormInnerr
                onCancel={() => setIsEditMode(false)}
                onSubmit={handleEditBillboardSubmit}
                id={id}
                isLoading={isPending}
              />
            </>
          ) : (
            <BillboardDisplaySection
              onEditBillboard={() => setIsEditMode(true)}
              id={id}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
