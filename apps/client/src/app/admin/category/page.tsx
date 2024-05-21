"use client";

import { useFetchCategoryQuery } from "@shelby/api";
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

const category = () => {
  const { data: category } = useFetchCategoryQuery({});

  const handleDelete = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-medium">Category</h1>
        <Link href="/admin/category/addcategory">
          <Button className="bg-primary">Add a category</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead>Tittle</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Others</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category?.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{category.createdAt.toLocaleString()}</TableCell>
              <TableCell>{category.updatedAt.toLocaleString()}</TableCell>
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
                        href={`/admin/category/editcategory/${category.id}`}
                      >
                        <Icon.Pen size={14} className="mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onClick={() => handleDelete(category.id)}
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

export default category;
