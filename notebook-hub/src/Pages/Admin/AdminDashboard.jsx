import {
  BookOpen,
  DollarSign,
  Package,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { baseURL } from "../../api";
export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState("");
  useEffect(() => {
    const getDetails = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:9092/admin/get-analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setAnalytics(response.data);
    };
    getDetails();
  }, []);

  const pieData = [
    { name: "Stock Left", value: analytics.totalStock || 0 },
    { name: "Bookings", value: analytics.totalBookings || 0 },
    { name: "Revenue", value: analytics.totalRevenue || 0 },
    { name: "Notebooks Sold", value: analytics.notebookSold || 0 },
    { name: "Pending Orders", value: analytics.pendingOrders || 0 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#facc15", "#ef4444"];
  return (
    <div className="min-h-screen bg-gray-50 ">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:block xl:blocl sm:block flex flex-col items-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="rounded-lg bg-white p-5 shadow">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Stock Left
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.totalStock}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Bookings
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.totalBookings}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  Rs.{analytics.totalRevenue}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <ShoppingCart className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Notebooks Sold
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.notebookSold}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <ShoppingBag className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Pending Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.pendingOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Analytics */}
        <div className="mt-10 rounded-lg flex flex-col bg-white p-10 py-20 md:py-0 shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sales Analytics Overview
          </h2>
          <div className="h-78 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
