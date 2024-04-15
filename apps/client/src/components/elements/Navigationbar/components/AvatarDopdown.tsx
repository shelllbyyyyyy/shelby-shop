"use client";

import Link from "next/link";
import { useGetProfileQuery } from "@shelby/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { clearCart } from "@/features/cart";

import { supabaseClient } from "@/utils/supabase/client";
import { AppDispatch } from "@/lib/redux/store";

export const AvatarDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { data: profile } = useGetProfileQuery({});

  const logout = () => {
    supabaseClient.auth.signOut();

    dispatch(clearCart());
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="self-start">
        <Avatar className="h-7 w-7 md:h-9 md:w-9">
          <AvatarFallback></AvatarFallback>
          <AvatarImage src={profile?.data.profilePictureUrl!} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/dashboard">Admin</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          className="font-semibold text-red-500"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
