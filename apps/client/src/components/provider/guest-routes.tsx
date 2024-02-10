"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@shelby/supabase";

type GuestProps = {
  children: React.ReactNode;
};

const GuestRoutes = ({ children }: GuestProps) => {
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session === null) {
        router.replace("/auth");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children};</>;
};

export default GuestRoutes;
