"use client";

import React, { useLayoutEffect } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { ApiClientProvider, QueryClientProvider } from "@shelby/api";

import { onAuthSuccess, onLogout } from "@/features/auth/modules/authSlice";

import { AxiosManager } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";

import { supabaseClient } from "@/utils/supabase/client";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

type MyProviderProps = {
  children: React.ReactNode;
};

const axiosManager = new AxiosManager();

const MyProvider = ({ children }: MyProviderProps) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useAppSelector(
    (state) => state.persistedReducer.authSlice.isLoggin
  );

  useLayoutEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("access_token", session?.access_token);
        dispatch(onAuthSuccess(isLogin));
      } else if (event === "SIGNED_OUT") {
        toast.info("You've been logout");
        localStorage.clear();
        dispatch(onLogout());
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ApiClientProvider axiosInstance={axiosManager.axios}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error:
                "card bg-card p-3 rounded-md shadow-md border border-gray right-0 text-red-400",
              success:
                "card bg-card p-3 rounded-md shadow-md border border-gray right-0 text-green-400",
              warning:
                "card bg-card p-3 rounded-md shadow-md border border-gray right-0 text-yellow-400",
              info: "card bg-card p-3 rounded-md shadow-md border border-gray right-0 text-blue-400",
            },
          }}
        />
      </QueryClientProvider>
    </ApiClientProvider>
  );
};

export default MyProvider;
