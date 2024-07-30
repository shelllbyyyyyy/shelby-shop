"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Address } from "@shelby/db";
import React from "react";
import { AddAddressFormInner } from "./AddAddressFormInner";
import { useAddAddressMutation } from "@shelby/api";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { AddAddressFormSchema } from "@/types";
import { AxiosError } from "axios";

type AddressCardProps = {
  data?: Address[];
};

export const AddressCard: React.FC<AddressCardProps> = ({ data }) => {
  const { mutateAsync: addAddressMutate, isPending } = useAddAddressMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAddress"],
      });

      toast.success("Address has been added");
    },
  });

  const handleAddAddressSubmit = async (values: AddAddressFormSchema) => {
    try {
      await addAddressMutate(values);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        toast.error(err.response?.data.errors[0]);
        return;
      }
    }
  };

  const render = () => {
    if (!data) {
      return null;
    }

    return data.map((item) => {
      return (
        <>
          <CardContent>
            <div>
              <span className="text-xl font-semibold">{`${item.first_name} ${item.last_name}`}</span>
              <span> | </span>
              <span className="text-xl font-semibold">{item.phone_number}</span>
            </div>
            <div>{item.address}</div>
            <div className="font-semibold">{`${item.city}, ${item.country_code}, ${item.postal_code}`}</div>
          </CardContent>
        </>
      );
    });
  };

  return (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
      </CardHeader>
      {render()}
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            {data ? (
              <Button variant="secondary">Add more address</Button>
            ) : (
              <Button variant="secondary">Add address</Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px]">
            <AddAddressFormInner
              isLoading={isPending}
              onSubmit={handleAddAddressSubmit}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
