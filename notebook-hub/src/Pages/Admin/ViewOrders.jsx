import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  Truck,
  Search,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Mail,
  MapPin,
  FileText,
  DollarSign,
} from "lucide-react";
import axios from "axios";

function ViewOrders() {
  const token = localStorage.getItem("token");
  const [orderDetails, setOrderDetails] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expandedCustomOrder, setExpandedCustomOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [customOrder, setCustomOrder] = useState([]);
  const [customSearchTerm, setCustomSearchTerm] = useState("");

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9092/admin/get-all-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const respons2 = await axios.get(
          "http://localhost:9092/admin/get-all-custom-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        console.log(respons2.data);
        setOrderDetails(response.data);
        setCustomOrder(respons2.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    getOrderDetails();
  }, []);
  const handleOrderStatusUpdate = async (orderId, statusType) => {
    try {
      const response = await axios.put(
        `http://localhost:9092/admin/update-status/${orderId}`,
        { status: statusType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setOrderDetails(
        orderDetails.map((order) =>
          order.order_id === orderId
            ? { ...order, [statusType]: new Date() }
            : order
        )
      );
    } catch (err) {
      console.error(`Error updating order status: ${statusType}`, err);
    }
  };
  const handleCustomOrderStatusUpdate = async (orderId, statusType) => {
    try {
      const response = await axios.put(
        `http://localhost:9092/admin/update-status-custom/${orderId}`,
        { status: statusType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setOrderDetails(
        orderDetails.map((order) =>
          order.note_id === orderId
            ? { ...order, [statusType]: new Date() }
            : order
        )
      );
    } catch (err) {
      console.error(`Error updating order status: ${statusType}`, err);
    }
  };
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const toggleCustomOrderExpansion = (orderId) => {
    console.log(orderId);
    setExpandedCustomOrder(expandedCustomOrder === orderId ? null : orderId);
  };
  const filteredOrders = orderDetails.filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toString().includes(searchTerm)
  );
  const filteredCustomOrders = customOrder.filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <ShoppingBag className="mr-2 h-7 w-7 text-gray-700" />
            Order Management
          </h1>

          <div className="relative w-full md:w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Showing {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "order" : "orders"}
        </p>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer flex justify-between items-center border-b border-gray-100"
                  onClick={() => toggleOrderExpansion(order.order_id)}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        Order #{order.order_id}
                      </h2>
                      <p className="text-gray-600 text-sm">{order.user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                      <p className="font-medium text-gray-900">
                        ₹{order.totalPrice}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.quantity} items
                      </p>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      {expandedOrder === order.order_id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedOrder === order.order_id && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700 mb-2">
                        <User className="h-5 w-5 mr-2" />
                        <h3 className="font-medium text-gray-800">
                          Customer Details
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-gray-800">
                          {order.user.name}
                        </p>
                        <div className="flex items-start mt-2">
                          <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">
                            {order.user.email}
                          </p>
                        </div>
                        <div className="flex items-start mt-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">
                            {order.user.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Package className="h-5 w-5 mr-2" />
                        <h3 className="font-medium text-gray-800">
                          Product Details
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Paper Type</p>
                            <p className="text-gray-800 capitalize">
                              {order.product.paperType}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Size</p>
                            <p className="text-gray-800 uppercase">
                              {order.product.size}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Ruling</p>
                            <p className="text-gray-800 capitalize">
                              {order.product.ruling}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Cover</p>
                            <p className="text-gray-800 capitalize">
                              {order.product.cover}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <p className="text-gray-600">Quantity:</p>
                            <p className="font-medium text-gray-800">
                              {order.quantity}
                            </p>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-gray-600">Price:</p>
                            <p className="font-medium text-gray-800">
                              ₹{order.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Truck className="h-5 w-5 mr-2" />
                        <h3 className="font-medium text-gray-800">
                          Shipping Info
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500">Street</p>
                            <p className="text-gray-800">
                              {order.address.street}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">City</p>
                            <p className="text-gray-800">
                              {order.address.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">ZIP Code</p>
                            <p className="text-gray-800">{order.address.zip}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center">
                          <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                          <p className="text-green-600 font-medium">
                            Payment Completed
                          </p>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button
                            className={`${
                              order.processingDate
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white py-2 px-4 rounded-md`}
                            disabled={!!order.processingDate}
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order.order_id,
                                "processingDate"
                              )
                            }
                          >
                            Order Processing
                          </button>

                          <button
                            className={`${
                              !order.processingDate || order.shippedDate
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-yellow-600 hover:bg-yellow-700"
                            } text-white py-2 px-4 rounded-md`}
                            disabled={
                              !order.processingDate || !!order.shippedDate
                            }
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order.order_id,
                                "shippedDate"
                              )
                            }
                          >
                            Order Shipped
                          </button>

                          <button
                            className={`${
                              !order.shippedDate || order.deliveredDate
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white py-2 px-4 rounded-md`}
                            disabled={
                              !order.shippedDate || !!order.deliveredDate
                            }
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order.order_id,
                                "deliveredDate"
                              )
                            }
                          >
                            Order Delivered
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="max-w-7xl pt-10 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <ShoppingBag className="mr-2 h-7 w-7 text-gray-700" />
            Custom Order Management
          </h1>

          <div className="relative w-full md:w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Search orders..."
              value={customSearchTerm}
              onChange={(e) => setCustomSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Showing {filteredCustomOrders.length}{" "}
          {filteredCustomOrders.length === 1 ? "order" : "orders"}
        </p>

        <div className="space-y-4">
          {filteredCustomOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            filteredCustomOrders.map((order) => (
              <div
                key={order.note_id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer flex justify-between items-center border-b border-gray-100"
                  onClick={() => toggleCustomOrderExpansion(order.note_id)}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        Order #{order.note_id}
                      </h2>
                      <p className="text-gray-600 text-sm">{order.user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                      <p className="font-medium text-gray-900">
                        ₹{order.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.quantity} items
                      </p>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      {expandedCustomOrder === order.note_id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedCustomOrder === order.note_id && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700 mb-2">
                        <User className="h-5 w-5 mr-2" />
                        <h3 className="font-medium text-gray-800">
                          Customer Details
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-gray-800">
                          {order.user.name}
                        </p>
                        <div className="flex items-start mt-2">
                          <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">
                            {order.user.email}
                          </p>
                        </div>
                        <div className="flex items-start mt-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">
                            {order.user.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Package className="h-5 w-5 mr-2" />
                        <h3 className="font-medium text-gray-800">
                          Product Details
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Paper Type</p>
                            <p className="text-gray-800 capitalize">
                              {order.paperType}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Size</p>
                            <p className="text-gray-800 uppercase">
                              {order.size}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Ruling</p>
                            <p className="text-gray-800 capitalize">
                              {order.ruling}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Cover</p>
                            <p className="text-gray-800 capitalize">
                              {order.cover}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <p className="text-gray-600">Quantity:</p>
                            <p className="font-medium text-gray-800">
                              {order.quantity}
                            </p>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-gray-600">Price:</p>
                            <p className="font-medium text-gray-800">
                              ₹{order.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Truck className="h-5 w-5 mr-2" />
                        <h3 className="font-medium text-gray-800">
                          Shipping Info
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500">Street</p>
                            <p className="text-gray-800">{order.street}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">City</p>
                            <p className="text-gray-800">{order.city}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">ZIP Code</p>
                            <p className="text-gray-800">{order.zip}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center">
                          <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                          <p className="text-green-600 font-medium">
                            Payment Completed
                          </p>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button
                            className={`${
                              order.processingDate
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white py-2 px-4 rounded-md`}
                            disabled={!!order.processingDate}
                            onClick={() =>
                              handleCustomOrderStatusUpdate(
                                order.note_id,
                                "processingDate"
                              )
                            }
                          >
                            Order Processing
                          </button>

                          <button
                            className={`${
                              !order.processingDate || order.shippedDate
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-yellow-600 hover:bg-yellow-700"
                            } text-white py-2 px-4 rounded-md`}
                            disabled={
                              !order.processingDate || !!order.shippedDate
                            }
                            onClick={() =>
                              handleCustomOrderStatusUpdate(
                                order.note_id,
                                "shippedDate"
                              )
                            }
                          >
                            Order Shipped
                          </button>

                          <button
                            className={`${
                              !order.shippedDate || order.deliveredDate
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white py-2 px-4 rounded-md`}
                            disabled={
                              !order.shippedDate || !!order.deliveredDate
                            }
                            onClick={() =>
                              handleCustomOrderStatusUpdate(
                                order.note_id,
                                "deliveredDate"
                              )
                            }
                          >
                            Order Delivered
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
