"use client";

import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@shelby/supabase";

type GuestProps = {
  children: React.ReactNode;
};

const GuestRoutes = ({ children }: GuestProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/home");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default GuestRoutes;
