import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

import { Product } from "@/features/product/components/Product";
import Footer from "@/components/elements/Footer";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex flex-col mb-16 mx-10">
          <Product slug={slug} />
        </Container>
        <Footer />
      </AuthenticatedRoute>
    </>
  );
};

export default ProductDetailPage;
