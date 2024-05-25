"use client";

import { useRouter } from "next/navigation";

import { supabaseClient } from "@/utils/supabase/client";

export const Logout = () => {
  const router = useRouter();
  const logout = () => {
    supabaseClient.auth.signOut();

    router.push("/");
  };

  return (
    <span className="font-semibold text-red-500" onClick={logout}>
      Logout
    </span>
  );
};
