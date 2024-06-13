import React, { createContext, useState, ReactNode, useEffect } from "react";

// カートの商品の型定義
export interface CartItem {
  id: number;
  name: string;
  price: number;
}

// カートのコンテキストの型定義
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const initialCartState: CartItem[] = [];

// カートのコンテキストを作成
export const CartContext = createContext<CartContextType>({
  cartItems: initialCartState,
  addToCart: () => {},
  removeFromCart: () => {},
});

// カートプロバイダーのコンポーネント
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartState);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const saveCartItemsToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  // カートに商品を追加する関数
  const addToCart = (item: CartItem) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    saveCartItemsToLocalStorage(newCartItems);
  };

  // カートから商品を削除する関数
  const removeFromCart = (id: number) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
      saveCartItemsToLocalStorage(newCartItems); // ローカルストレージに保存
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
