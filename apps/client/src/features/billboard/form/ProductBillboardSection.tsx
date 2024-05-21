import { useGetBillboardQuery } from "@shelby/api";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BillboardDisplaySection {
  onEditBillboard: () => void;
  id: string;
}

export const BillboardDisplaySection: React.FC<BillboardDisplaySection> = ({
  onEditBillboard,
  id,
}) => {
  const { data: billboard } = useGetBillboardQuery({ id });

  return (
    <div className="flex flex-col h-screen w-full gap-4 lg:gap-8">
      <div className="relative h-auto w-full aspect-square rounded-xl ">
        <Image
          src={billboard?.imageUrl as string}
          alt="billboard"
          fill
          className="overflow-hidden object-contain rounded-xl py-4"
        />
      </div>

      <div className="flex flex-col h-auto w-full justify-center items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Billboard</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm md:text-md">Tittle</p>
            <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
              <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                {billboard?.tittle}
              </h3>
            </div>
          </CardContent>
          <CardContent className="space-y-2">
            <p className="text-sm md:text-md w-full">Label</p>
            <div className="flex items-center w-full rounded-md border p-4">
              <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                {billboard?.label}
              </h3>
            </div>
          </CardContent>
          <CardContent className="space-y-2">
            <p className="text-sm md:text-md">Section</p>
            <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
              <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
                {billboard?.section}
              </h3>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onEditBillboard} variant="secondary">
              Edit Billboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
