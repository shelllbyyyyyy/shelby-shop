"use client";

import Image from "next/image";
import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProductQuery } from "@shelby/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="flex flex-col h-screen w-full gap-5">
        <div className="relative h-auto w-full rounded-xl overflow-hidden aspect-square">
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

        <div className="flex flex-col h-auto w-full justify-center items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
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
                <CardContent>
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
                </CardContent>

                <CardContent>
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
                </CardContent>
                <CardContent>
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
                </CardContent>

                <CardContent>
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
                </CardContent>

                <CardFooter>
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
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};
