"use client";

import { useDeleteCategoryMutation, useFetchCategoryQuery } from "@shelby/api";
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

import { AddCategory } from "@/features/category";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { Delete } from "@/components/action/Delete";
import { EditCategory } from "@/features/category/components/EditCategory";

const category = () => {
  const { data: category } = useFetchCategoryQuery({});

  const { mutateAsync: deleteCategory } = useDeleteCategoryMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCategory"],
      });
      toast.success("Category has been deleted");
    },
  });

  const handleDelete = async (values: { id: string }) => {
    await deleteCategory(values);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-medium">Category</h1>
        <AddCategory />
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
                    <DropdownMenuItem
                      asChild
                      className="focus:bg-yellow-500"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div>
                        <Icon.Pen size={14} className="mr-2" />
                        <EditCategory id={category.id} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Delete
                        onClick={() => handleDelete({ id: category.id })}
                      />
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
