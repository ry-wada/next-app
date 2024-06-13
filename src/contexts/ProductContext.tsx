import React, { createContext, useState, ReactNode } from "react";
import { z } from "zod";

// 商品情報のスキーマ定義
const ProductSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  price: z.number(),
  content: z.string(),
});

// Productの型定義
export type Product = z.infer<typeof ProductSchema>;

// 商品情報のコンテキストの型定義
interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// 商品情報の初期値
export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {}, // 初期値は空の関数
});

// 商品情報のプロバイダーのコンポーネント
interface ProductProviderProps {
  children: ReactNode;
}

// 商品情報のプロバイダーのコンポーネント
export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  // useStateにスキーマを適用し、productsの初期値を検証
  const [products, setProducts] = useState<Product[]>(() =>
    ProductSchema.array().parse([
      // 商品情報の初期値
    ])
  );

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
