"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/constants/products";
import Link from "next/link";

export default function ProductsPage() {
  const { addToCart, removeFromCart, updateQuantity, cart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail page
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail page
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuantityChange = (
    product: any,
    newQuantity: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (newQuantity <= 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  // Get cart item for a specific product
  const getCartItem = (productId: number) => {
    return cart.find((item) => item.id === productId);
  };

  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of quality products at amazing
          prices
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const cartItem = getCartItem(product.id);
          const isInCart = !!cartItem;
          const quantity = cartItem?.quantity || 0;

          return (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#EB5934]/30 cursor-pointer">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-[#EB5934] text-white">
                        -{product.discount}%
                      </Badge>
                    )}

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => handleWishlistToggle(product, e)}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isInWishlist(product.id)
                            ? "text-pink-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>

                    {/* Category */}
                    <Badge
                      variant="secondary"
                      className="absolute bottom-2 left-2 bg-white/90 text-gray-700"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-[#EB5934]">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  {!isInCart ? (
                    /* Add to Cart Button - When item is not in cart */
                    <Button
                      className="w-full bg-[#EB5934] hover:bg-[#d14d2a] text-white"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    /* Quantity Controls - When item is in cart */
                    <div className="flex items-center gap-3 justify-center w-full">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#EB5934] text-[#EB5934] hover:bg-[#EB5934] hover:text-white"
                        onClick={(e) =>
                          handleQuantityChange(product, quantity - 1, e)
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <div className="text-center">
                        <span className="text-sm font-medium text-gray-600">
                          Qty:
                        </span>
                        <span className="text-lg font-bold text-[#EB5934] ml-1">
                          {quantity}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#EB5934] text-[#EB5934] hover:bg-[#EB5934] hover:text-white"
                        onClick={(e) =>
                          handleQuantityChange(product, quantity + 1, e)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
