import { createContext, useState } from 'react';
import { CartItem } from '../types';

export const CartStateContext = createContext<{
  cart: {
    cartItems: CartItem[];
    totalPrice: number;
  };
  addToCart: any;
  removeFromCart: any;
}>({
  cart: {
    cartItems: [],
    totalPrice: 0,
  },
  addToCart: null,
  removeFromCart: null,
});

export function CartStateProvider({ children }: { children: any }) {
  const [cart, setCart] = useState<{
    cartItems: CartItem[];
    totalPrice: number;
  }>({
    cartItems: [],
    totalPrice: 0,
  });

  const addToCart = (item: any) => {
    setCart(prevCart => ({
      cartItems: [...prevCart.cartItems, { card: item, quantity: 1 }],
      totalPrice:
        Math.round(
          (prevCart.totalPrice + item.cardmarket.prices.averageSellPrice) * 100
        ) / 100,
    }));
  };

  const removeFromCart = (item: any) => {
    const itemToRemove = cart.cartItems.find(it => it.card.id === item.id);

    setCart(prevCart => ({
      cartItems: prevCart.cartItems.filter(it => it.card.id !== item.id),
      totalPrice:
        prevCart.totalPrice -
        itemToRemove!.card.cardmarket.prices.averageSellPrice *
          itemToRemove!.quantity,
    }));
  };

  const changeCount = () => {};

  const clearCart = () => {};

  return (
    <CartStateContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartStateContext.Provider>
  );
}
