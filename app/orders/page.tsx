"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Search,
  Filter,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  Download,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Mock orders data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 99.99,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-16",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 149.99,
      items: [
        {
          id: 3,
          name: "Running Shoes",
          price: 79.99,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
        },
        {
          id: 4,
          name: "Water Bottle",
          price: 24.99,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-12",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "highest") {
        return b.total - a.total;
      } else if (sortBy === "lowest") {
        return a.total - b.total;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="bg-white p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  My Orders
                </h1>
                <p className="text-gray-600">
                  Track and manage your order history
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Badge className="bg-[#EB5934]/10 text-[#EB5934] px-4 py-2">
                  {filteredOrders.length} Orders Found
                </Badge>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by order ID or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        All Status
                      </div>
                    </SelectItem>
                    <SelectItem value="delivered">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Delivered
                      </div>
                    </SelectItem>
                    <SelectItem value="shipped">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        Shipped
                      </div>
                    </SelectItem>
                    <SelectItem value="processing">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        Processing
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-red-600" />
                        Cancelled
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="lg:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 border-gray-300 focus:ring-[#EB5934] focus:border-[#EB5934]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <SelectValue placeholder="Sort orders" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Amount</SelectItem>
                    <SelectItem value="lowest">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "You haven't placed any orders yet"}
                </p>
                <Link href="/products">
                  <Button className="bg-[#EB5934] hover:bg-[#d14d2a] text-white">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white p-6">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#EB5934]/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#EB5934]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on{" "}
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        className={`${getStatusColor(
                          order.status
                        )} px-3 py-1 flex items-center gap-1`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                      <span className="text-xl font-bold text-gray-900">
                        ${order.total}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items List */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Order Items ({order.items.length})
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                {item.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Order Details
                      </h4>

                      {/* Shipping Address */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-[#EB5934]" />
                          <span className="font-medium text-gray-900">
                            Shipping Address
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                        </div>
                      </div>

                      {/* Tracking Info */}
                      {/* {order.trackingNumber && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Truck className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-900">
                              Tracking Info
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {order.trackingNumber}
                          </p>
                          {order.estimatedDelivery && (
                            <p className="text-xs text-blue-600">
                              Est. Delivery:{" "}
                              {new Date(
                                order.estimatedDelivery
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )} */}

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {/* <Link href={`/orders/${order.id}`}>
                          <Button
                            variant="outline"
                            className="w-full border-[#EB5934] text-[#EB5934] hover:bg-[#EB5934] hover:text-white"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link> */}

                        {order.status !== "Cancelled" && (
                          <>
                            <Button variant="outline" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Download Invoice
                            </Button>

                            {/* {order.trackingNumber && (
                              <Button variant="outline" className="w-full">
                                <Truck className="w-4 h-4 mr-2" />
                                Track Package
                              </Button>
                            )} */}
                          </>
                        )}

                        {order.status === "Delivered" && (
                          <Button className="w-full bg-[#EB5934] hover:bg-[#d14d2a] text-white">
                            Buy Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {order !== filteredOrders[filteredOrders.length - 1] && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredOrders.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-[#EB5934] text-[#EB5934] hover:bg-[#EB5934] hover:text-white px-8"
              >
                Load More Orders
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
