import React from "react";
import { PrismaClient } from "@shelby/db";

import { ProductCard } from "@/features/product/components/ProductCard";
import Container from "@/components/elements/Container";

export const PopularProduct = async () => {
  const db = new PrismaClient();
  const products = await db.product.findMany({ take: 4 });

  return (
    <Container>
      <section>
        <div className="flex flex-col justify-start">
          <h2 className="text-4xl font-palanquin font-bold">
            <span className="text-accent/80"> Popular </span> Products
          </h2>
          <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
            Experience top-notch quality and style with our sought-after
            selections. Discover a world of comfort, design, and value
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
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
      </section>
    </Container>
  );
};
