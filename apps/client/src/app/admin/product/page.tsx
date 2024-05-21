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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { axios } from "@/lib/axios";
import { formatDate, toRupiah } from "@/lib/utils";

const Product = () => {
  const { data: product } = useFetchProductQuery({});

  const handleDelete = async (slug: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-medium">Product</h1>
        <Link href="/admin/product/addproduct">
          <Button className="bg-primary">Add a Product</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Others</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product?.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-bold">{product.name}</TableCell>
              <TableCell>{toRupiah(product.price)}</TableCell>
              <TableCell className="line-clamp-1">
                {product.description}
              </TableCell>
              <TableCell>{product.createdAt.toLocaleString()}</TableCell>
              <TableCell>{product.updatedAt.toLocaleString()}</TableCell>
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
                      <Link href={`/admin/product/${product.slug}/addvariant`}>
                        <Icon.Plus size={14} className="mr-2" />
                        Add variant
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="focus:bg-yellow-500">
                      <Link href={`/admin/product/editproduct/${product.slug}`}>
                        <Icon.Pen size={14} className="mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onClick={() => handleDelete(product.slug)}
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

export default Product;
