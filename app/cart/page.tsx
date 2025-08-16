"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-0items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your
            cart
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
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="border border-gray-200">
              <CardContent className="px-3 md:px-6 md:py-1">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Badge variant="secondary" className="mb-3">
                      {item.category}
                    </Badge>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>

                        <span className="font-medium text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#EB5934]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.price} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 max-w-96">
          <Card className="border border-gray-200 sticky top-32">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#EB5934]">
                  ${(getTotalPrice() * 1.08).toFixed(2)}
                </span>
              </div>

              <Button
                className="w-full bg-[#EB5934] hover:bg-[#d14d2a] text-white py-5 text-base font-medium mt-6"
                asChild
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Security Features */}
              <div className="space-y-2 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
