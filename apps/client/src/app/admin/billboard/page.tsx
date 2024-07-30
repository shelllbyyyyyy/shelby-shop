"use client";

import {
  useDeleteBillboardMutation,
  useFetchBillboardQuery,
} from "@shelby/api";
import { toast } from "sonner";
import * as Icon from "lucide-react";

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

import { AddBillboard, EditBillboard } from "@/features/billboard";
import { Delete } from "@/components/action/Delete";
import { queryClient } from "@/lib/react-query";

const Billboard = () => {
  const { data: billboard } = useFetchBillboardQuery({});

  const { mutateAsync: deleteBillboard } = useDeleteBillboardMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getBillboard"],
      });
      toast.success("Billboard has been deleted");
    },
    onError: (data) => {
      toast.error(`${data.cause}`);
    },
  });

  const handleDelete = async (values: { id: string }) => {
    await deleteBillboard(values);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-medium">Billboard</h1>
        <AddBillboard />
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
                    <DropdownMenuItem
                      asChild
                      className="focus:bg-yellow-500"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div>
                        <Icon.Pen size={14} className="mr-2" />
                        <EditBillboard id={billboard.id} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Delete
                        onClick={() => handleDelete({ id: billboard.id })}
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

export default Billboard;
