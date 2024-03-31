"use client";

import { useGetAllUserQuery } from "@shelby/api";
import * as Icon from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

const UserPage = () => {
  const { data: user } = useGetAllUserQuery({});

  const handleDelete = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-accent/90 text-white">
          <TableRow className="hover:bg-muted/0">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Others</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger className="self-start">
                    <Icon.MoreVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={8}>
                    <DropdownMenuItem
                      className="font-semibold text-red-500"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Icon.Trash size={14} className="mr-2" />
                      Delete user
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

export default UserPage;
