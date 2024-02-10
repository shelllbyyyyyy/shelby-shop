import React from "react";

import Container from "@/components/elements/Container";
import GuestRoutes from "@/components/provider/guest-routes";

const ProductPage = () => {
  return (
    <>
      <GuestRoutes>
        <Container className="flex h-screen justify-center items-center">
          Product
        </Container>
      </GuestRoutes>
    </>
  );
};

export default ProductPage;
