"use client";

import { AxiosError } from "axios";
import { useAddProductMutation } from "@shelby/api";

import { AddProductFormInner } from "@/features/product";

import { queryClient } from "@/lib/react-query";
import { AddProductFormSchema } from "@/types";
import { useState } from "react";

const Add = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: addProductMutate } = useAddProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const handleAddProductSubmit = async (
    values: AddProductFormSchema & { imageFile: File | null }
  ) => {
    try {
      setLoading(true);
      await addProductMutate(values);
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
      <div className="flex h-screen justify-center items-center my-36 sm:mt-2 sm:mb-24">
        <AddProductFormInner
          onSubmit={handleAddProductSubmit}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default Add;
