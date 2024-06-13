import React from "react";
import { useRouter } from "next/router";
import ProductDetail from "../../../src/components/user/ProductDetail";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProductDetail id={id as string} />;
};

export default ProductDetailPage;
