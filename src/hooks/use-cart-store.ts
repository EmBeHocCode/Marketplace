"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  type: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  setCouponCode: (value: string) => void;
  clearCart: () => void;
}

const starterCart: CartItem[] = [
  {
    productId: "prod-vps-basic",
    name: "VPS Basic",
    slug: "vps-basic",
    price: 189000,
    quantity: 1,
    type: "VPS"
  },
  {
    productId: "prod-steam-wallet",
    name: "Steam Wallet 200K",
    slug: "steam-wallet-200k",
    price: 200000,
    quantity: 1,
    type: "GIFTCARD"
  }
];

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: starterCart,
      couponCode: "MEOW10",
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (cartItem) => cartItem.productId === item.productId
          );

          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.productId === item.productId
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              )
            };
          }

          return { items: [...state.items, item] };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        })),
      setCouponCode: (couponCode) => set({ couponCode }),
      clearCart: () => set({ items: [], couponCode: "" })
    }),
    {
      name: "meowmarket-cart"
    }
  )
);
