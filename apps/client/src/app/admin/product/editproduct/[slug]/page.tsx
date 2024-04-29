"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUpdateProductMutation } from "@shelby/api";

import {
  EditProductFormInnerr,
  ProductDisplaySection,
} from "@/features/product/form";

import { queryClient } from "@/lib/react-query";
import { EditProductFormSchema } from "@/types";

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

  return (
    <>
      <div className="flex min-h-screen items-center justify-center flex-col gap-8 lg:gap-10">
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
      </div>
    </>
  );
};

export default EditProductPage;
