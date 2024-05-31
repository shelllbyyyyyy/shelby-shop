"use client";

import { useFetchInventoryQuery } from "@shelby/api";
import Link from "next/link";
import * as Icon from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UpdateInventory } from "@/features/inventory";

import { axios } from "@/lib/axios";
import { toRupiah } from "@/lib/utils";

const Inventory = () => {
  const { data: inventory } = useFetchInventoryQuery({});

  const handleDelete = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-medium">Inventory</h1>
        <Link href="/admin/Inventory/addInventory">
          <Button className="bg-primary">Add a Inventory</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Variant Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Others</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.data.map((inventory) => (
            <TableRow key={inventory.id}>
              <TableCell className="font-bold">
                {inventory.productVariant.product?.name as string}
              </TableCell>
              <TableCell className="font-bold">
                {inventory.productVariant.sku}
              </TableCell>
              <TableCell className="font-bold">
                {inventory.productVariant.label}
              </TableCell>
              <TableCell className="font-bold">
                {toRupiah(inventory.productVariant.price)}
              </TableCell>
              <TableCell>{inventory.quantity}</TableCell>
              <TableCell>{inventory.status}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger className="self-start">
                    <Icon.MoreVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={8}>
                    <DropdownMenuLabel className="text-center">
                      Preferences
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      asChild
                      className="focus:bg-yellow-500"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div>
                        <Icon.Pen size={14} className="mr-2" />
                        <UpdateInventory id={inventory.id} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onClick={() => handleDelete(inventory.id)}
                    >
                      <Icon.Trash size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Inventory;
