"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, ArrowLeft, Trash2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/constants/products";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, getWishlistCount } =
    useWishlist();
  const { addToCart } = useCart();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCartAndRemove = (product: Product) => {
    addToCart(product);
    if (typeof product.id === "number") {
      removeFromWishlist(product.id);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your wishlist yet.
          </p>
          <Link href="/">
            <Button className="bg-[#EB5934] hover:bg-[#d14d2a] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {getWishlistCount()} item{getWishlistCount() !== 1 ? "s" : ""} saved
            for later
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={clearWishlist}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <Card
            key={item.id}
            className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-pink-500/30"
          >
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name || "Product Image"}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Discount Badge */}
                {typeof item.discount === "number" && item.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-[#EB5934] text-white">
                    -{item.discount}%
                  </Badge>
                )}

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => {
                    if (typeof item.id === "number") {
                      removeFromWishlist(item.id);
                    }
                  }}
                >
                  <Heart className="w-4 h-4 text-pink-500 fill-current" />
                </Button>

                {/* Category */}
                <Badge
                  variant="secondary"
                  className="absolute bottom-2 left-2 bg-white/90 text-gray-700"
                >
                  {item.category}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(item.rating ?? 0)}</div>
                  <span className="text-sm text-gray-500">
                    ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-[#EB5934]">
                    ${item.price}
                  </span>
                  {typeof item.originalPrice === "number" &&
                    typeof item.price === "number" &&
                    item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-[#EB5934] hover:bg-[#d14d2a] text-white"
                    onClick={() => handleAddToCartAndRemove(item)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      if (typeof item.id === "number") {
                        removeFromWishlist(item.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
