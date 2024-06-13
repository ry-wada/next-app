// react機能を使用した共通利用できる関数

import { useEffect, useState } from "react";
import { Product } from "../contexts/ProductContext";
import { fetchProductDetail, fetchProducts } from "../features/api";
import { 初期表示数, 追加表示数 } from "./constants";

// 商品一覧を取得するカスタムフック
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const initialProducts = await fetchProducts(初期表示数, 1);
        setProducts(initialProducts);
      } catch (error) {
        console.error("Error loading initial products:", error);
      }
    };
    loadInitialProducts();
  }, []);

  const showMoreProducts = async () => {
    try {
      const nextPage = page + 1;
      const moreProducts = await fetchProducts(追加表示数, nextPage);
      setProducts((prevProducts) => [...prevProducts, ...moreProducts]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  return { products, showMoreProducts };
};

// 商品詳細を取得するカスタムフック
export const useProductDetail = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const productDetail = await fetchProductDetail(id);
        setProduct(productDetail);
      } catch (error) {
        console.error("Error loading product detail:", error);
      }
    };
    loadProductDetail();
  }, [id]);

  return product;
};
