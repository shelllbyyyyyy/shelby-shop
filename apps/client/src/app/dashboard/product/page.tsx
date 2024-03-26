"use client";

import { useFetchProductQuery } from "@shelby/api";
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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { axios } from "@/lib/axios";

const Product = () => {
  const { data: product } = useFetchProductQuery({});

  const handleDelete = async (slug: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
  };

  return (
    <Table>
      <TableCaption>A list of product.</TableCaption>
      <TableHeader className="bg-accent/90 text-white">
        <TableRow className="hover:bg-muted/0">
          <TableHead className="w-[100px]">Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Others</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product?.data.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-bold">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.description}</TableCell>
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
                  <DropdownMenuItem asChild className="focus:bg-yellow-500">
                    <Link
                      href={`/dashboard/product/editproduct/${product.slug}`}
                    >
                      <Icon.Pen size={14} className="mr-2" />
                      Edit Product
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-semibold text-red-500"
                    onClick={() => handleDelete(product.slug)}
                  >
                    <Icon.Trash size={14} className="mr-2" />
                    Delete product
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            <Link href="/dashboard/product/addproduct">
              <Button className="bg-green-500">Add a Product</Button>
            </Link>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Product;
