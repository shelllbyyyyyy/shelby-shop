"use client";

import { useEffect } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAddProductMutation } from "@shelby/api";

import Container from "@/components/elements/Container";
import Footer from "@/components/elements/Footer";

import { AddProductFormInner } from "@/features/product/form/AddProduct";

import { queryClient } from "@/lib/react-query";
import { AddProductFormSchema } from "@/types";
import { supabaseClient } from "@/utils/supabase/client";

const Add = () => {
  const router = useRouter();
  const { mutateAsync: addProductMutate } = useAddProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const handleAddProductSubmit = async (
    values: AddProductFormSchema & { image: File | null }
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

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth");
      }
    });
  }, []);

  return (
    <>
      <Container className="flex h-screen justify-center items-center">
        <AddProductFormInner onSubmit={handleAddProductSubmit} />
      </Container>
      <Footer />
    </>
  );
};

export default Add;
