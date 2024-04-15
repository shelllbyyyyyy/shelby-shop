import React from "react";

import Container from "@/components/elements/Container";
import { Product, ProductRecomended } from "@/features/product";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <Container className="px-0">
        <Product slug={slug} />
        <ProductRecomended />
      </Container>
    </>
  );
};

export default ProductDetailPage;
