import React from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

import { Product } from "@/features/product/components/Product";
import ProductRecomended from "@/features/product/components/ProductRecomended";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <AuthenticatedRoute>
        <Container className="px-0">
          <Product slug={slug} />
          <ProductRecomended />
        </Container>
      </AuthenticatedRoute>
    </>
  );
};

export default ProductDetailPage;
