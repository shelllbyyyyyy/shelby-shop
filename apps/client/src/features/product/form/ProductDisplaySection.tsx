import { useGetProductQuery } from "@shelby/api";

import Wrapper from "@/components/elements/Wrapper";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toRupiah } from "@/lib/utils";

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
    <div className="flex flex-col h-screen w-full gap-4 lg:gap-8">
      <div className="flex h-[400px] w-full justify-center items-center bg-accent/80">
        <img src={product?.imageUrl} alt={product?.name} className="h-96" />
      </div>

      <div className="flex flex-col h-auto w-full justify-center items-center">
        <Wrapper>
          <Card>
            <CardHeader>
              <CardTitle>Product</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
                <p className="text-sm md:text-md">Name :</p>
                <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                  {product?.name}
                </h3>
              </div>
            </CardContent>
            <CardContent className="flex">
              <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
                <p className="text-sm md:text-md">Description :</p>
                <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                  {product?.description}
                </h3>
              </div>
            </CardContent>
            <CardContent className="flex">
              <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
                <p className="text-sm md:text-md">Price :</p>
                <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                  {toRupiah(product?.price)}
                </h3>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onEditProduct} variant="secondary">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </Wrapper>
      </div>
    </div>
  );
};
