"use client";

import React, { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { ApiClientProvider } from "@shelby/api";
import {
  Session,
  SessionContextProvider,
  supabaseClient,
} from "@shelby/supabase";

import { AxiosManager } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";

type SessionProviderProps = {
  children: React.ReactNode;
};

const axiosManager = new AxiosManager();

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("access_token", session?.access_token);
        setSession(session);
      } else if (event === "SIGNED_OUT") {
        localStorage.clear();
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
