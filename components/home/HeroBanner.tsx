"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SimpleBanner() {
  const backgroundOptions = {
    shopping:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    fashion:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    electronics:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    lifestyle:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  };

  return (
    <section className="relative py-12 lg:py-14 overflow-hidden">
      {/* Beautiful Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-700 hover:scale-110"
        style={{
          backgroundImage: `url('${backgroundOptions.shopping}')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EB5934]/80 via-black/50 to-black/70" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              <span className="text-white">Summer Sale</span>
              <br />
              <span className="text-yellow-300">Up to 50% Off</span>
            </h1>

            <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-md">
              Discover amazing products at unbeatable prices. Limited time
              offer.
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <Button
              size="lg"
              className="bg-white text-[#EB5934] hover:bg-gray-100 px-6 py-5 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
              asChild
            >
              <Link href="/">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Simple Features with Orange Color */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-white pt-3">
            <span className="bg-[#EB5934]/90 text-sm backdrop-blur-sm px-3 py-1.5 rounded-full font-medium shadow-lg">
              ✓ Free Shipping
            </span>
            <span className="bg-[#EB5934]/90 text-sm backdrop-blur-sm px-3 py-1.5 rounded-full font-medium shadow-lg">
              ✓ Easy Returns
            </span>
            <span className="bg-[#EB5934]/90 text-sm backdrop-blur-sm px-3 py-1.5 rounded-full font-medium shadow-lg">
              ✓ Secure Payment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
