"use client";

import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAddProductMutation } from "@shelby/api";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddProductFormInner } from "@/features/product";

import { queryClient } from "@/lib/react-query";
import { AddProductFormSchema } from "@/types";

export const AddProduct = () => {
  const { mutateAsync: addProductMutate, isPending } = useAddProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProduct"],
      });

      toast.success("Product has been added");
    },
  });

  const handleAddProductSubmit = async (
    values: AddProductFormSchema & { imageFile: File | null }
  ) => {
    try {
      await addProductMutate(values);
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
          <Button>Add product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <AddProductFormInner
            onSubmit={handleAddProductSubmit}
            isLoading={isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
