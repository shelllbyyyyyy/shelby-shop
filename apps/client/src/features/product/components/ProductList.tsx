import { cache } from "@/lib/chace";
import { ProductGridSection } from "./ProductCard";
import db from "@/db";

const getAllProduct = cache(
  () => {
    return db.product.findMany({
      include: {
        productVariant: {
          include: { inventory: { select: { quantity: true } } },
        },
      },
    });
  },
  ["/product", "/home", "getAllProduct"],
  { revalidate: 60 }
);

export const ProductList = async () => {
  return (
    <>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
        <ProductGridSection productsFetcher={getAllProduct} />
      </div>
    </>
  );
};
