"use client";

import { useGetAllProductQuery } from "@shelby/api";

import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { data: product } = useGetAllProductQuery({});

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
        {product?.data.map((product) => {
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
