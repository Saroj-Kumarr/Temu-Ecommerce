"use client";

import { useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  X,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/constants/header";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import SignOutModal from "../header/SignOut";

export default function Header() {
  const { cart, getTotalItems } = useCart();
  const { wishlist, getWishlistCount } = useWishlist();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();

  const handleSignOut = () => {
    // Clear user session/token
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    // Redirect to home page
    window.location.href = "/";

    console.log("User signed out successfully");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        {/* Top Section */}
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-1 h-8 w-8"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    S
                  </span>
                </div>
                <span className="hidden sm:block font-bold text-lg sm:text-xl text-gray-900">
                  Shop
                </span>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10 pr-4 h-11 bg-gray-50 border-[2px] border-[#EB5934] focus:bg-white focus:border-[#EB5934] focus:ring-2 focus:ring-[#EB5934]/20 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:gap-3 md:gap-5">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-1 h-8 w-8"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>
              {/* Desktop Wishlist Button */}
              <Link href="/wishlist" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-9 md:h-10 px-2 md:px-4 bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all duration-200 rounded-lg relative"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden md:block font-medium text-sm">
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <Badge className="bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              {/* Mobile Wishlist Icon */}
              <Link href="/wishlist" className="sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1 h-8 w-8 relative"
                >
                  <Heart className="h-4 w-4" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 py-0 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              {/* Desktop Cart Button */}
              <Link href="/cart" className="hidden sm:block">
                <Button className="flex items-center gap-2 h-9 md:h-10 px-2 md:px-4 bg-[#EB5934] hover:bg-[#d14d2a] text-white font-medium text-sm transition-all duration-200 rounded-lg relative shadow-sm hover:shadow-md">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden md:block">View Cart</span>
                  <span className="md:hidden">Cart</span>
                  {totalItems > 0 && (
                    <Badge className="bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded-full font-semibold">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              {/* Mobile Cart Icon */}
              <Link href="/cart" className="sm:hidden">
                <Button
                  size="icon"
                  className="p-1 h-8 w-8 bg-[#EB5934] hover:bg-[#d14d2a] relative"
                >
                  <ShoppingCart className="h-4 w-4 text-white" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 py-0 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="border border-[#EB5934] p-1 h-8 w-8 sm:h-10 sm:w-10"
                    variant="ghost"
                    size="icon"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 w-full"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 w-full"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 w-full"
                    >
                      <User className="w-4 h-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem
                    onClick={() => setShowSignOutModal(true)}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem> */}
                  <DropdownMenuItem className="flex items-center font-medium gap-2 justify-center text-[#EB5934]">
                    <Link
                      className="flex items-center gap-2 text-[#EB5934]"
                      href="https://temu-admin-app.vercel.app/vendor-signup"
                    >
                      <User2 className="text-[#EB5934]" /> Sign Up
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Search Bar (Collapsible) */}
          {isMobileSearchOpen && (
            <div className="pb-3 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-4 h-10 bg-gray-50 border-[2px] border-[#EB5934] focus:bg-white focus:border-[#EB5934] focus:ring-2 focus:ring-[#EB5934]/20 focus:outline-none transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation Categories (unchanged) */}
        <div className="hidden lg:block border-t bg-gradient-to-r from-gray-50 to-orange-50/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1">
                {categories.map((category) => (
                  <DropdownMenu key={category.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-12 px-4 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-white/70 transition-all duration-200 data-[state=open]:bg-white/70 data-[state=open]:text-orange-600"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                          <span>{category.name}</span>
                          <ChevronDown className="h-3 w-3" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2">
                      <DropdownMenuLabel className="px-2 py-1.5">
                        <Link
                          href={category.href}
                          className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-orange-600"
                        >
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={36}
                            height={36}
                            className="rounded-full object-cover"
                          />
                          View All {category.name}
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {category.subcategories.map((sub) => (
                        <DropdownMenuItem key={sub.name} className="p-0">
                          <Link
                            href={sub.href}
                            className="flex items-center gap-2 w-full px-2 py-2 text-sm hover:text-orange-600"
                          >
                            <Image
                              src={sub.image}
                              alt={sub.name}
                              width={36}
                              height={36}
                              className="rounded-full object-cover"
                            />
                            <span>{sub.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Fixed Position */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        >
          <div className="fixed top-[56px] sm:top-[64px] left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
            <div className="max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)] overflow-y-auto">
              <div className="p-4 space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <Link
                      href={category.href}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    </Link>
                    {/* Mobile subcategories */}
                    <div className="ml-6 space-y-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                          onClick={closeMobileMenu}
                        >
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onSignOut={handleSignOut}
        userName="John Doe" // Replace with actual user name from your auth state
      />
    </>
  );
}
