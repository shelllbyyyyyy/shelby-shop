import React from "react";

import Container from "@/components/elements/Container";

import { Form } from "@/features/auth/form";
import GuestRoute from "@/components/provider/guest-routes";
import Footer from "@/components/elements/Footer";

const AuthPage = () => {
  return (
    <>
      <GuestRoute>
        <Container className="flex h-screen justify-center items-center py-10">
          <Form />
        </Container>
        <Footer />
      </GuestRoute>
    </>
  );
};

export default AuthPage;
