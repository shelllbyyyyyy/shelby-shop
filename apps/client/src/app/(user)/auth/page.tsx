"use client";

import React, { useLayoutEffect } from "react";

import Container from "@/components/elements/Container";

import { Form } from "@/features/auth/form";
import { supabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/home");
      }
    });
  }, []);

  return (
    <>
      <Container className="flex h-screen justify-center items-center py-10">
        <Form />
      </Container>
    </>
  );
};

export default AuthPage;
