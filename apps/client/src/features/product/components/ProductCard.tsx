import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { toRupiah } from "@/lib/utils";

import { ProductCardProps } from "@/types";
import { Product } from "@shelby/db";

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  price,
  name,
  description,
  slug,
}) => {
  return (
    <>
      <Link href={`/product/${slug}`}>
        <div className="flex flex-col hover:scale-105 transition duration-300 space-y-2 overflow-hidden">
          <div className="relative rounded-lg w-full h-auto bg-white shadow-md aspect-square border border-black-100 hover:shadow-lg">
            <Image
              src={imageUrl[0]}
              alt={name}
              fill
              className="object-contain p-5"
            />
          </div>
          <div>
            <p className="text-md sm:text-2xl font-semibold text-slate-900 line-clamp-1">
              {name}
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

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden flex flex-col animate-pulse space-y-2">
      <div className="w-full aspect-square bg-gray-300 rounded-lg border border-black-100" />

      <div className="flex flex-col gap-2">
        <div className="w-3/4 h-5 rounded-full bg-gray-300" />

        <div className="w-1/2 h-4 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export const ProductGridSection = ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  return (
    <Suspense
      fallback={
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      }
    >
      <ProductSuspense productsFetcher={productsFetcher} />
    </Suspense>
  );
};

const ProductSuspense = async ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
};
