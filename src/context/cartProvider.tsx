"use client";
import {useState, createContext} from 'react';
import ProductInterface from '@/utils/productInterface';

type CartContextType = {
  cartItems: ProductInterface[];
  addToCart: (item: ProductInterface) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
})
 
export default function CartProvider({children,}: {children: React.ReactNode}) {

  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);

  const addToCart = (product: ProductInterface) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      return removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => 
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity}}>
      {children}
    </CartContext.Provider>
  )
}