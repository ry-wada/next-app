import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { Grid, CardContent, Container } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import {
  ProductListHeading,
  ProductCardContainer,
  HeaderSpace,
  BodyText,
  ProductImage,
} from "../../styles";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { IMAGEパス } from "../../lib/config";
import { CustomButton, CustomTypography } from "../../features/components";
import { useProducts } from "../../lib/hooks";

const UserHome: React.FC = () => {
  const { setProducts } = useContext(ProductContext);
  const { products, showMoreProducts } = useProducts();

  // カスタムフックの中で products が更新されるたびに、ProductContext の products を更新
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Container style={{ marginBottom: "120px" }}>
        <BodyText variant="h4">LH-EC-SHOPへようこそ！！</BodyText>
        <ProductListHeading variant="body1">商品一覧</ProductListHeading>
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link
                href={`user/productDetail/${product.id}`}
                passHref
                style={{ textDecoration: "none" }}
              >
                <ProductCardContainer>
                  <ProductImage
                    src={`${IMAGEパス}${product.id}.jpg`}
                    alt={product.name}
                  />
                  <CardContent style={{ textAlign: "center" }}>
                    <CustomTypography
                      variant="h6"
                      text={product.name}
                    ></CustomTypography>
                    <CustomTypography
                      variant="subtitle1"
                      text={`価格: ${product.price} 円`}
                    ></CustomTypography>
                  </CardContent>
                </ProductCardContainer>
              </Link>
            </Grid>
          ))}
        </Grid>
        <CustomButton onClick={showMoreProducts} label="もっと表示" />
      </Container>
      <UserFooter />
    </>
  );
};

export default UserHome;
