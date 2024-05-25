import { useGetProductQuery } from "@shelby/api";

import Wrapper from "@/app/admin/_components/Wrapper";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toRupiah } from "@/lib/utils";
import Image from "next/image";

interface ProductDisplaySection {
  onEditProduct: () => void;
  slug: string;
}

export const ProductDisplaySection: React.FC<ProductDisplaySection> = ({
  onEditProduct,
  slug,
}) => {
  const { data: product } = useGetProductQuery({ slug });

  return (
    <div className="flex flex-col w-full gap-2 py-10">
      <DialogHeader>
        <DialogTitle>Product</DialogTitle>
        <div className="relative h-96 w-full aspect-square rounded-xl ">
          <Image
            src={product?.imageUrl[0] as string}
            alt={product?.name as string}
            fill
            className="overflow-hidden object-contain rounded-xl py-4"
          />
        </div>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <p className="text-sm md:text-md">Name</p>
        <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
          <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
            {product?.name}
          </h3>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm md:text-md w-full">Description</p>
        <div className="flex items-center w-full rounded-md border p-4">
          <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
            {product?.description}
          </h3>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm md:text-md">Price</p>
        <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
          <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
            {toRupiah(product?.price)}
          </h3>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onEditProduct} variant="secondary">
          Edit Product
        </Button>
      </DialogFooter>
    </div>
  );
};
