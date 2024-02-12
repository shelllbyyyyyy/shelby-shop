import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

const ProductPage = () => {
  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex h-screen justify-center items-center">
          Product
        </Container>
      </AuthenticatedRoute>
    </>
  );
};

export default ProductPage;
