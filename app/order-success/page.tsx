"use client";

import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Home,
  ShoppingBag,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute -top-32 -left-32 w-96 h-96 text-orange-200/30"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M60.4,-54.2C75.1,-41.9,82.6,-20.9,80.9,-1.1C79.2,18.7,68.3,37.5,53.6,50.8C38.9,64.2,19.4,72.1,1.2,70.9C-17,69.7,-34,59.4,-48.1,46C-62.2,32.6,-73.4,16.3,-74.6,-1.1C-75.8,-18.5,-67,-37,-54.1,-49.3C-41.2,-61.6,-20.6,-67.7,0.2,-67.9C21,-68.1,42,-62.4,60.4,-54.2Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute -bottom-20 -right-20 w-80 h-80 text-red-200/20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M41.3,-54.2C54.2,-44.8,65.7,-33.4,70.8,-19.6C75.9,-5.8,74.6,10.4,68.9,24.2C63.2,38,53.1,49.4,41.1,58.4C29.1,67.4,15.2,74,0.1,73.9C-15,73.8,-30,66.9,-42.5,57.6C-55,48.3,-65,36.6,-69.4,22.9C-73.8,9.2,-72.6,-6.5,-67.7,-20.3C-62.8,-34.1,-54.2,-46,-42.2,-55.4C-30.2,-64.8,-15.1,-71.7,0.5,-72.3C16.1,-72.9,32.2,-67.2,41.3,-54.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl">
          {/* Success Animation */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-medium text-gray-800 mb-6 leading-tight">
            Thank you!
          </h1>

          <p className="text-xl text-gray-600 mb-4 font-light">
            Your order has been placed successfully
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-500 mb-12">
            <span className="text-sm">Order #OD-2025-8734</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-sm">Expected delivery in 2-3 days</span>
          </div>

          {/* Floating Action Buttons */}
          <div className="space-y-6 mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="group bg-[#EB5934] hover:bg-[#d14d2a] text-white px-8 py-4 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                asChild
              >
                <Link href="/" className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  <span>Back to Home</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="group text-[#EB5934] hover:text-[#d14d2a] px-8 py-4 rounded-md text-lg font-medium hover:bg-orange-50 transition-all duration-300"
                asChild
              >
                <Link href="/products" className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span className="text-sm">
                We&apos;ll send you an email confirmation shortly
              </span>
            </div>

            <p className="text-xs text-gray-400">
              Need help? Contact our support team anytime
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 text-orange-100/50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}
