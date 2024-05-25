"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Wrapper from "@/app/admin/_components/Wrapper";

import {
  Dialog,
  DialogContent,
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

import { AddCategoryFormSchema, addCategoryFormSchema } from "@/types";

type AddCategoryFormInnerProps = {
  onSubmit: (values: AddCategoryFormSchema) => void;
  onCancel?: () => void;
  isLoading: boolean;
};

export const AddCategoryFormInner: React.FC<AddCategoryFormInnerProps> = ({
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const form = useForm<AddCategoryFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(addCategoryFormSchema),
    reValidateMode: "onChange",
  });

  return (
    <>
      <div className="flex flex-col w-full py-20">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              onSubmit({
                ...values,
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
      </div>
    </>
  );
};
