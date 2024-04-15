"use client";

import { AxiosError } from "axios";
import { useAddProductMutation } from "@shelby/api";

import Container from "@/components/elements/Container";

import { AddProductFormInner } from "@/features/product/form/AddProduct";

import { queryClient } from "@/lib/react-query";
import { AddProductFormSchema } from "@/types";

const Add = () => {
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
      await addProductMutate(values);
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
      <Container className="flex h-screen justify-center items-center">
        <AddProductFormInner onSubmit={handleAddProductSubmit} />
      </Container>
    </>
  );
};

export default Add;
