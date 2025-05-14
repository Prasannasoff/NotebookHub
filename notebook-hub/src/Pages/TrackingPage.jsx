import { useState, useEffect } from "react";
import { CheckCircle, Clock, Package, Search, Truck } from "lucide-react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { baseURL } from "../api";
import { useUser } from "../Context/UserContext";
import axios from "axios";

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [customOrder, setCustomOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customSelectedOrder, setCustomSelectedOrder] = useState(null);
  const { userDetails } = useUser();
  const [showMore, setShowMore] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItemDetails = (index) => {
    console.log(selectedOrder);
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getOrderDetails = async () => {
      if (!userDetails) return;
      try {
        const response = await axios.get(
          `${baseURL}/user/get-order/${userDetails.user_id}`,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        const response2 = await axios.get(
          `${baseURL}/user/get-custom-order/${userDetails.user_id}`,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response2.data);
        const orderData = response.data.map((order, index) => {
          const timeline = [
            {
              status: "ordered",
              date: order.orderedDate?.split("T")[0],
              completed: !!order.orderedDate,
            },
            {
              status: "processing",
              date: order.processingDate?.split("T")[0] || "Est. N/A",
              completed: !!order.processingDate,
            },
            {
              status: "shipped",
              date: order.shippedDate?.split("T")[0] || "Est. N/A",
              completed: !!order.shippedDate,
            },
            {
              status: "delivered",
              date: order.deliveredDate?.split("T")[0] || "Est. N/A",
              completed: !!order.deliveredDate,
            },
          ];

          return {
            id: `ORD-${order.order_id.toString().padStart(5, "0")}`,
            date: order.orderedDate?.split("T")[0],
            status: order.deliveredDate
              ? "delivered"
              : order.shippedDate
              ? "shipped"
              : order.processingDate
              ? "processing"
              : "ordered",
            items: [
              {
                name: order.product.note_name,
                quantity: order.quantity,
                price: order.totalPrice,
                cover: order.product.cover,
                pages: order.product.pages,
                ruling: order.product.ruling,
                size: order.product.size,
                paperType: order.product.paperType,
              },
            ],
            timeline,
          };
        });
        const customOrderData = response2.data.map((order, index) => {
          const timeline = [
            {
              status: "ordered",
              date: order.orderedDate?.split("T")[0],
              completed: !!order.orderedDate,
            },
            {
              status: "processing",
              date: order.processingDate?.split("T")[0] || "Est. N/A",
              completed: !!order.processingDate,
            },
            {
              status: "shipped",
              date: order.shippedDate?.split("T")[0] || "Est. N/A",
              completed: !!order.shippedDate,
            },
            {
              status: "delivered",
              date: order.deliveredDate?.split("T")[0] || "Est. N/A",
              completed: !!order.deliveredDate,
            },
          ];

          return {
            id: `ORD-${order.note_id.toString().padStart(5, "1")}`,
            date: order.orderedDate?.split("T")[0],
            status: order.deliveredDate
              ? "delivered"
              : order.shippedDate
              ? "shipped"
              : order.processingDate
              ? "processing"
              : "ordered",
            items: [
              {
                name: order.note_name,
                quantity: order.quantity,
                price: order.price,
                cover: order.cover,
                pages: order.pages,
                ruling: order.ruling,
                size: order.size,
                paperType: order.paperType,
              },
            ],
            timeline,
          };
        });
        console.log("RESPONSE" + response2.data);
        setOrders(orderData);
        setCustomOrder(customOrderData);
        console.log(orderData);
        setSelectedOrder(orderData[0]);
        setCustomSelectedOrder(customOrderData[0]);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    getOrderDetails();
  }, [userDetails]);

  const filteredOrders = searchQuery
    ? orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : orders;

  const customFilteredOrders = searchQuery
    ? customOrder.filter((order) =>
        order.note_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customOrder;

  const getStatusIcon = (status) => {
    switch (status) {
      case "ordered":
        return <Clock className="h-6 w-6" />;
      case "processing":
        return <Package className="h-6 w-6" />;
      case "shipped":
        return <Truck className="h-6 w-6" />;
      case "delivered":
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status, completed) => {
    if (!completed) return "text-muted-foreground";
    switch (status) {
      case "ordered":
        return "text-blue-500";
      case "processing":
        return "text-yellow-500";
      case "shipped":
        return "text-orange-500";
      case "delivered":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getProgressPercentage = (order) => {
    const completedSteps = order.timeline.filter(
      (step) => step.completed
    ).length;
    return (completedSteps / order.timeline.length) * 100;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-8 md:px-6 md:py-12 flex flex-col gap-5">
        <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Order List */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="relative"></div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedOrder?.id === order.id
                      ? "border-2 border-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {order.date}
                      </span>
                    </div>
                    <CardDescription>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full progress-bar-animate"
                          style={{ width: `${getProgressPercentage(order)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {order.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="w-full md:w-2/3">
              <Card className="h-full">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedOrder.id}
                      </CardTitle>
                      <CardDescription>
                        Ordered on {selectedOrder.date}
                      </CardDescription>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-secondary text-sm font-medium capitalize">
                      {selectedOrder.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-8">
                    {/* Progress Bar */}
                    <div className="relative pt-6">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full progress-bar-animate"
                          style={{
                            width: `${getProgressPercentage(selectedOrder)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-6">
                      {selectedOrder.timeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-full ${getStatusColor(
                              step.status,
                              step.completed
                            )}`}
                          >
                            {getStatusIcon(step.status)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium capitalize">
                                {step.status}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                {step.date}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {step.completed
                                ? `Your order has been ${step.status}`
                                : `Your order will be ${step.status} soon`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Order Items</h3>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div
                            key={index}
                            className="border-b last:border-0 pb-4"
                          >
                            <div className="flex justify-between py-2">
                              <span>{item.name}</span>
                              <span className="font-medium">
                                Qty: {item.quantity} | Amount Paid :{" "}
                                {item.price}
                              </span>
                            </div>

                            {/* Toggle Button */}
                            <button
                              onClick={() => toggleItemDetails(index)}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {expandedItems[index]
                                ? "Hide details ▲"
                                : "See more ▼"}
                            </button>

                            {/* Expanded Order Details */}
                            {expandedItems[index] && (
                              <div className="grid grid-cols-2 gap-4 mt-3 p-4 rounded-md bg-gray-50 border">
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Cover
                                  </span>
                                  <span className="font-semibold">
                                    {item.cover}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Paper Type
                                  </span>
                                  <span className="font-semibold">
                                    {item.paperType}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Ruling
                                  </span>
                                  <span className="font-semibold">
                                    {item.ruling}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Size
                                  </span>
                                  <span className="font-semibold">
                                    {item.size}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Pages
                                  </span>
                                  <span className="font-semibold">
                                    {item.pages}
                                  </span>
                                </div>
                                {/* Add more fields as needed */}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Order List */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4 mt-4">Custom Order</h3>
            </div>

            <div className="space-y-4">
              {customFilteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    customSelectedOrder?.id === order.id
                      ? "border-2 border-primary"
                      : ""
                  }`}
                  onClick={() => setCustomSelectedOrder(order)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {order.date}
                      </span>
                    </div>
                    <CardDescription>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full progress-bar-animate"
                          style={{ width: `${getProgressPercentage(order)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {order.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Details */}
          {customSelectedOrder && (
            <div className="w-full md:w-2/3">
              <Card className="h-full">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">
                        {customSelectedOrder.id}
                      </CardTitle>
                      <CardDescription>
                        Ordered on {customSelectedOrder.date}
                      </CardDescription>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-secondary text-sm font-medium capitalize">
                      {customSelectedOrder.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-8">
                    {/* Progress Bar */}
                    <div className="relative pt-6">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full progress-bar-animate"
                          style={{
                            width: `${getProgressPercentage(
                              customSelectedOrder
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-6">
                      {customSelectedOrder.timeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-full ${getStatusColor(
                              step.status,
                              step.completed
                            )}`}
                          >
                            {getStatusIcon(step.status)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium capitalize">
                                {step.status}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                {step.date}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {step.completed
                                ? `Your order has been ${step.status}`
                                : `Your order will be ${step.status} soon`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Order Items</h3>
                      <div className="space-y-2">
                        {customSelectedOrder.items.map((item, index) => (
                          <div
                            key={index}
                            className="border-b last:border-0 pb-4"
                          >
                            <div className="flex justify-between py-2">
                              <span>{item.name}</span>
                              <span className="font-medium">
                                Qty: {item.quantity} | Amount Paid :{" "}
                                {item.price}
                              </span>
                            </div>

                            {/* Toggle Button */}
                            <button
                              onClick={() => toggleItemDetails(index)}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {expandedItems[index]
                                ? "Hide details ▲"
                                : "See more ▼"}
                            </button>

                            {/* Expanded Order Details */}
                            {expandedItems[index] && (
                              <div className="grid grid-cols-2 gap-4 mt-3 p-4 rounded-md bg-gray-50 border">
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Cover
                                  </span>
                                  <span className="font-semibold">
                                    {item.cover}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Paper Type
                                  </span>
                                  <span className="font-semibold">
                                    {item.paperType}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Ruling
                                  </span>
                                  <span className="font-semibold">
                                    {item.ruling}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Size
                                  </span>
                                  <span className="font-semibold">
                                    {item.size}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-sm text-muted-foreground">
                                    Pages
                                  </span>
                                  <span className="font-semibold">
                                    {item.pages}
                                  </span>
                                </div>
                                {/* Add more fields as needed */}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
