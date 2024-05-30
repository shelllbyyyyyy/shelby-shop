import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import * as Icon from "lucide-react";

import { toRupiah } from "@/lib/utils";

import { Product } from "@shelby/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AddToCart } from "@/features/cart";

type ProductCardProps = {
  onClick?: () => void;
  data: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col border bg-slate-100 border-gray-100 p-4 rounded-xl group">
        <div className="relative rounded-xl h-auto w-full aspect-square overflow-hidden">
          <Image
            src={data.imageUrl[0]}
            alt={data.name}
            fill
            className="object-contain rounded-xl group-hover:blur-[1px] group-hover:brightness-75 transition duration-300 group-hover:scale-110"
          />
          <div className="absolute flex w-full h-full justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 ">
            <div className="flex justify-evenly items-center text-white w-full">
              <Button variant="outline" size="circle">
                <AddToCart
                  key={data.id}
                  button={<Icon.ShoppingCart className="mr-1" />}
                  productName={data.name}
                  data={data.productVariant}
                />
              </Button>
              <Link href={`/product/${data.slug}`}>
                <Button variant="outline" size="circle">
                  <Icon.Eye />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <>
          <p className="text-md sm:text-2xl font-semibold text-slate-900 line-clamp-1">
            {data.name}
          </p>

          <p>
            <span className="text-md sm:text-xl font-semibold text-accent">
              {toRupiah(data.price)}
            </span>
          </p>
        </>
      </div>
    </>
  );
};

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden flex flex-col space-y-2 border border-gray-100 p-4 rounded-xl">
      <Skeleton className="w-full aspect-square rounded-xl" />

      <div className="flex flex-col gap-2">
        <Skeleton className="w-3/4 h-5 rounded-full" />

        <Skeleton className="w-1/2 h-4 rounded-full" />
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
    <ProductCard key={product.id} data={product} />
  ));
};
