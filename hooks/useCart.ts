"use client";

import { Product } from "@/constants/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + (item.price ?? 0) * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
