import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid, CardContent, Button } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import { CustomTypography, CustomButton } from "../../features/components";
import { useProducts } from "../../lib/hooks";

const AdminHome: React.FC = () => {
  const router = useRouter();
  const { setProducts } = useContext(ProductContext);
  const { products, showMoreProducts } = useProducts();
  const auth =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;

  useEffect(() => {
    // ログインしていない場合は /login?isAdmin=true にリダイレクト
    if (!auth) {
      router.push("/login?isAdmin=true");
    }
  }, [auth, router]);

  // カスタムフックの中で products が更新されるたびに、ProductContext の products を更新
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const handleAddProduct = () => {
    router.push("/admin/addProduct");
  };

  const handleProductDetail = (productId: number) => {
    router.push(`/admin/productDetail/${productId}`);
  };

  return (
    <>
      <AdminHeader />
      <div style={{ marginTop: "64px", textAlign: "center", marginBottom: 20 }}>
        <CustomTypography variant="h4" text="商品一覧" />
        <Grid container justifyContent="flex-end" style={{ marginBottom: 20 }}>
          <Grid item>
            <CustomButton label="商品新規登録" onClick={handleAddProduct} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} style={{ marginBottom: 20 }}>
              <ProductCardContainer>
                <CardContent style={{ textAlign: "center" }}>
                  <CustomTypography variant="h6" text={product.name} />
                  <CustomTypography
                    variant="subtitle1"
                    text={`価格: ${product.price} 円`}
                  />
                  <CustomTypography variant="body2" text={product.content} />
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleProductDetail(product.id)}
                >
                  詳細を見る
                </Button>
              </ProductCardContainer>
            </Grid>
          ))}
        </Grid>
        <CustomButton onClick={showMoreProducts} label="もっと表示" />
      </div>
    </>
  );
};

export default AdminHome;
