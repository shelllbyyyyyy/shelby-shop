"use client";

import { useFetchProductQuery } from "@shelby/api";

import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { data: product } = useFetchProductQuery({});

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
        {product?.data.map((product) => {
          return (
            <ProductCard
              key={product.id}
              image={{
                src: product.imageUrl,
                alt: product.name,
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
