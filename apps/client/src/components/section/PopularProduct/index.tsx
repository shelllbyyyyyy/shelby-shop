import React from "react";

import Container from "@/components/elements/Container";
import db from "@/db";
import { ProductGridSection } from "@/features/product";

const getPopularProducts = () => {
  return db.product.findMany({ orderBy: { name: "asc" }, take: 4 });
};

export const PopularProduct = async () => {
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
          <ProductGridSection productsFetcher={getPopularProducts} />
        </div>
      </section>
    </Container>
  );
};
