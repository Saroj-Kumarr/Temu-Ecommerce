"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Truck,
  Shield,
  CheckCircle,
  User,
  MapPin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import CheckoutLoginModal from "@/components/checkout/CheckoutLogin";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Simple boolean for login state

  const handleLoginSuccess = () => {
    setIsLogin(true); // Set to true when user logs in
    setShowLoginModal(false);
  };

  const handleCompleteOrder = () => {
    if (!isLogin) {
      // Show login modal if not logged in
      setShowLoginModal(true);
      return;
    }

    // If logged in, proceed with payment
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push("/order-success");
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleCompleteOrder();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            No items to checkout
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Your cart is empty. Add some items before proceeding to checkout.
          </p>
          <Link href="/products">
            <Button className="bg-[#EB5934] hover:bg-[#d14d2a] text-white px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Link href="/cart">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-gray-50 h-9 w-9 sm:h-10 sm:w-10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Checkout
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Complete your order
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Checkout Form - Takes 2 columns on desktop */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Shipping Information */}
                <Card className="shadow-sm border-0 ring-1 ring-gray-200">
                  <CardHeader className="bg-gray-50/50 rounded-t-lg p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#EB5934]" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium text-gray-700"
                        >
                          First Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="firstName"
                            required
                            className="pl-10 mt-1 h-10 sm:h-11 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Last Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="lastName"
                            required
                            className="pl-10 mt-1 h-10 sm:h-11 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          required
                          className="pl-10 mt-1 h-10 sm:h-11 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="address"
                        className="text-sm font-medium text-gray-700"
                      >
                        Street Address *
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="address"
                          required
                          className="pl-10 mt-1 h-10 sm:h-11 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                          placeholder="123 Main Street"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="city"
                          className="text-sm font-medium text-gray-700"
                        >
                          City *
                        </Label>
                        <Input
                          id="city"
                          required
                          className="mt-1 h-10 sm:h-11 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="zipCode"
                          className="text-sm font-medium text-gray-700"
                        >
                          ZIP Code *
                        </Label>
                        <Input
                          id="zipCode"
                          required
                          className="mt-1 h-10 sm:h-11 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Order Summary - Responsive width */}
              <div className="w-full lg:w-96">
                <Card className="lg:sticky lg:top-4">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start text-sm"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="font-medium truncate">
                              {item.name}
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm">
                              Qty: {item.quantity}
                            </div>
                          </div>
                          <div className="font-medium text-sm whitespace-nowrap">
                            ${((item.price ?? 0) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Pricing Breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Total</span>
                      <span className="text-[#EB5934]">
                        ${(getTotalPrice() * 1.08).toFixed(2)}
                      </span>
                    </div>

                    {/* Checkout Button */}
                    <Button
                      type="button"
                      onClick={handleCompleteOrder}
                      className="w-full bg-[#EB5934] hover:bg-[#d14d2a] text-white py-4 sm:py-5 text-sm sm:text-base font-medium mt-4 sm:mt-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Complete Order
                        </>
                      )}
                    </Button>

                    {/* Security Info */}
                    <div className="text-xs text-gray-500 text-center pt-2">
                      <Lock className="w-3 h-3 inline mr-1" />
                      Your payment information is secure and encrypted
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>

          {/* Mobile: Order Summary Fixed Bottom on Small Screens */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold">
                Total: ${(getTotalPrice() * 1.08).toFixed(2)}
              </span>
              <Button
                type="button"
                onClick={handleCompleteOrder}
                className="bg-[#EB5934] hover:bg-[#d14d2a] text-white px-6 py-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Order
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Add bottom padding to prevent content being hidden behind fixed button */}
          <div className="lg:hidden h-20"></div>
        </div>
      </div>

      {/* Login Modal */}
      <CheckoutLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
