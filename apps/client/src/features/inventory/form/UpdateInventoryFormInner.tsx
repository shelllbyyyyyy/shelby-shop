"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetStockProductQuery } from "@shelby/api";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UpdateInventoryFormSchema, updateInventoryFormSchema } from "@/types";

type UpdateInventoryFormInnerProps = {
  onSubmit: (values: UpdateInventoryFormSchema & { id: string }) => void;
  onCancel?: () => void;
  id: string;
  isLoading: boolean;
};

export const UpdateInventoryFormInner: React.FC<
  UpdateInventoryFormInnerProps
> = ({ onSubmit, onCancel, isLoading, id }) => {
  const { data: inventory } = useGetStockProductQuery({ id });

  const form = useForm<UpdateInventoryFormSchema>({
    defaultValues: {
      quantity: inventory?.quantity || 0,
      status: inventory?.status || "AVAILABLE",
    },
    resolver: zodResolver(updateInventoryFormSchema),
    reValidateMode: "onChange",
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update Inventory</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit({
              ...values,
              id,
            })
          )}
          className="flex flex-col gap-1"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={() => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("quantity", {
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a product status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="ON_ORDER">On Order</SelectItem>
                        <SelectItem value="RESERVED">Reserved</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm" type="submit" disabled={isLoading}>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
