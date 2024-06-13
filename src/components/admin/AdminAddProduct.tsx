import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { AdminHeader } from "../common/Header";
import { useAuth } from "../../contexts/AuthContext";
import AddProductModal from "./AddProductModal";
import { useRouter } from "next/router";
import { createProduct } from "../../features/api";
import { CustomButton, CustomTextField } from "../../features/components";

const AdminAddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false); // 成功モーダルの表示状態
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // API通信の結果を保存する状態
  const [error, setError] = useState(""); // エラーメッセージの状態
  const { token } = useAuth();
  const router = useRouter();
  const auth =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (!auth) {
      router.push("/admin/home");
    }
  }, [auth, router]);

  const handleSave = async () => {
    if (!productName || !price || !description) {
      setError("全ての項目を入力してください");
      return;
    }

    try {
      await createProduct(productName, Number(price), description, token);
      setIsSuccess(true);
      setSuccessModalOpen(true);

      setProductName("");
      setPrice("");
      setDescription("");
      setError("");
    } catch (error) {
      setIsSuccess(false);
      setSuccessModalOpen(true);
    }
  };

  return (
    <>
      <AdminHeader />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Typography variant="h4">商品新規登録</Typography>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={8} md={6}>
            <CustomTextField
              label="商品名"
              value={productName}
              onChange={handleProductNameChange}
              error={false}
              helperText=""
            />
            <CustomTextField
              label="金額"
              value={price}
              onChange={handlePriceChange}
              error={false}
              helperText=""
            />
            <CustomTextField
              label="説明"
              value={description}
              onChange={handleDescriptionChange}
              error={false}
              helperText=""
            />
            {error && <Typography color="error">{error}</Typography>}
            <CustomButton onClick={handleSave} label="商品新規登録" />
          </Grid>
        </Grid>
        <AddProductModal
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          isSuccess={isSuccess}
        />
      </div>
    </>
  );
};

export default AdminAddProduct;
