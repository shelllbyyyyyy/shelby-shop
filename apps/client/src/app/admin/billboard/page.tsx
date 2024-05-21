"use client";

import { useFetchBillboardQuery } from "@shelby/api";
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

const Billboard = () => {
  const { data: billboard } = useFetchBillboardQuery({});

  const handleDelete = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/billboard/${id}`);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-medium">Billboard</h1>
        <Link href="/admin/billboard/addbillboard">
          <Button className="bg-primary">Add a Billboard</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/0">
            <TableHead>Section</TableHead>
            <TableHead>Tittle</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Others</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billboard?.data.map((billboard) => (
            <TableRow key={billboard.id}>
              <TableCell className="font-bold">{billboard.section}</TableCell>
              <TableCell>{billboard.tittle}</TableCell>
              <TableCell className="line-clamp-1">{billboard.label}</TableCell>
              <TableCell>{billboard.createdAt.toLocaleString()}</TableCell>
              <TableCell>{billboard.updatedAt.toLocaleString()}</TableCell>
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
                        href={`/admin/billboard/editbillboard/${billboard.id}`}
                      >
                        <Icon.Pen size={14} className="mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onClick={() => handleDelete(billboard.id)}
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

export default Billboard;
