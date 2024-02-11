import React from "react";

import Container from "@/components/elements/Container";
import GuestRoutes from "@/components/provider/guest-routes";

const HomePage = () => {
  return (
    <>
      <GuestRoutes>
        <Container className="flex h-screen justify-center items-center">
          Home
        </Container>
      </GuestRoutes>
    </>
  );
};

export default HomePage;
