"use client";

import { useUpdateInventoryMutation } from "@shelby/api";

import { queryClient } from "@/lib/react-query";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UpdateInventoryFormInner } from "../form";
import { UpdateInventoryFormSchema } from "@/types";
import { AxiosError } from "axios";

interface UpdateInventoryProps {
  id: string;
}

export const UpdateInventory: React.FC<UpdateInventoryProps> = ({ id }) => {
  const { mutateAsync: updateInventory, isPending } =
    useUpdateInventoryMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getInventory"],
        });
      },
    });

  const handleAddProductSubmit = async (
    values: UpdateInventoryFormSchema & { id: string }
  ) => {
    try {
      await updateInventory(values);
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
          <span>Update Inventory</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <UpdateInventoryFormInner
            id={id}
            isLoading={isPending}
            onSubmit={handleAddProductSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
