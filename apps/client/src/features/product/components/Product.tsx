import * as Icon from "lucide-react";
import Image from "next/image";
import { Product as TProduct } from "@shelby/db";

import { toRupiah } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

import { AddToCart, BuyNow } from "@/features/cart";
import { cache } from "@/lib/chace";
import db from "@/db";

const getProducts = cache(
  ({ slug }: { slug: string }) => {
    const data = db.product.findUnique({
      where: { slug: slug },
    });
    return data;
  },
  ["/product/:slug", "getProducts"]
);

async function getData({ slug }: { slug: string }) {
  const token = (await createClient().auth.getSession()).data.session
    ?.access_token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const product: Promise<TProduct> = res.json();

  return product;
}

export const Product = async ({ slug }: { slug: string }) => {
  const product = await getProducts({ slug });

  return (
    <div className="flex flex-col px-5 sm:px-20 sm:py-10 sm:gap-20 gap-10">
      <div className="flex flex-col w-full sm:grid sm:grid-cols-2 max-sm:space-y-5">
        <div className="relative h-auto w-full aspect-square bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105 transition duration-300 overflow-hidden">
          <Image
            src={product!.imageUrl[0]}
            alt={product!.name}
            fill
            className="object-contain p-5"
          />
        </div>

        <div className="flex flex-col gap-2 sm:ml-10">
          <h1 className="text-2xl lg:text-4xl font-semibold">
            {product?.name}
          </h1>
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
              id={product!.id}
              name={product!.name}
              imageUrl={product!.imageUrl[0]}
              price={product!.price}
            />
            <BuyNow
              name={product!.name}
              imageUrl={product!.imageUrl[0]}
              price={product!.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
