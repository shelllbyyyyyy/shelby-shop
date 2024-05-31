"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useUpdateProductMutation } from "@shelby/api";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  EditProductFormInnerr,
  ProductDisplaySection,
} from "@/features/product";

import { queryClient } from "@/lib/react-query";
import { EditProductFormSchema } from "@/types";

interface EditProductProps {
  slug: string;
}

export const EditProduct: React.FC<EditProductProps> = ({ slug }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutateAsync: editProductMutate, isPending } =
    useUpdateProductMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getProduct"],
        });
      },
    });

  const handleEditProductSubmit = async (
    values: EditProductFormSchema & { imageFile?: File }
  ) => {
    try {
      await editProductMutate(values);
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
          <span>Update Product</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          {isEditMode ? (
            <EditProductFormInnerr
              onCancel={() => setIsEditMode(false)}
              onSubmit={handleEditProductSubmit}
              slug={slug}
              isLoading={isPending}
            />
          ) : (
            <ProductDisplaySection
              onEditProduct={() => setIsEditMode(true)}
              slug={slug}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
