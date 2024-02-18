import { ChangeEventHandler, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Wrapper from "@/components/elements/Wrapper";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { AddProductFormSchema, addProductFormSchema } from "@/types";

type AddProductFormInnerProps = {
  onSubmit: (values: AddProductFormSchema & { imageUrl?: File }) => void;
  onCancel?: () => void;
};

export const AddProductFormInner: React.FC<AddProductFormInnerProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [selectedProductImageFile, setSelectedProductImageFile] =
    useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const inputProductImageRef = useRef<HTMLInputElement>(null);

  const form = useForm<AddProductFormSchema>({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: 0,
    },
    resolver: zodResolver(addProductFormSchema),
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
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <Wrapper>
          <Card>
            <CardHeader>
              <CardTitle>Add Product</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  onSubmit({
                    ...values,
                    imageUrl: selectedProductImageFile || undefined,
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
                    name="price"
                    render={() => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            {...form.register("price", { valueAsNumber: true })}
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
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            accept="image/jpg, image/jpeg, image/svg"
                            type="file"
                            {...field}
                            onChange={handleInputProductImage}
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
                </CardContent>

                <CardFooter>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" type="submit">
                      Submit
                    </Button>
                    {onCancel && (
                      <Button onClick={onCancel} size="sm" variant="secondary">
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
    </>
  );
};
