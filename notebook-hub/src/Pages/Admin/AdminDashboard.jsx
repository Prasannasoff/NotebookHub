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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { baseURL } from "../../api";
import { FadeLoader } from "react-spinners";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/admin/get-analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setAnalytics(response.data);
      setLoading(false);
    };
    getDetails();
  }, []);

  const pieData = [
    { name: "Stock Left", value: analytics.totalStock || 0 },
    { name: "Bookings", value: analytics.totalBookings || 0 },
    { name: "Notebooks Sold", value: analytics.notebookSold || 0 },
    { name: "Pending Orders", value: analytics.pendingOrders || 0 },
  ];
  const generateMockRevenueData = (totalRevenue) => {
    const monthly = Array.from({ length: 6 }, (_, i) => ({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
      revenue: Math.round((totalRevenue / 6) * (0.9 + Math.random() * 0.2)), // ±10%
    }));

    const weekly = Array.from({ length: 24 }, (_, i) => ({
      week: `Week ${i + 1}`,
      revenue: Math.round((totalRevenue / 24) * (0.9 + Math.random() * 0.2)), // ±10%
    }));

    return { monthly, weekly };
  };

  const { monthly: monthlyRevenue, weekly: weeklyRevenue } =
    generateMockRevenueData(analytics.totalRevenue || 0);

  const [revenueView, setRevenueView] = useState("monthly");
  const revenueData =
    revenueView === "monthly" ? monthlyRevenue : weeklyRevenue;

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#facc15", "#ef4444"];
  return (
    <div className="min-h-screen bg-gray-50 ">
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <FadeLoader color="#ffffff" />
        </div>
      )}
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
        <div className="mt-10 rounded-lg bg-white p-10 shadow w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Sales Analytics Overview
          </h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Revenue Bar Chart */}
        <div className="mt-10 rounded-lg bg-white p-10 shadow w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Revenue Overview
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => setRevenueView("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  revenueView === "monthly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRevenueView("weekly")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  revenueView === "weekly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={revenueView === "monthly" ? "month" : "week"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
