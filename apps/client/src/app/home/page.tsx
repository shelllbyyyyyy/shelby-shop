import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";
import { ProductList } from "@/features/product/components/ProductList";

const HomePage = async () => {
  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex h-screen justify-center items-center">
          <ProductList />
        </Container>
      </AuthenticatedRoute>
    </>
  );
};

export default HomePage;
