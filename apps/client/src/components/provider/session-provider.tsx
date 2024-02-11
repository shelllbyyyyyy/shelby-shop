"use client";

import React, { useEffect, useState } from "react";

import {
  Session,
  SessionContextProvider,
  supabaseClient,
} from "@shelby/supabase";

type SessionProviderProps = {
  children: React.ReactNode;
};

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session);
      } else if (event === "SIGNED_OUT") {
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
      {children}
    </SessionContextProvider>
  );
};

export default SessionProvider;
