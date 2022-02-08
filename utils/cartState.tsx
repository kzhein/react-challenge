import { createContext, useState } from 'react';
import { CartItem } from '../types';

export const CartStateContext = createContext<{
  cart: {
    cartItems: CartItem[];
    totalPrice: number;
  };
  addToCart: any;
  removeFromCart: any;
  clearCart: any;
  changeCartItemCount: any;
}>({
  cart: {
    cartItems: [],
    totalPrice: 0,
  },
  addToCart: null,
  removeFromCart: null,
  clearCart: null,
  changeCartItemCount: null,
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
        Math.round(
          (prevCart.totalPrice -
            itemToRemove!.card.cardmarket.prices.averageSellPrice *
              itemToRemove!.quantity) *
            100
        ) / 100,
    }));
  };

  const changeCartItemCount = (item: any, value: number) => {
    const itemToChange = cart.cartItems.find(it => it.card.id === item.card.id);

    setCart(prevCart => ({
      cartItems: prevCart.cartItems.map(it =>
        it.card.id === itemToChange!.card.id
          ? { ...it, quantity: it.quantity + value }
          : it
      ),
      totalPrice:
        Math.round(
          (value > 0
            ? prevCart.totalPrice +
              itemToChange!.card.cardmarket.prices.averageSellPrice
            : prevCart.totalPrice -
              itemToChange!.card.cardmarket.prices.averageSellPrice) * 100
        ) / 100,
    }));
  };

  const clearCart = () => {
    setCart({
      cartItems: [],
      totalPrice: 0,
    });
  };

  return (
    <CartStateContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        changeCartItemCount,
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
}
