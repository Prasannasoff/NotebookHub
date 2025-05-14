import React from "react";
import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Ruler,
  Book,
  FileText,
  MapPin,
  X,
} from "lucide-react";
import { Button } from "../button";
import image from "../../../assets/notebook.png";
import { Input } from "../input";
import { baseURL } from "../../../api";
import axios from "axios";

function NoteModel({ productData, isOpen, setModelOpen, userDetails }) {
  const [decrementQuantity, setDecrementQuantity] = useState();
  const [incrementQuantity, setIncrementQuantity] = useState();
  const [quantity, setQuantity] = useState(25); // Start with minimum order
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const token = localStorage.getItem("token");

  const handleIncrement = () => {
    console.log(userDetails);
    setQuantity((prev) => prev + 25);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 25 ? prev - 25 : prev));
  };
  const handleBooking = async () => {
    if (!address || !city || !zip) {
      alert("Please fill in all address fields.");
      return;
    }
    if (quantity > productData.quantity) {
      alert(`Only ${productData.quantity} notebooks available in stock.`);
      return;
    }
    console.log("ID" + userDetails.user_id);
    const bookingData = {
      userId: userDetails?.user_id,
      productId: productData?.note_id,
      quantity,
      address: {
        street: address,
        city,
        zip,
      },
      totalPrice: productData.price * quantity,
    };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    const sessionRes = await axios.post(
      `${baseURL}/user/create-checkout-session`,
      {
        bookingData,
        success_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href = sessionRes.data.url;
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-[500px] shadow-lg border border-gray-200 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          onClick={() => setModelOpen(false)}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add to Cart</h2>

        {/* Product info section */}
        <div className="flex gap-4 mb-6">
          <div className="max-w-28 max-h-28 rounded-lg p-0 inset-0 overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={image || "/placeholder.svg"}
              alt={productData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Premium Notebook</h3>
            <p className="text-2xl font-bold text-primary mt-1">
              Rs.{productData.price}
            </p>
          </div>
        </div>

        {/* Product specifications */}
        <div className="space-y-4">
          {/* Size selection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-4 w-4 text-gray-500" />
              <div className="font-medium">Size</div>
              <div className="font-medium">{productData.size}</div>
            </div>
          </div>

          {/* Ruling display */}

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <div className="font-medium">ruling</div>
              <div className="font-medium">{productData.ruling}</div>
            </div>
          </div>

          {/* Pages selection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <div className="font-medium">Pages</div>
              <div className="font-medium">{productData.pages}</div>
            </div>
          </div>

          {/* Quantity selector */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="h-4 w-4 text-gray-500" />
              <div className="font-medium">Quantity</div>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                className="h-10 w-10 rounded-r-none"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 px-4 flex items-center justify-center border-y border-input min-w-[40px]">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                className="h-10 w-10 rounded-l-none"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <div className="font-medium">Delivery Address</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label htmlFor="address" className="text-sm">
                Street Address
              </label>
              <Input
                id="address"
                placeholder="123 Main St"
                className="mt-1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city" className="text-sm">
                City
              </label>
              <Input
                id="city"
                placeholder="New York"
                className="mt-1"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="zip" className="text-sm">
                ZIP Code
              </label>
              <Input
                id="zip"
                placeholder="10001"
                className="mt-1"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            className="min-w-60 bg-amber-300"
            onClick={() => handleBooking()}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              Add to Cart
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NoteModel;
