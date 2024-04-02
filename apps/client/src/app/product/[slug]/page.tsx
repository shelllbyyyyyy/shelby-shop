import React, { Suspense } from "react";

import Container from "@/components/elements/Container";
import AuthenticatedRoute from "@/components/provider/authenticated-routes";

import { Product } from "@/features/product/components/Product";
import Footer from "@/components/elements/Footer";
import { Loading } from "@/features/loading";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <AuthenticatedRoute>
        <Container className="flex flex-col mb-16 mx-10">
          <Suspense fallback={<Loading />}>
            <Product slug={slug} />
          </Suspense>
        </Container>
        <Footer />
      </AuthenticatedRoute>
    </>
  );
};

export default ProductDetailPage;
