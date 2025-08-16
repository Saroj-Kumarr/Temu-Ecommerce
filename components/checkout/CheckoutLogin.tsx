"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Mail, Lock, User, Phone, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
};

interface CheckoutLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: UserType) => void;
}

export default function CheckoutLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: CheckoutLoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: "John Doe",
        email: formData.email || `user@${formData.phone}.com`,
        phone: formData.phone,
        isLoggedIn: true,
      };

      onLoginSuccess(userData);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md w-[95vw] sm:w-full mx-auto p-0 gap-0 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-0"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#EB5934] to-[#d14d2a] p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <DialogHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                Login to Continue
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <DialogDescription className="text-orange-100 text-sm sm:text-base">
              Please sign in to complete your checkout securely
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <Tabs
            value={loginMethod}
            onValueChange={(value) =>
              setLoginMethod(value as "email" | "phone")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5 mt-4 sm:mt-6"
            >
              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required={loginMethod === "email"}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-10 sm:h-12 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934] rounded-lg"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required={loginMethod === "phone"}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 h-10 sm:h-12 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934] rounded-lg"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-10 sm:h-12 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934] rounded-lg"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Link href="/order-success">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 sm:mt-6 bg-[#EB5934] hover:bg-[#d14d2a] text-white py-4 sm:py-6 text-sm sm:text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Continue to Checkout"
                  )}
                </Button>
              </Link>
            </form>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
