"use client";

import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@shelby/supabase";

type AuthenticatedProps = {
  children: React.ReactNode;
};

const AuthenticatedRoutes = ({ children }: AuthenticatedProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session === null) {
        router.push("/auth");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default AuthenticatedRoutes;
