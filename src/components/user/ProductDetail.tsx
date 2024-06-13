import React, { useContext } from "react";
import { CardContent, Grid } from "@mui/material";
import { HeaderSpace, ProductCardContainer, ProductImage } from "../../styles";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { CartContext } from "../../contexts/CartContext";
import { IMAGEパス } from "../../lib/config";
import { CustomButton, CustomTypography } from "../../features/components";
import { useProductDetail } from "../../lib/hooks";

interface AdminProductDetailProps {
  id: string;
}

const ProductDetail: React.FC<AdminProductDetailProps> = ({ id }) => {
  const product = useProductDetail(id); // カスタムフックを利用して商品詳細を取得
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return (
      <>
        <UserHeader />
        <CustomTypography
          variant="h6"
          text="商品が見つかりませんでした。"
        ></CustomTypography>
        <UserFooter />
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProductCardContainer style={{ margin: "20px" }}>
            <CardContent style={{ textAlign: "center" }}>
              <ProductImage
                src={`${IMAGEパス}${product.id}.jpg`}
                alt={product.name}
              />
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
            <CustomButton
              onClick={() => addToCart(product)}
              label="カートに追加"
            ></CustomButton>
          </div>
        </Grid>
      </Grid>
      <UserFooter />
    </>
  );
};

export default ProductDetail;
