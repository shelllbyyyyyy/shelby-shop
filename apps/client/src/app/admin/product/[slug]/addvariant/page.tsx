"use client";

import { AxiosError } from "axios";
import { useAddProductVariantMutation } from "@shelby/api";

import { AddProductVariantFormInner } from "@/features/product/form/AddVariant";

import { queryClient } from "@/lib/react-query";
import { AddProductVariantFormSchema } from "@/types";

const Add = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const { mutateAsync: addProductVariantMutate } = useAddProductVariantMutation(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["productVariant"],
        });
      },
    }
  );

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
      <div className="flex h-screen justify-center items-center">
        <AddProductVariantFormInner
          onSubmit={handleAddProductSubmit}
          slug={slug}
        />
      </div>
    </>
  );
};

export default Add;
