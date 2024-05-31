import React from "react";

import Container from "@/components/elements/Container";
import { ProductList } from "@/features/product";

import Banner from "./_components/Banner";
import HeaderCategory from "./_components/HeaderCategory";
import { Separator } from "@/components/ui/separator";

const ProductPage = () => {
  return (
    <>
      <Container className="flex flex-col w-full space-y-5">
        <Banner />
        <HeaderCategory />
        <Separator />
        <ProductList />
      </Container>
    </>
  );
};

export default ProductPage;
