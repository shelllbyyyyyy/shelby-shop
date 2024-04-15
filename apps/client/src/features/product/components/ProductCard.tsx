import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <div className="flex flex-col hover:scale-105 transition duration-300 space-y-2 overflow-hidden">
          <div className="relative rounded-lg w-full h-auto bg-white shadow-md aspect-square border border-black-100 hover:shadow-lg">
            <Image
              src={image.src}
              alt={productName}
              fill
              className="object-contain p-5"
            />
          </div>
          <div>
            <p className="text-md sm:text-2xl font-semibold text-slate-900 line-clamp-1">
              {productName}
            </p>

            <p>
              <span className="text-md sm:text-xl font-semibold text-accent">
                {toRupiah(price)}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
