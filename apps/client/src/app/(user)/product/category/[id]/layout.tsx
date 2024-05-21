import React from "react";

import Banner from "../../_components/Banner";
import Container from "@/components/elements/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container className="space-y-5">
        <Banner />
        {children}
      </Container>
    </>
  );
}
