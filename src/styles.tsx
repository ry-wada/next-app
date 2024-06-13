/* eslint-disable react-refresh/only-export-components */
import { styled } from "@mui/system";
import { Card, Typography, Button } from "@mui/material";

export const ProductCardContainer = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const ProductImage = styled("img")({
  width: "100%",
  maxHeight: 100,
  objectFit: "cover",
});

export const BodyText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(4),
  textAlign: "center",
}));

export const ProductListHeading = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(4),
  textAlign: "left",
}));

export const ProductCard = styled(Card)({
  maxWidth: 400,
  margin: "auto",
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const addToCartButton = styled(Button)({
  margin: "20px",
  textAlign: "right",
});

export const HeaderSpace = styled("div")({
  marginTop: "64px",
  textAlign: "center",
  marginBottom: 20,
  maxHeight: "calc(100vh - 40px)",
  overflowY: "auto",
});

export const BoxContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
