"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

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

import { toRupiah } from "@/lib/utils";
import { AppDispatch } from "@/lib/redux/store";
import { addItemsToCart } from "../modules";

type CartProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};

export const AddToCart: React.FC<CartProps> = ({
  id,
  name,
  imageUrl,
  price,
}) => {
  const [quantity, setQuantity] = React.useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();

  const addToCart = (productId: string) => {
    const cartProduct = {
      id: productId,
      quantity: quantity,
      totalPrice: price * quantity,
      product: {
        id,
        name,
        imageUrl,
        price,
      },
    };
    dispatch(addItemsToCart(cartProduct));
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
          <DrawerHeader className="flex">
            <DrawerTitle>
              <Image src={imageUrl} alt={name} width={100} height={100} />
            </DrawerTitle>
            <DrawerDescription className="font-semibold text-xl">
              <div className="flex flex-col items-start mt-10">
                <span className="text-accent ">{toRupiah(price)}</span>
                <span>Stock: 10</span>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {quantity}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Pcs
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button size="lg" onClick={() => addToCart(id)}>
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
