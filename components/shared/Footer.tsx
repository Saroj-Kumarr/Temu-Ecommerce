"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#EB5934] to-[#d14d2a] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">Shop</span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination for quality products at
              unbeatable prices. Shop with confidence and enjoy fast, secure
              delivery.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-[#EB5934]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-[#EB5934]" />
                <span>support@shop.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#EB5934]" />
                <span>123 Shopping St, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Mobile: Customer Service & Quick Links in one row */}
          {/* Desktop: Customer Service Section */}
          <div className="space-y-4 lg:block hidden">
            <h3 className="font-semibold text-lg text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Return and Refund Policy", href: "/returns" },
                { name: "Shipping Information", href: "/shipping" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "Track Your Order", href: "/track-order" },
                { name: "Customer Support", href: "/support" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#EB5934] text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: Quick Links Section */}
          <div className="space-y-4 lg:block hidden">
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Careers", href: "/careers" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Sitemap", href: "/sitemap" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#EB5934] text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: Combined Customer Service & Quick Links Row */}
          <div className="lg:hidden col-span-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Customer Service - Mobile */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base text-white">
                  Customer Service
                </h3>
                <ul className="space-y-2">
                  {[
                    { name: "Returns", href: "/returns" },
                    { name: "Shipping", href: "/shipping" },
                    { name: "Size Guide", href: "/size-guide" },
                    { name: "Track Order", href: "/track-order" },
                    { name: "Support", href: "/support" },
                    { name: "FAQ", href: "/faq" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-[#EB5934] text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links - Mobile */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base text-white">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {[
                    { name: "About Us", href: "/about" },
                    { name: "Contact", href: "/contact" },
                    { name: "Careers", href: "/careers" },
                    { name: "Privacy", href: "/privacy" },
                    { name: "Terms", href: "/terms" },
                    { name: "Sitemap", href: "/sitemap" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-[#EB5934] text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter & Social Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Stay Connected</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>

            {/* Newsletter Signup */}
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#1E1E1E]/20 border-gray-200 text-white placeholder-gray-400 focus:border-[#EB5934] focus:ring-[#EB5934]"
              />
              <Button className="bg-[#EB5934] hover:bg-[#d14d2a] px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-medium text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://facebook.com",
                    name: "Facebook",
                  },
                  {
                    icon: Twitter,
                    href: "https://twitter.com",
                    name: "Twitter",
                  },
                  {
                    icon: Instagram,
                    href: "https://instagram.com",
                    name: "Instagram",
                  },
                  {
                    icon: Youtube,
                    href: "https://youtube.com",
                    name: "YouTube",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#EB5934] transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* App Download Links */}
            <div className="space-y-2">
              <h4 className="font-medium text-white">Download Our App</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <div className="w-6 h-6 bg-white rounded text-black text-xs flex items-center justify-center font-bold">
                    A
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Download on the</div>
                    <div className="text-white font-semibold">App Store</div>
                  </div>
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    P
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Get it on</div>
                    <div className="text-white font-semibold">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Security */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Payment Methods */}
            <div>
              <h4 className="font-medium text-white mb-3">We Accept</h4>
              <div className="flex gap-2 flex-wrap">
                {[
                  { name: "Visa", color: "bg-blue-600" },
                  { name: "MC", color: "bg-red-600" },
                  { name: "AMEX", color: "bg-blue-400" },
                  { name: "PP", color: "bg-blue-500" },
                  { name: "GPay", color: "bg-green-600" },
                  { name: "APay", color: "bg-black" },
                ].map((payment) => (
                  <div
                    key={payment.name}
                    className={`w-12 h-8 ${payment.color} rounded text-white text-xs flex items-center justify-center font-bold`}
                  >
                    {payment.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badges */}
            <div className="lg:text-right">
              <h4 className="font-medium text-white mb-3">Security & Trust</h4>
              <div className="flex lg:justify-end gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SSL</span>
                  </div>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">256</span>
                  </div>
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2024 Shop. All rights reserved. Made with ❤️ for shopping lovers.
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-[#EB5934] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#EB5934] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-[#EB5934] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
