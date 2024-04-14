"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

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

type CartProps = {
  name: string;
  imageUrl: string;
  price: number;
};

export const BuyNow: React.FC<CartProps> = ({ name, imageUrl, price }) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [totalPrice, setTotalPrice] = React.useState<number>(price);

  const handleChangeItemCart = (operator: string) => {
    if (operator === "inc") {
      setQuantity(quantity + 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price * quantity);
    } else {
      setQuantity(quantity - 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price * quantity);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg">Buy Now</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex">
            <DrawerTitle>
              <Image src={imageUrl} alt={name} width={100} height={100} />
            </DrawerTitle>
            <DrawerDescription className="font-semibold text-xl">
              <div className="flex flex-col items-start mt-10">
                <span className="text-accent ">{toRupiah(totalPrice)}</span>
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
                onClick={() => handleChangeItemCart("dec")}
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
                onClick={() => handleChangeItemCart("inc")}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button size="lg">Check out</Button>
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
