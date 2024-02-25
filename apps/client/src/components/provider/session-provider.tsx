"use client";

import React, { useLayoutEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { ApiClientProvider, QueryClientProvider } from "@shelby/api";

import { AxiosManager } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";

import { supabaseClient } from "@/utils/supabase/client";

type SessionProviderProps = {
  children: React.ReactNode;
};

const axiosManager = new AxiosManager();

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("access_token", session?.access_token);
        setSession(session);
      } else if (event === "SIGNED_OUT") {
        localStorage.clear();
        router.push("/");
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={session}
    >
      <ApiClientProvider axiosInstance={axiosManager.axios}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ApiClientProvider>
    </SessionContextProvider>
  );
};

export default SessionProvider;
