import React from "react";

import { ProductGridSection } from "./ProductCard";

import db from "@/db";
import { cache } from "@/lib/chace";

const getRecommendedProduct = cache(
  () => {
    return db.product.findMany({ take: 4, orderBy: { name: "desc" } });
  },
  ["/products", "getProducts"],
  { revalidate: 60 * 60 * 24 }
);

export const ProductRecomended = async () => {
  return (
    <>
      <div className="px-5 sm:px-20">
        <div className="flex flex-col justify-center items-center gap-3 sm:gap-6 mt-20">
          <h2 className="text-xl font-semibold sm:text-2xl">
            You may also like
          </h2>
          <div className="grid grid-cols-4 grid-cols-1 sm:gap-4 gap-2">
            <ProductGridSection productsFetcher={getRecommendedProduct} />
          </div>
        </div>
      </div>
    </>
  );
};
