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
        <div className="flex flex-col hover:scale-105 transition duration-300 space-y-2">
          <div className="rounded-lg border border-gray-100 bg-white shadow-md p-5">
            <Image
              src={image.src}
              alt={productName}
              height={600}
              width={600}
              className="hover:scale-105 transition duration-500 cursor-pointer object-contain"
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
