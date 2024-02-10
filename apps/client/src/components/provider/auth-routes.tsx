"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@shelby/supabase";

type AuthProps = {
  children: React.ReactNode;
};

const AuthRoutes = ({ children }: AuthProps) => {
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/home");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children};</>;
};

export default AuthRoutes;
