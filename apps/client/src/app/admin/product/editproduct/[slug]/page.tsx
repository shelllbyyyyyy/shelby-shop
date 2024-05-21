"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useUpdateProductMutation } from "@shelby/api";

import {
  EditProductFormInnerr,
  ProductDisplaySection,
} from "@/features/product";

import { queryClient } from "@/lib/react-query";
import { EditProductFormSchema } from "@/types";

const EditProductPage = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { slug } = params;
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
      setLoading(true);
      await editProductMutate(values);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center flex-col gap-8 lg:gap-10">
        {isEditMode ? (
          <>
            <EditProductFormInnerr
              onCancel={() => setIsEditMode(false)}
              onSubmit={handleEditProductSubmit}
              slug={slug}
              isLoading={loading}
            />
          </>
        ) : (
          <ProductDisplaySection
            onEditProduct={() => setIsEditMode(true)}
            slug={slug}
          />
        )}
      </div>
    </>
  );
};

export default EditProductPage;
