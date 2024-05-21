"use client";

import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetBillboardQuery } from "@shelby/api";

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

import { EditBillboardFormSchema, editBillboardFormSchema } from "@/types";
import { Textarea } from "@/components/ui/textarea";

type EditBillboardFormInnerProps = {
  onSubmit: (
    values: EditBillboardFormSchema & { imageFile?: File; id: string }
  ) => void;
  onCancel?: () => void;
  id: string;
  isLoading: boolean;
};

export const EditBillboardFormInnerr: React.FC<EditBillboardFormInnerProps> = ({
  onSubmit,
  onCancel,
  id,
  isLoading,
}) => {
  const { data: billboard } = useGetBillboardQuery({ id });

  const [selectedBillboardImageFile, setSelectedBillboardImageFile] =
    useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const form = useForm<EditBillboardFormSchema>({
    defaultValues: {
      tittle: billboard?.tittle || "",
      label: billboard?.label || "",
      section: billboard?.section || "",
      imageUrl: billboard?.imageUrl || "",
    },
    resolver: zodResolver(editBillboardFormSchema),
    reValidateMode: "onChange",
  });

  const handleInputBillboardPictureChange: ChangeEventHandler<
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

      setSelectedBillboardImageFile(image[0]);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full gap-5">
        <div className="relative h-auto w-full rounded-xl overflow-hidden aspect-square">
          {preview.length ? (
            <Image
              src={preview as string}
              alt={billboard?.tittle as string}
              fill
              className="object-contain rounded-xl"
            />
          ) : (
            <Image
              src={billboard?.imageUrl as string}
              alt={billboard?.tittle as string}
              fill
              className="object-contain rounded-xl"
            />
          )}
        </div>

        <div className="flex flex-col h-auto w-full justify-center items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Edit Billboard</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  onSubmit({
                    ...values,
                    imageFile: selectedBillboardImageFile || undefined,
                    id,
                  })
                )}
                className="flex flex-col gap-1"
              >
                <CardContent>
                  <FormField
                    control={form.control}
                    name="tittle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tittle</FormLabel>
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
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
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
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section</FormLabel>
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
                    name="imageFile"
                    rules={{ required: "Billboard image is required" }}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={value?.fileName}
                            accept="image/jpg, image/jpeg, image/svg"
                            onChange={handleInputBillboardPictureChange}
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
