"use client";

import { AxiosError } from "axios";
import { useAddProductVariantMutation } from "@shelby/api";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddProductVariantFormInner } from "@/features/product";

import { queryClient } from "@/lib/react-query";
import { AddProductVariantFormSchema } from "@/types";

interface AddVariantProps {
  slug: string;
}

export const AddVariant: React.FC<AddVariantProps> = ({ slug }) => {
  const { mutateAsync: addProductVariantMutate, isPending } =
    useAddProductVariantMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getProductVariant"],
        });
      },
    });

  const handleAddProductSubmit = async (
    values: AddProductVariantFormSchema & {
      imageFile: File | null;
      slug: string | null;
    }
  ) => {
    try {
      await addProductVariantMutate(values);
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
          <span>Add Variant</span>
        </DialogTrigger>
        <DialogContent className="  sm:max-w-[900px]">
          <AddProductVariantFormInner
            onSubmit={handleAddProductSubmit}
            slug={slug}
            isLoading={isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
