"use client";

import Image from "next/image";
import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProductQuery } from "@shelby/api";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EditProductFormSchema, editProductFormSchema } from "@/types";
import { Textarea } from "@/components/ui/textarea";

type EditProductFormInnerProps = {
  onSubmit: (values: EditProductFormSchema & { imageFile?: File }) => void;
  onCancel?: () => void;
  slug: string;
  isLoading: boolean;
};

export const EditProductFormInnerr: React.FC<EditProductFormInnerProps> = ({
  onSubmit,
  onCancel,
  slug,
  isLoading,
}) => {
  const { data: product } = useGetProductQuery({ slug });

  const [selectedProductImageFile, setSelectedProductImageFile] =
    useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const form = useForm<EditProductFormSchema>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      slug: product?.slug || "",
      imageUrl: product?.imageUrl || [""],
    },
    resolver: zodResolver(editProductFormSchema),
    reValidateMode: "onChange",
  });

  const handleInputProductPictureChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const MAX_SIZE = 5 * 1024 * 1024;
    const image = event.target.files;

    if (image?.length) {
      const urlImage = URL.createObjectURL(image[0]);
      setPreview(urlImage);
      if (image[0].size > MAX_SIZE) {
        return alert("Max image size is 5MB.");
      }

      setSelectedProductImageFile(image[0]);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-2 py-10">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <div className="relative h-96 w-full rounded-xl overflow-hidden aspect-square">
            {preview.length ? (
              <Image
                src={preview as string}
                alt={product?.name as string}
                fill
                className="object-contain rounded-xl"
              />
            ) : (
              <Image
                src={product?.imageUrl[0] as string}
                alt={product?.name as string}
                fill
                className="object-contain rounded-xl"
              />
            )}
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              onSubmit({
                ...values,
                imageFile: selectedProductImageFile || undefined,
              })
            )}
            className="flex flex-col gap-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={() => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("price", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              rules={{ required: "Product image is required" }}
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={value?.fileName}
                      accept="image/jpg, image/jpeg, image/svg"
                      onChange={handleInputProductPictureChange}
                      type="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="mt-4 flex gap-2">
                <Button disabled={isLoading} size="sm" type="submit">
                  Save
                </Button>
                {onCancel && (
                  <Button
                    onClick={onCancel}
                    size="sm"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </>
  );
};
