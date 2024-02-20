import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

import { Product } from "@/features/product/components/Product";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex h-screen justify-center items-center my-10 mx-5">
          <Product slug={slug} />
        </Container>
      </AuthenticatedRoute>
    </>
  );
};

export default ProductDetailPage;
