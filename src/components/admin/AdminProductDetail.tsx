import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CardContent, Grid } from "@mui/material";
import { Product } from "../../contexts/ProductContext";
import { HeaderSpace, ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { fetchProductDetail } from "../../features/api";
import { CustomButton, CustomTypography } from "../../features/components";

interface AdminProductDetailProps {
  id: string;
}

const AdminProductDetail: React.FC<AdminProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 削除モーダルの開閉状態
  const [openEditModal, setOpenEditModal] = useState(false); // 編集モーダルの開閉状態
  const auth =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  const router = useRouter();

  // 商品詳細を取得する関数
  const loadProductDetail = useCallback(async () => {
    if (id) {
      try {
        const data = await fetchProductDetail(id as string);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    // ログインしていない場合は/adminにリダイレクト
    if (!auth) {
      router.push("/admin");
    }
    loadProductDetail();
  }, [id, auth, router, loadProductDetail]);

  // 削除モーダルを開く関数
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  // 削除モーダルを閉じる関数
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // 編集モーダルを開く関数
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  // 編集モーダルを閉じる関数
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  if (!product) {
    return (
      <>
        <AdminHeader />
        <CustomTypography
          variant="h6"
          text={"商品が見つかりませんでした。"}
        ></CustomTypography>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <HeaderSpace />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProductCardContainer style={{ margin: "20px" }}>
            <CardContent style={{ textAlign: "center" }}>
              <CustomTypography
                variant="h4"
                text={product.name}
              ></CustomTypography>
              <CustomTypography
                variant="subtitle1"
                text={`価格: ${product.price} 円`}
              ></CustomTypography>
              <CustomTypography
                variant="body1"
                text={product.content}
              ></CustomTypography>
            </CardContent>
          </ProductCardContainer>
          <div style={{ textAlign: "right", margin: "20px" }}>
            <CustomButton onClick={handleOpenEditModal} label="編集する" />
            <CustomButton
              onClick={handleOpenDeleteModal}
              label="削除する"
              color="error"
            />
          </div>
        </Grid>
      </Grid>

      <DeleteProductModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        productId={product.id} // 削除モーダルに表示する商品データを渡す
      />

      <EditProductModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onUpdated={loadProductDetail} // 編集モーダルが閉じた後にデータを再取得
        productData={product} // 編集モーダルに表示する商品データを渡す
      />
    </>
  );
};

export default AdminProductDetail;
