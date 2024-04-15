import React from "react";

import Container from "@/components/elements/Container";
import db from "@/db";
import { ProductGridSection } from "@/features/product/components/ProductCard";
import { cache } from "@/lib/chace";

const getNewProducts = cache(() => {
  return db.product.findMany({ orderBy: { name: "desc" }, take: 4 });
}, ["/", "getNewProducts"]);

export const NewDrop = async () => {
  return (
    <Container>
      <section>
        <div className="flex flex-col items-end text-end">
          <h2 className="text-4xl font-palanquin font-bold">
            <span className="text-accent/80"> New </span> Drops
          </h2>
          <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
            Our latest product. Discover a world of new comfort, new design, and
            value.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
          <ProductGridSection productsFetcher={getNewProducts} />
        </div>
      </section>
    </Container>
  );
};
