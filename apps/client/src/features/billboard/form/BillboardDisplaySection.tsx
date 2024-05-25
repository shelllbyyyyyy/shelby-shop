import { useGetBillboardQuery } from "@shelby/api";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <>
      <div className="flex flex-col w-full gap-2 py-10">
        <DialogHeader>
          <DialogTitle>Billboard</DialogTitle>
          <div className="relative h-96 w-full aspect-square rounded-xl">
            <Image
              src={billboard?.imageUrl as string}
              alt="billboard"
              fill
              className="overflow-hidden object-contain rounded-xl py-4"
            />
          </div>

          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm md:text-md">Tittle</p>
          <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
            <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
              {billboard?.tittle}
            </h3>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm md:text-md w-full">Label</p>
          <div className="flex items-center w-full rounded-md border p-4">
            <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
              {billboard?.label}
            </h3>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm md:text-md">Section</p>
          <div className="flex justify-between items-center w-full space-x-4 rounded-md border p-4">
            <h3 className="text-md md:text-lg font-semibold sm:text-2xl">
              {billboard?.section}
            </h3>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onEditBillboard} variant="secondary">
            Edit Billboard
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
