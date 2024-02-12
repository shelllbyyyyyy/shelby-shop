import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

const HomePage = () => {
  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex h-screen justify-center items-center">
          Home
        </Container>
      </AuthenticatedRoute>
    </>
  );
};

export default HomePage;
