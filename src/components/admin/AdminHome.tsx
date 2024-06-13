import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, CardContent } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import { CustomButton, CustomTypography } from "../../features/components";
import { useProducts } from "../../lib/hooks";

const AdminHome: React.FC = () => {
  const router = useRouter();
  const { setProducts } = useContext(ProductContext);
  const { products, showMoreProducts } = useProducts();
  const auth =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;

  useEffect(() => {
    // ログインしていない場合は /admin にリダイレクト
    if (!auth) {
      router.push("/admin");
    }
  }, [auth, router]);

  // カスタムフックの中で products が更新されるたびに、ProductContext の products を更新
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      <AdminHeader />
      <div style={{ marginTop: "64px", textAlign: "center", marginBottom: 20 }}>
        <CustomTypography variant="h4" text="商品一覧" />
        <Grid container justifyContent="flex-end" style={{ marginBottom: 20 }}>
          <Grid item>
            <Link href="/adminAddProduct" passHref>
              <a style={{ textDecoration: "none" }}>
                <CustomButton label="商品新規登録" />
              </a>
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} style={{ marginBottom: 20 }}>
              <Link href={`/adminProductDetail/${product.id}`} passHref>
                <a style={{ textDecoration: "none" }}>
                  <ProductCardContainer>
                    <CardContent style={{ textAlign: "center" }}>
                      <CustomTypography variant="h6" text={product.name} />
                      <CustomTypography
                        variant="subtitle1"
                        text={`価格: ${product.price} 円`}
                      />
                      <CustomTypography
                        variant="body2"
                        text={product.content}
                      />
                    </CardContent>
                  </ProductCardContainer>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
        <CustomButton onClick={showMoreProducts} label="もっと表示" />
      </div>
    </>
  );
};

export default AdminHome;
