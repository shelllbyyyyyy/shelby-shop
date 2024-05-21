"use client";

import { AxiosError } from "axios";
import { useAddBillboardMutation } from "@shelby/api";

import { AddBillboardFormInner } from "@/features/billboard";

import { queryClient } from "@/lib/react-query";
import { AddBillboardFormSchema } from "@/types";
import { useState } from "react";

const Add = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: addBillboardMutate } = useAddBillboardMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Billboard"],
      });
    },
  });

  const handleAddBillboardSubmit = async (
    values: AddBillboardFormSchema & { imageFile: File | null }
  ) => {
    try {
      setLoading(true);
      await addBillboardMutate(values);
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
        <AddBillboardFormInner
          onSubmit={handleAddBillboardSubmit}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default Add;
