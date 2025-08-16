"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut, User, X } from "lucide-react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  userName?: string;
}

export default function SignOutModal({
  isOpen,
  onClose,
  onSignOut,
  userName = "John Doe",
}: SignOutModalProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    // Simulate sign out process
    setTimeout(() => {
      onSignOut();
      setIsSigningOut(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md w-[95vw] sm:w-full mx-auto p-0 gap-0 bg-white border border-gray-200 rounded-lg sm:rounded-md"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#EB5934] to-[#d14d2a] p-4 sm:p-6 rounded-t-lg sm:rounded-t-md">
          <DialogHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <LogOut className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                Sign Out
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
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#EB5934] to-[#d14d2a] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
              {userName
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                {userName}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Currently signed in
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-yellow-800 text-xs font-bold">!</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1 text-yellow-800">
                  You will be signed out
                </p>
                <p className="text-xs text-yellow-700">
                  You'll need to sign in again to access your account and
                  continue shopping.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-10 sm:h-11"
              disabled={isSigningOut}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full sm:flex-1 bg-[#EB5934] hover:bg-[#d14d2a] text-white h-10 sm:h-11"
            >
              {isSigningOut ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Signing out...</span>
                </div>
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">Sign Out</span>
                </>
              )}
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 text-center">
            Your cart items will be saved for your next visit
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
