"use client";

import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  AddProductVariantFormSchema,
  addProductVariantFormSchema,
} from "@/types";

type AddProductVariantFormInnerProps = {
  onSubmit: (
    values: AddProductVariantFormSchema & {
      imageFile: File | null;
      slug: string | null;
    }
  ) => void;
  onCancel?: () => void;
  slug: string;
  isLoading: boolean;
};

export const AddProductVariantFormInner: React.FC<
  AddProductVariantFormInnerProps
> = ({ onSubmit, onCancel, slug, isLoading }) => {
  const [selectedProductImageFile, setSelectedProductImageFile] =
    useState<File | null>();
  const [preview, setPreview] = useState<string>("");

  const form = useForm<AddProductVariantFormSchema>({
    defaultValues: {
      price: 0,
      imageFile: undefined,
      imageUrl: "",
      sku: "",
      label: "",
    },
    resolver: zodResolver(addProductVariantFormSchema),
    reValidateMode: "onChange",
  });

  const handleInputProductImage: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
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
      <DialogHeader>
        <DialogTitle>Add Product Variant</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit({
              ...values,
              imageFile: selectedProductImageFile || null,
              slug: slug,
            })
          )}
          className="flex flex-col gap-1"
        >
          <FormField
            control={form.control}
            name="price"
            render={() => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...form.register("price", { valueAsNumber: true })} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>label</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                    onChange={handleInputProductImage}
                    type="file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedProductImageFile && (
            <div className="flex justify-center items-center mt-10">
              <Image
                src={preview}
                alt="Preview"
                className="rounded-md"
                width={200}
                height={200}
              />
            </div>
          )}

          <DialogFooter>
            <div className="mt-4 flex gap-2">
              <Button size="sm" type="submit" disabled={isLoading}>
                Submit
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
    </>
  );
};
