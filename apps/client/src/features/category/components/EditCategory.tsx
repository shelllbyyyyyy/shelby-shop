"use client";

import { AxiosError } from "axios";
import { toast } from "sonner";
import { useEditCategoryMutation } from "@shelby/api";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditCategoryFormInner } from "@/features/category";

import { queryClient } from "@/lib/react-query";
import { AddCategoryFormSchema } from "@/types";

interface EditCategoryProps {
  id: string;
}

export const EditCategory: React.FC<EditCategoryProps> = ({ id }) => {
  const { mutateAsync: addCategoryMutate, isPending } = useEditCategoryMutation(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getCategory"],
        });

        toast.success("Category has been updated");
      },
    }
  );

  const handleAddCategorySubmit = async (
    values: AddCategoryFormSchema & {
      id: string;
    }
  ) => {
    try {
      await addCategoryMutate(values);
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
      <Dialog>
        <DialogTrigger asChild>
          <span>Edit Category</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <EditCategoryFormInner
            onSubmit={handleAddCategorySubmit}
            isLoading={isPending}
            id={id}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
