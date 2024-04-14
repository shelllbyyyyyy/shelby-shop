import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";
import { ProductList } from "@/features/product/components/ProductList";

const HomePage = () => {
  return (
    <>
      <AuthenticatedRoute>
        <Container>
          <ProductList />
        </Container>
      </AuthenticatedRoute>
    </>
  );
};

export default HomePage;
