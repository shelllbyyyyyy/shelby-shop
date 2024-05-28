import React from "react";

import { ProductGridSection } from "./ProductCard";

import db from "@/db";

const getRecommendedProduct = () => {
  return db.product.findMany({ take: 6, orderBy: { name: "desc" } });
};

export const ProductRecomended = async () => {
  return (
    <>
      <div className="flex flex-col w-full gap-3 sm:gap-6 mt-20">
        <h2 className="text-xl font-semibold sm:text-2xl text-center">
          You may also like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 gap-2">
          <ProductGridSection productsFetcher={getRecommendedProduct} />
        </div>
      </div>
    </>
  );
};
