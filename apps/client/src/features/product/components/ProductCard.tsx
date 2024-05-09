import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import * as Icon from "lucide-react";

import { toRupiah } from "@/lib/utils";

import { Product } from "@shelby/db";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  onClick?: () => void;
  id?: string | undefined;
  name: string;
  description: string | undefined;
  price: number | undefined;
  imageUrl: string;
  slug: string | undefined;
};

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
      <div className="flex flex-col border bg-slate-100 border-gray-100 p-4 rounded-xl">
        <div className="relative rounded-xl h-auto w-full aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain rounded-xl"
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
        <div className="flex justify-evenly">
          <Button variant="outline">
            <Icon.ShoppingCart />
          </Button>
          <Link href={`/product/${slug}`}>
            <Button variant="outline">
              <Icon.Eye />
            </Button>
          </Link>
        </div>
      </div>
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
    <ProductCard
      key={product.id}
      name={product.name}
      slug={product.slug}
      price={product.price}
      imageUrl={product.imageUrl[0] as string}
      description={product.description}
    />
  ));
};
