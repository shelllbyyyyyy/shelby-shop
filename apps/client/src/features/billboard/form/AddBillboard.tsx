"use client";

import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Wrapper from "@/app/admin/_components/Wrapper";

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

import { AddBillboardFormSchema, addBillboardFormSchema } from "@/types";
import { Textarea } from "@/components/ui/textarea";

type AddBillboardFormInnerProps = {
  onSubmit: (
    values: AddBillboardFormSchema & { imageFile: File | null }
  ) => void;
  onCancel?: () => void;
  isLoading: boolean;
};

export const AddBillboardFormInner: React.FC<AddBillboardFormInnerProps> = ({
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [selectedBillboardImageFile, setSelectedBillboardImageFile] =
    useState<File | null>();
  const [preview, setPreview] = useState<string>("");

  const form = useForm<AddBillboardFormSchema>({
    defaultValues: {
      tittle: "",
      imageFile: undefined,
      imageUrl: "",
      section: "",
      label: "",
    },
    resolver: zodResolver(addBillboardFormSchema),
    reValidateMode: "onChange",
  });

  const handleInputBillboardImage: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const MAX_SIZE = 10 * 1024 * 1024;
    const image = event.target.files;

    if (image?.length) {
      const urlImage = URL.createObjectURL(image[0]);
      setPreview(urlImage);
      if (image[0].size > MAX_SIZE) {
        return alert("Max image size is 10MB.");
      }

      setSelectedBillboardImageFile(image[0]);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full justify-center items-center py-20">
        <Wrapper>
          <Card>
            <CardHeader>
              <CardTitle>Add Billboard</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  onSubmit({
                    ...values,
                    imageFile: selectedBillboardImageFile || null,
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
                            onChange={handleInputBillboardImage}
                            type="file"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedBillboardImageFile && (
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
                    <Button size="sm" type="submit" disabled={isLoading}>
                      Submit
                    </Button>
                    {onCancel && (
                      <Button
                        onClick={onCancel}
                        disabled={isLoading}
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
    </>
  );
};
