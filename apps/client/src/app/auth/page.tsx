import React from "react";

import Container from "@/components/elements/Container";

import { Form } from "@/features/auth/form";
import AuthRoutes from "@/components/provider/auth-routes";

const AuthPage = () => {
  return (
    <>
      <AuthRoutes>
        <Container className="flex h-screen justify-center items-center py-10">
          <Form />
        </Container>
      </AuthRoutes>
    </>
  );
};

export default AuthPage;
