import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";
import { ProductList } from "@/features/product/components/ProductList";
import Footer from "@/components/elements/Footer";

const HomePage = () => {
  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex flex-col">
          <ProductList />
        </Container>
        <Footer />
      </AuthenticatedRoute>
    </>
  );
};

export default HomePage;
