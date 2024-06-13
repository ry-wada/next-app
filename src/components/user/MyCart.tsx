import React, { useContext } from "react";
import { Container, Card, CardContent, Grid } from "@mui/material";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { CartContext } from "../../contexts/CartContext";
import { BodyText, HeaderSpace, ProductImage } from "../../styles";
import { IMAGEパス } from "../../lib/config";
import { CustomButton, CustomTypography } from "../../features/components";

const MyCart: React.FC = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // カート内アイテムの合計金額を計算する関数
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Container style={{ marginBottom: "120px" }}>
        <BodyText>カート一覧</BodyText>
        {cartItems.length === 0 ? (
          <CustomTypography variant="h5" text="カートに商品がありません。" />
        ) : (
          <>
            <Grid container justifyContent="flex-end">
              <CustomTypography
                variant="h6"
                text={`合計金額: ${calculateTotalPrice()}円`}
              />
            </Grid>
            {cartItems.map((item, index) => (
              <Card key={index} style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <ProductImage
                        src={`${IMAGEパス}${item.id}.jpg`}
                        alt={item.name}
                      />
                      <CustomTypography variant="h5" text={item.name} />
                      <CustomTypography
                        variant="body1"
                        text={`金額: ${item.price}円`}
                      />
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-end">
                      <CustomButton
                        onClick={() => removeFromCart(item.id)}
                        label="削除する"
                        color="error"
                      ></CustomButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Container>
      <UserFooter />
    </>
  );
};

export default MyCart;
