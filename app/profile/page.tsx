"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-06-15",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 sticky top-8">
                {/* Profile Picture */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-40 h-40 bg-gradient-to-br from-[#EB5934] to-[#d14d2a] rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto">
                      {profileData.firstName.charAt(0)}
                      {profileData.lastName.charAt(0)}
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 bg-white border-2 border-gray-200 text-gray-600 hover:text-[#EB5934] hover:border-[#EB5934] rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-gray-600 mb-4">{profileData.email}</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-[#EB5934]" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-[#EB5934]" />
                    <span>Member since 2023</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Edit Button */}
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`w-full ${
                    isEditing
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-[#EB5934] hover:bg-[#d14d2a]"
                  } text-white py-3`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Editing
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right Side - Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-4 md:p-8">
                <div className="flex items-center gap-2 mb-8">
                  <User className="w-6 h-6 text-[#EB5934]" />
                  <h2 className="text-3xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="firstName"
                        className="text-base font-medium text-gray-700 mb-3 block"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`h-12 text-base ${
                          !isEditing
                            ? "bg-gray-50 border-gray-200"
                            : "border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                        }`}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lastName"
                        className="text-base font-medium text-gray-700 mb-3 block"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`h-12 text-base ${
                          !isEditing
                            ? "bg-gray-50 border-gray-200"
                            : "border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-base font-medium text-gray-700 mb-3 block"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`h-12 pl-12 text-base ${
                          !isEditing
                            ? "bg-gray-50 border-gray-200"
                            : "border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-base font-medium text-gray-700 mb-3 block"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`h-12 pl-12 text-base ${
                          !isEditing
                            ? "bg-gray-50 border-gray-200"
                            : "border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-base font-medium text-gray-700 mb-3 block"
                    >
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        disabled={!isEditing}
                        className={`h-12 pl-12 text-base ${
                          !isEditing
                            ? "bg-gray-50 border-gray-200"
                            : "border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <>
                    <Separator className="my-8" />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSave}
                        className="bg-[#EB5934] hover:bg-[#d14d2a] text-white px-10 py-3 text-base font-medium"
                      >
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
