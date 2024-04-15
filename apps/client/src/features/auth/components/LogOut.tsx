"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { clearCart } from "@/features/cart";
import { AppDispatch } from "@/lib/redux/store";
import { supabaseClient } from "@/utils/supabase/client";

export const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const logout = () => {
    supabaseClient.auth.signOut();

    dispatch(clearCart());
    router.push("/");
  };

  return (
    <span className="font-semibold text-red-500" onClick={logout}>
      Logout
    </span>
  );
};
