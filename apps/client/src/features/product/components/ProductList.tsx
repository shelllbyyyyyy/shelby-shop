import { ProductCard } from "./ProductCard";
import { createClient } from "@/utils/supabase/server";

async function getData() {
  const { data } = await createClient().auth.getSession();

  const token = data.session?.access_token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export const ProductList = async () => {
  const product = await getData();

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
        {product.map((product: any) => {
          return (
            <ProductCard
              key={product.id}
              image={{
                src: product?.imageUrl,
                alt: product.name,
                height: 100,
                width: 100,
              }}
              productName={product.name}
              desciprion={product.description}
              price={product.price}
              slug={product.slug}
            />
          );
        })}
      </div>
    </>
  );
};
