"use server";

import * as Icon from "lucide-react";
import Image from "next/image";
import { Product as TProduct } from "@shelby/db";

import { toRupiah } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

import { AddToCart, BuyNow } from "@/features/cart";

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
  const product = await getData({ slug });

  return (
    <div className="flex flex-col py-5 sm:px-20 sm:py-10 sm:gap-20 gap-10">
      <div className="flex flex-col w-full sm:flex-row max-sm:space-y-5">
        <div className="flex flex-col gap-3">
          <div className="max-sm:flex max-sm:justify-center max-sm:items-center max-sm:px-2 bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105 transition duration-500">
            <Image
              src={product?.imageUrl}
              alt={product?.name}
              width={300}
              height={300}
              className="max-sm:size-96 size-[400px] object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mx-5 sm:mx-20">
          <h1 className="text-2xl font-semibold">{product?.name}</h1>
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
          <h4 className="text-md font-semibold">Details: </h4>
          <p>{product?.description}</p>
          <p className="text-accent font-semibold text-xl">
            {toRupiah(product.price)}
          </p>

          <div className="flex max-sm:flex-col gap-5 mt-2 sm:mt-36">
            <AddToCart
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
            />
            <BuyNow
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
