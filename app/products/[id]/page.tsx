"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/constants/products";
import { notFound } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const { addToCart, removeFromCart, updateQuantity, cart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Get ID from useParams
  const productId = params.id as string;

  // Find the product from your array
  const product = products.find((p) => p.id === parseInt(productId));

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  // Set default selections using useEffect
  useEffect(() => {
    if (product?.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedColor, selectedSize]);

  // Create multiple images from the single image
  const images = Array(6).fill(product.image);

  // Check if product is already in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isInCart = !!cartItem;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleCartQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      if (typeof product.id === "number") {
        removeFromCart(product.id);
      }
    } else {
      if (typeof product.id === "number") {
        updateQuantity(product.id, newQuantity);
      }
    }
  };

  const handleWishlistToggle = () => {
    if (typeof product.id === "number" && isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center mb-6">
          <Link href="/">
            <Button variant="outline" className="gap-2 h-9 text-sm">
              <ArrowLeft className="w-3 h-3" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
            <Link href="/" className="hover:text-[#EB5934] whitespace-nowrap">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-[#EB5934] whitespace-nowrap"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              {/* Thumbnail Images - Horizontal on Mobile, Vertical on Desktop */}
              <div className="flex sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index
                        ? "border-[#EB5934] ring-2 ring-[#EB5934]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image - Responsive Size */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg order-1 sm:order-2 max-w-md sm:max-w-none mx-auto">
                <Image
                  src={images[selectedImage]}
                  alt={product.name + " main view"}
                  fill
                  className="object-cover"
                  priority
                />
                {typeof product.discount === "number" &&
                  product.discount > 0 && (
                    <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#EB5934] text-white px-2 sm:px-3 py-1 text-xs">
                      -{product.discount}% OFF
                    </Badge>
                  )}

                {/* Cart Quantity Badge */}
                {isInCart && (
                  <Badge className="absolute top-3 sm:top-4 right-12 sm:right-16 bg-green-500 text-white text-xs">
                    {cartQuantity} in cart
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/80 hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
                  onClick={handleWishlistToggle}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      typeof product.id === "number" && isInWishlist(product.id)
                        ? "text-pink-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Product Title & Rating */}
            <div>
              <Badge variant="secondary" className="mb-2 text-xs">
                {product.category}
              </Badge>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  by {product.brand}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating ?? 0)}
                    <span className="ml-1 sm:ml-2 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <Badge
                  variant={product.inStock ? "default" : "destructive"}
                  className={`w-fit text-xs ${
                    product.inStock ? "bg-green-100 text-green-700" : ""
                  }`}
                >
                  {product.inStock
                    ? `${product.stockCount || "In"} stock`
                    : "Out of stock"}
                </Badge>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#EB5934]">
                ${product.price}
              </span>
              {typeof product.originalPrice === "number" &&
                typeof product.price === "number" &&
                product.originalPrice > product.price && (
                  <span className="text-base sm:text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              {typeof product.discount === "number" && product.discount > 0 && (
                <Badge className="bg-red-100 text-red-700 px-2 py-1 text-xs w-fit">
                  Save{" "}
                  {typeof product.originalPrice === "number" &&
                  typeof product.price === "number"
                    ? (product.originalPrice - product.price).toFixed(2)
                    : ""}
                </Badge>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                  Color: {selectedColor}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-[#EB5934] bg-[#EB5934] text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                  Size: {selectedSize}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-[#EB5934] bg-[#EB5934] text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              {/* Only show quantity selector if item is NOT in cart */}
              {!isInCart && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-l-lg rounded-r-none"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <span className="w-12 sm:w-16 text-center font-medium text-sm sm:text-base">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-r-lg rounded-l-none"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Max 10 items
                    </span>
                  </div>
                </div>
              )}

              {/* Cart Status & Controls */}
              {isInCart && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium text-sm sm:text-base">
                        Added to Cart
                      </span>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      {cartQuantity} in cart
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-green-700">
                      Adjust quantity:
                    </span>
                    <div className="flex items-center border border-green-300 rounded-lg bg-white">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleCartQuantityChange(cartQuantity - 1)
                        }
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-l-lg rounded-r-none hover:bg-green-50"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </Button>
                      <span className="w-10 sm:w-12 text-center font-medium text-sm text-green-800">
                        {cartQuantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleCartQuantityChange(cartQuantity + 1)
                        }
                        disabled={cartQuantity >= 10}
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-r-lg rounded-l-none hover:bg-green-50"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3">
                {!isInCart ? (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-[#EB5934] hover:bg-[#d14d2a] text-white py-2 sm:py-3 text-sm sm:text-lg font-semibold"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                ) : (
                  <Link href="/cart" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 text-sm sm:text-lg font-semibold">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">
                        View Cart ({cartQuantity})
                      </span>
                      <span className="sm:hidden">Cart ({cartQuantity})</span>
                    </Button>
                  </Link>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className="p-2 sm:p-3 h-auto"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      typeof product.id === "number" && isInWishlist(product.id)
                        ? "text-pink-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="p-2 sm:p-3 h-auto"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8 sm:mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-9 sm:h-12">
              <TabsTrigger value="description" className="text-xs sm:text-sm">
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="text-xs sm:text-sm"
              >
                Specifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4 sm:mt-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Product Description
                  </h3>
                  <div className="prose max-w-none text-gray-600">
                    <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                      {product.description}
                    </p>
                    {product.features && product.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                          Key Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-4 sm:mt-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Technical Specifications
                  </h3>
                  {product.specifications &&
                  Object.keys(product.specifications).length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 gap-1"
                          >
                            <span className="font-medium text-gray-600 text-sm sm:text-base">
                              {key}
                            </span>
                            <span className="text-gray-900 text-sm sm:text-base">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm sm:text-base">
                      No specifications available for this product.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
