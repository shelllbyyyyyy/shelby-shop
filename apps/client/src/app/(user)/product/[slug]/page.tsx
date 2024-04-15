import React from "react";

import Container from "@/components/elements/Container";

import { Product } from "@/features/product/components/Product";
import ProductRecomended from "@/features/product/components/ProductRecomended";

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
