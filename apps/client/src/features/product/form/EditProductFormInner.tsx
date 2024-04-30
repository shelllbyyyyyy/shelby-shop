"use client";

import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProductQuery } from "@shelby/api";

import Wrapper from "@/app/admin/_components/Wrapper";

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
};

export const EditProductFormInnerr: React.FC<EditProductFormInnerProps> = ({
  onSubmit,
  onCancel,
  slug,
}) => {
  const { data: product } = useGetProductQuery({ slug });
  const [selectedProductImageFile, setSelectedProductImageFile] =
    useState<File | null>(null);
  const inputProductPictureRef = useRef<HTMLInputElement>(null);

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

    if (event.target.files?.length) {
      if (event.target.files[0].size > MAX_SIZE) {
        return alert("Batas file size 5 MB");
      }

      setSelectedProductImageFile(event.target.files[0]);
    }
  };

  const previewProductPictureUrl = useMemo(() => {
    if (selectedProductImageFile)
      return URL.createObjectURL(selectedProductImageFile);

    return product?.imageUrl || "";
  }, [product?.imageUrl, selectedProductImageFile]);

  return (
    <>
      <div className="flex flex-col h-screen w-full max-sm:mb-24">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex h-[400px] w-full bg-accent/80 justify-center items-center">
            <img
              src={previewProductPictureUrl[0]}
              alt={product?.name}
              className="h-96"
            />
            <Input
              onChange={handleInputProductPictureChange}
              type="file"
              className="hidden"
              ref={inputProductPictureRef}
            />
          </div>
          <div className="flex gap-2 py-4">
            <Button
              onClick={() => inputProductPictureRef.current?.click()}
              size="sm"
            >
              Change
            </Button>
            <Button
              onClick={() => setSelectedProductImageFile(null)}
              variant="secondary"
              size="sm"
            >
              Remove
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-auto w-full justify-center items-center">
          <Wrapper>
            <Card>
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

                  <CardFooter>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" type="submit">
                        Save
                      </Button>
                      {onCancel && (
                        <Button
                          onClick={onCancel}
                          size="sm"
                          variant="secondary"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </Wrapper>
        </div>
      </div>
    </>
  );
};
