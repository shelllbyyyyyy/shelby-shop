import * as Icon from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toRupiah } from "@/lib/utils";

import { ProductCardProps } from "@/types";

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  productName,
  desciprion,
  slug,
}) => {
  return (
    <>
      <Link href={`/product/${slug}`}>
        <Card className="flex flex-col w-full max-w-lg  overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-xl  transition duration-300">
          <CardHeader className="relative mx-3 my-3 flex h-50 overflow-hidden rounded-xl object-cover object-center">
            <Image src={image} alt={productName} height={300} width={600} />
            <span className="absolute top-0 left-0 m-2 rounded-md bg-black px-2 text-center text-sm font-medium text-white">
              39% OFF
            </span>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900">
              {productName}
            </CardTitle>

            <p>
              <span className="text-xl font-semibold text-slate-900">
                {toRupiah(price)}
              </span>
            </p>
          </CardContent>
          <CardFooter className="p-4 flex justify-between bg-gray-100 gap-3">
            <div>
              <Button>Buy now</Button>
            </div>
            <div className="flex gap-0.5 md:gap-2">
              <Button size="circle">
                <Icon.ShoppingBag size={15} />
              </Button>
              <Button size="circle">
                <Icon.Heart size={15} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};
