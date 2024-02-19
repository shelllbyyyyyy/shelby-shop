"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { useGetAllProductQuery } from "@shelby/api";
import { Product as ProductModel } from "@shelby/db";

import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { data: result } = useGetAllProductQuery({});

  const [prod, setProd] = useState<ProductModel[] | []>([]);

  useLayoutEffect(() => {
    setProd(result?.data as any);
  }, [setProd, result]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {prod &&
          prod.map((product: any) => {
            return (
              <ProductCard
                key={product.id}
                image={{
                  src: product?.imageUrl,
                  alt: product.name,
                  height: 100,
                  width: 100,
                }}
                productName={product.name}
                desciprion={product.description}
                price={product.price}
                slug={product.slug}
              />
            );
          })}
      </div>
    </>
  );
};
