import React from "react";
import { useRouter } from "next/router";
import AdminProductDetail from "../../../src/components/admin/AdminProductDetail";

const AdminProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <AdminProductDetail id={id as string} />;
};

export default AdminProductDetailPage;
