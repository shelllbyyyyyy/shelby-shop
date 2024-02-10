import React from "react";

import Container from "@/components/elements/Container";

import { Form } from "@/features/auth/form";

const AuthPage = () => {
  return (
    <>
      <Container className="flex h-screen justify-center items-center py-10">
        <Form />
      </Container>
    </>
  );
};

export default AuthPage;
