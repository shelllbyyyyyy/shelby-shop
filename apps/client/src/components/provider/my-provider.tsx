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

type MyProviderProps = {
  children: React.ReactNode;
};

const axiosManager = new AxiosManager();

const MyProvider = ({ children }: MyProviderProps) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useAppSelector((state) => state.authslice.isLoggin);

  useLayoutEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("access_token", session?.access_token);
        dispatch(onAuthSuccess(isLogin));
      } else if (event === "SIGNED_OUT") {
        localStorage.clear();
        dispatch(onLogout());
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ApiClientProvider axiosInstance={axiosManager.axios}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiClientProvider>
  );
};

export default MyProvider;
