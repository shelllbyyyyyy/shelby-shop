import React from "react";
import { PrismaClient } from "@shelby/db";

import { ProductCard } from "./ProductCard";

const ProductRecomended = async () => {
  const db = new PrismaClient();
  const products = await db.product.findMany({ take: 4 });
  return (
    <>
      <div className="px-5 sm:px-20">
        <div className="flex flex-col justify-center items-center gap-3 sm:gap-6 mt-20">
          <h2 className="text-xl font-semibold sm:text-2xl">
            You may also like
          </h2>
          <div className="grid grid-cols-4 grid-cols-1 sm:gap-4 gap-2">
            {products?.map((product, index: number) => (
              <div key={index}>
                <ProductCard
                  id={product.id}
                  productName={product.name}
                  slug={product.slug}
                  price={product.price}
                  desciprion=""
                  image={{
                    src: product.imageUrl,
                    alt: product.name,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductRecomended;
