"use client";

import { AxiosError } from "axios";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { ProductVariant, useAddCartMutation } from "@shelby/api";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { queryClient } from "@/lib/react-query";
import { Variant } from "./item/variant";

type CartProps = {
  productName: string;
  data: ProductVariant[];
  button: React.ReactElement | string;
};

export const AddToCart: React.FC<CartProps> = ({
  productName,
  data,
  button,
}) => {
  const [variant, selectVariant] = useState<ProductVariant | null>(data[0]);
  const [qty, setQty] = useState<number>(1);

  const { mutateAsync: addCartMutate, isPending } = useAddCartMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      });
    },
  });

  const handleAddToCartSubmit = async () => {
    try {
      await addCartMutate({
        id: variant?.id as string,
        quantity: qty,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    }
  };

  const render = () => {
    return data.map((item) => {
      return (
        <>
          <Button
            variant="outline"
            onClick={() => selectVariant(item)}
            className={`${item.id === variant?.id && "border-accent text-accent"}`}
          >
            {item.label}
          </Button>
        </>
      );
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{button}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          {variant && (
            <Variant
              key={variant.id}
              item={variant}
              productName={productName}
              stock={variant.inventory[0]?.quantity}
            />
          )}

          <div>
            <h1 className="font-semibold">Variant :</h1>
            <div className="space-x-2">{render()}</div>
          </div>

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
              onClick={() => handleAddToCartSubmit()}
              disabled={!variant || isPending}
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
