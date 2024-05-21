"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useAddProductVariantMutation } from "@shelby/api";

import { AddProductVariantFormInner } from "@/features/product";

import { queryClient } from "@/lib/react-query";
import { AddProductVariantFormSchema } from "@/types";

const Add = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      await addProductVariantMutate(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <AddProductVariantFormInner
          onSubmit={handleAddProductSubmit}
          slug={slug}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default Add;
