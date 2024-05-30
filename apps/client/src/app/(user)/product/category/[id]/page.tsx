import React from "react";

import HeaderCategory from "../../_components/HeaderCategory";

import db from "@/db";
import { ProductCard } from "@/features/product";

const getProduct = async (id: string) => {
  return await db.category.findFirst({
    where: { id },
    select: {
      categoriesOnProducts: {
        select: {
          product: {
            include: {
              productVariant: {
                include: { inventory: { select: { quantity: true } } },
              },
            },
          },
        },
      },
    },
  });
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const result = await getProduct(id);

  const category = result?.categoriesOnProducts;

  return (
    <>
      <div className="flex flex-col h-auto w-full gap-5">
        <HeaderCategory />
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
          {category?.map((item) => (
            <ProductCard key={item.product.id} data={item.product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
