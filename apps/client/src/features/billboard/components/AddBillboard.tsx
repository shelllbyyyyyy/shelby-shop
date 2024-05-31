"use client";

import { AxiosError } from "axios";
import { useAddBillboardMutation } from "@shelby/api";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddBillboardFormInner } from "@/features/billboard";

import { queryClient } from "@/lib/react-query";
import { AddBillboardFormSchema } from "@/types";

export const AddBillboard = () => {
  const { mutateAsync: addBillboardMutate, isPending } =
    useAddBillboardMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getBillboard"],
        });
      },
    });

  const handleAddBillboardSubmit = async (
    values: AddBillboardFormSchema & { imageFile: File | null }
  ) => {
    try {
      await addBillboardMutate(values);
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
          <Button>Add Billboard</Button>
        </DialogTrigger>
        <DialogContent className="  sm:max-w-[900px]">
          <AddBillboardFormInner
            onSubmit={handleAddBillboardSubmit}
            isLoading={isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
