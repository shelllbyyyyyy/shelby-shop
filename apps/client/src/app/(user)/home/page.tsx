import React from "react";

import Container from "@/components/elements/Container";
import { ProductList } from "@/features/product/components/ProductList";

const HomePage = () => {
  return (
    <>
      <Container>
        <ProductList />
      </Container>
    </>
  );
};

export default HomePage;
