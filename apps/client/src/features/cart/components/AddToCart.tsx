"use client";

import { AxiosError } from "axios";
import Image from "next/image";
import React, { useState } from "react";

import { useAddCartMutation } from "@shelby/api";
import { Prisma, ProductVariant } from "@shelby/db";
import { AddToCartDTO } from "@shelby/dto";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { queryClient } from "@/lib/react-query";
import { toRupiah } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

type CartProps = {
  productName: string;
  data: ProductVariant;
};

export const AddToCart: React.FC<CartProps> = ({ productName, data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);

  const { mutateAsync: addCartMutate } = useAddCartMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", String(data.id)],
      });
    },
  });

  const handleAddCategorySubmit = async (values: AddToCartDTO) => {
    try {
      setLoading(true);
      await addCartMutate(values);
      console.log(addCartMutate);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg">
          Add To Cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex w-full">
            <DrawerTitle className="relative aspect-square w-3/4">
              <Image src={data.imageUrl} alt={data.label} fill sizes="sm" />
            </DrawerTitle>
            <DrawerDescription className="font-semibold text-xl w-full">
              <div className="flex flex-col items-start mt-10">
                <span className="font-black text-xl">{productName}</span>
                <span className="font-black text-lg">{data.label}</span>
                <span className="text-accent ">{toRupiah(data.price)}</span>
              </div>
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => qty > 1 && setQty(qty - 1)}
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center items-center">
                <div className="text-7xl font-bold tracking-tighter">{qty}</div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Pcs
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setQty(qty + 1)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>

          <DrawerFooter>
            <Button
              size="lg"
              onClick={() =>
                handleAddCategorySubmit({
                  id: data.id as string,
                  quantity: qty,
                })
              }
              disabled={loading}
            >
              Add To Cart
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
