"use client"

import { useState } from "react"
import { CheckCircle, Clock, Package, Search, Truck } from "lucide-react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
// import { Input } from "../Components/ui/input"


// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "2025-02-15",
    status: "delivered",
    items: [{ name: "Premium Hardcover Notebook", quantity: 100 }],
    timeline: [
      { status: "ordered", date: "Feb 15, 2025", completed: true },
      { status: "processing", date: "Feb 16, 2025", completed: true },
      { status: "shipped", date: "Feb 18, 2025", completed: true },
      { status: "delivered", date: "Feb 22, 2025", completed: true },
    ],
  },
  {
    id: "ORD-12346",
    date: "2025-02-20",
    status: "shipped",
    items: [
      { name: "Softcover Journal", quantity: 200 },
      { name: "Eco-Friendly Notebook", quantity: 50 },
    ],
    timeline: [
      { status: "ordered", date: "Feb 20, 2025", completed: true },
      { status: "processing", date: "Feb 21, 2025", completed: true },
      { status: "shipped", date: "Feb 23, 2025", completed: true },
      { status: "delivered", date: "Est. Feb 27, 2025", completed: false },
    ],
  },
  {
    id: "ORD-12347",
    date: "2025-02-25",
    status: "processing",
    items: [{ name: "Custom Leather Journal", quantity: 50 }],
    timeline: [
      { status: "ordered", date: "Feb 25, 2025", completed: true },
      { status: "processing", date: "Feb 26, 2025", completed: true },
      { status: "shipped", date: "Est. Mar 1, 2025", completed: false },
      { status: "delivered", date: "Est. Mar 5, 2025", completed: false },
    ],
  },
]

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  const filteredOrders = searchQuery
    ? orders.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : orders

  const getStatusIcon = (status) => {
    switch (status) {
      case "ordered":
        return <Clock className="h-6 w-6" />
      case "processing":
        return <Package className="h-6 w-6" />
      case "shipped":
        return <Truck className="h-6 w-6" />
      case "delivered":
        return <CheckCircle className="h-6 w-6" />
      default:
        return <Clock className="h-6 w-6" />
    }
  }

  const getStatusColor = (status, completed) => {
    if (!completed) return "text-muted-foreground"

    switch (status) {
      case "ordered":
        return "text-blue-500"
      case "processing":
        return "text-yellow-500"
      case "shipped":
        return "text-orange-500"
      case "delivered":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getProgressPercentage = (order) => {
    const completedSteps = order.timeline.filter((step) => step.completed).length
    return (completedSteps / order.timeline.length) * 100
  }

  return (
    <div className="flex min-h-screen flex-col">
   
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Order List */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search by order number..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer transition-all hover:border-primary ${selectedOrder.id === order.id ? "border-2 border-primary" : ""}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <span className="text-sm text-muted-foreground">{order.date}</span>
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
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="w-full md:w-2/3">
            <Card className="h-full">
              <CardHeader className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedOrder.id}</CardTitle>
                    <CardDescription>Ordered on {selectedOrder.date}</CardDescription>
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
                        style={{ width: `${getProgressPercentage(selectedOrder)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6">
                    {selectedOrder.timeline.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${getStatusColor(step.status, step.completed)}`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium capitalize">{step.status}</h3>
                            <span className="text-sm text-muted-foreground">{step.date}</span>
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
                        <div key={index} className="flex justify-between py-2 border-b last:border-0">
                          <span>{item.name}</span>
                          <span className="font-medium">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      Download Invoice
                    </Button>
                    <Button className="flex-1">Contact Support</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

