"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount: number;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
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
