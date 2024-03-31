"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUpdateProductMutation } from "@shelby/api";

import Container from "@/components/elements/Container";
import { HeadMetaData } from "@/components/meta/HeadMetaData";

import {
  EditProductFormInnerr,
  ProductDisplaySection,
} from "@/features/product/form";

import { queryClient } from "@/lib/react-query";
import { EditProductFormSchema } from "@/types";
import { supabaseClient } from "@/utils/supabase/client";

const EditProductPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { mutateAsync: editProductMutate } = useUpdateProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });

  const handleEditProductSubmit = async (
    values: EditProductFormSchema & { imageFile?: File }
  ) => {
    try {
      await editProductMutate(values);
      setIsEditMode(false);
      router.back();
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
      <HeadMetaData title="Edit Product" />
      <Container className="flex min-h-screen items-center justify-center flex-col gap-8 lg:gap-10">
        {isEditMode ? (
          <>
            <EditProductFormInnerr
              onCancel={() => setIsEditMode(false)}
              onSubmit={handleEditProductSubmit}
              slug={slug}
            />
          </>
        ) : (
          <ProductDisplaySection
            onEditProduct={() => setIsEditMode(true)}
            slug={slug}
          />
        )}
      </Container>
    </>
  );
};

export default EditProductPage;
