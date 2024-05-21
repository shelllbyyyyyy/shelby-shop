"use client";

import { AxiosError } from "axios";
import { useAddCategoryMutation } from "@shelby/api";

import { AddCategoryFormInner } from "@/features/category";

import { queryClient } from "@/lib/react-query";
import { AddCategoryFormSchema } from "@/types";
import { useState } from "react";

const AddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: addCategoryMutate } = useAddCategoryMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });

  const handleAddCategorySubmit = async (values: AddCategoryFormSchema) => {
    try {
      setLoading(true);
      await addCategoryMutate(values);
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
      <div className="flex h-screen">
        <AddCategoryFormInner
          onSubmit={handleAddCategorySubmit}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default AddCategory;
