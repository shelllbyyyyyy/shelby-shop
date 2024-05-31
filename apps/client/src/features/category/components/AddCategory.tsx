"use client";

import { AxiosError } from "axios";
import { useAddCategoryMutation } from "@shelby/api";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddCategoryFormInner } from "@/features/category";

import { queryClient } from "@/lib/react-query";
import { AddCategoryFormSchema } from "@/types";

export const AddCategory = () => {
  const { mutateAsync: addCategoryMutate, isPending } = useAddCategoryMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCategory"],
      });
    },
  });

  const handleAddCategorySubmit = async (values: AddCategoryFormSchema) => {
    try {
      await addCategoryMutate(values);
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
          <Button>Update Inventory</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <AddCategoryFormInner
            onSubmit={handleAddCategorySubmit}
            isLoading={isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
