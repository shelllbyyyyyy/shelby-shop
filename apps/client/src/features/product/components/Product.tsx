import * as Icon from "lucide-react";

import db from "@/db";
import { AddToCart, BuyNow } from "@/features/cart";
import { toRupiah } from "@/lib/utils";

import { ImageCarousel } from "./items/ImageCarousel";

const getProducts = async ({ slug }: { slug: string }) => {
  return await db.product.findUnique({
    where: { slug: slug },
    include: {
      productVariant: true,
    },
  });
};

export const Product = async ({ slug }: { slug: string }) => {
  const product = await getProducts({ slug });

  return (
    <div className="flex max-sm:flex-col w-full gap-5">
      <ImageCarousel images={product!.imageUrl} />

      <div className="flex flex-col gap-2 sm:ml-10">
        <h1 className="text-2xl lg:text-4xl font-semibold">{product?.name}</h1>
        <div className="flex">
          <div className="flex">
            <Icon.Star size={20} fill="orange" />
            <Icon.Star size={20} fill="orange" />
            <Icon.Star size={20} fill="orange" />
            <Icon.Star size={20} fill="orange" />
            <Icon.Star size={20} />
          </div>
          <p>(4)</p>
        </div>
        <h4 className="text-md lg:text-xl font-semibold">Details: </h4>
        <p className="text-md lg:text-xl">{product?.description}</p>
        <p className="text-accent font-semibold text-xl lg:text-2xl">
          {toRupiah(product?.price)}
        </p>

        <div className="flex max-sm:flex-col gap-5 mt-2">
          <AddToCart
            productName={product!.name}
            data={product!.productVariant[0]}
          />
          <BuyNow
            name={product!.name}
            imageUrl={product!.imageUrl[0]}
            price={product!.price}
          />
        </div>
      </div>
    </div>
  );
};
