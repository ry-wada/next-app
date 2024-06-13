// pages/_app.tsx
import { AppProps } from "next/app";
import { ProductProvider } from "../src/contexts/ProductContext";
import { AuthProvider } from "../src/contexts/AuthContext";
import { CartProvider } from "../src/contexts/CartContext";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default MyApp;
