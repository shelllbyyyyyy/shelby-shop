import React from "react";
import Image from "next/image";
import { ProductVariant } from "@shelby/db";

import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { toRupiah } from "@/lib/utils";

interface VariantProps {
  productName: string;
  item: ProductVariant;
  stock: number;
}

export const Variant: React.FC<VariantProps> = ({
  item,
  productName,
  stock,
}) => {
  return (
    <>
      <DrawerHeader className="flex w-full">
        <DrawerTitle className="relative aspect-square w-3/4">
          <Image src={item.imageUrl} alt={item.label} fill sizes="sm" />
        </DrawerTitle>
        <DrawerDescription className="font-semibold text-xl w-full">
          <div className="flex flex-col items-start mt-10">
            <span className="font-black text-xl">{productName}</span>
            <span className="font-black text-lg">{item.label}</span>
            <span className="font-md text-lg">Stock : {stock}</span>
            <span className="text-accent ">{toRupiah(item.price)}</span>
          </div>
        </DrawerDescription>
      </DrawerHeader>
    </>
  );
};
