"use client";

import { Product } from "@/constants/products";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistCount: () => number;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.find((item) => item.id === product.id);

        if (!exists) {
          set({
            wishlist: [...wishlist, product],
          });
        }
      },

      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      getWishlistCount: () => {
        return get().wishlist.length;
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
