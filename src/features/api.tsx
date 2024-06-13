import { Product } from "../contexts/ProductContext";
import { APIパス } from "../lib/config";

// 商品一覧を取得する関数
export const fetchProducts = async (limit: number, page: number) => {
  try {
    const response = await fetch(
      `${APIパス}/items?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// 商品詳細を取得する関数
export const fetchProductDetail = async (id: string) => {
  try {
    const response = await fetch(`${APIパス}/items/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// 商品を更新する関数
export const updateProduct = async (productData: Product, token: string) => {
  try {
    const updatedProductData = {
      name: productData.name,
      price: productData.price,
      content: productData.content,
    };

    const response = await fetch(`${APIパス}/items/${productData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProductData),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return true; // 更新成功
  } catch (error) {
    console.error("Error updating product:", error);
    return false; // 更新失敗
  }
};

// 商品を削除する関数
export const deleteProduct = async (productId: number, token: string) => {
  try {
    const response = await fetch(`${APIパス}/items/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return true; // 削除成功
  } catch (error) {
    console.error("Error deleting product:", error);
    return false; // 削除失敗
  }
};

// 商品を追加する関数
export const createProduct = async (
  name: string,
  price: number,
  content: string,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${APIパス}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`, // トークンを追加
      },
      body: JSON.stringify({
        name,
        price,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save product");
    }
  } catch (error) {
    console.error("Error saving product:", error);
    throw error;
  }
};
