"use client";

import React, { useLayoutEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

import { ApiClientProvider, QueryClientProvider } from "@shelby/api";

import { AxiosManager } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";

import { supabaseClient } from "@/utils/supabase/client";

type MyProviderProps = {
  children: React.ReactNode;
};

const axiosManager = new AxiosManager();

const MyProvider = ({ children }: MyProviderProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApiClientProvider axiosInstance={axiosManager.axios}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiClientProvider>
  );
};

export default MyProvider;
