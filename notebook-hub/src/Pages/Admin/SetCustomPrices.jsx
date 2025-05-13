import React, { useState } from "react";
import axios from "axios";
import { Button } from "../../Components/ui/button";

const SetCustomPrices = () => {
  const [prices, setPrices] = useState({
    paperType: {
      standard: "",
      premium: "",
      recycled: "",
    },
    size: {
      a4: "",
      a5: "",
      b5: "",
    },
    ruling: {
      lined: "",
      grid: "",
      blank: "",
    },
    cover: {
      hardcover: "",
      softcover: "",
      spiral: "",
    },
  });

  const handleChange = (e, category, option) => {
    setPrices({
      ...prices,
      [category]: {
        ...prices[category],
        [option]: e.target.value,
      },
    });
  };

  const handleSubmit = async (category) => {
    try {
      const token = localStorage.getItem("token");
      for (const [option, price] of Object.entries(prices[category])) {
        const response = await axios.post(
          `http://localhost:9092/admin/set-${category}-price`,
          { type: category, option, price },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      alert(`${category} prices set successfully`);
    } catch (err) {
      console.error(err);
      alert(`Failed to set ${category} prices`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
          Set Prices for Custom Notebook Attributes
        </h1>

        {/* Paper Type Pricing */}
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Set Paper Type Prices</h2>
          {["standard", "premium", "recycled"].map((option) => (
            <div
              className="flex items-center justify-between mb-4"
              key={option}
            >
              <label className="text-sm font-medium text-gray-700 capitalize">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
              <input
                type="number"
                name={option}
                value={prices.paperType[option]}
                onChange={(e) => handleChange(e, "paperType", option)}
                min="1"
                className="w-24 rounded-md border px-3 py-2 text-gray-700 shadow-sm"
                placeholder="₹ Price"
              />
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => handleSubmit("paperType")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
            >
              Set Paper Prices
            </Button>
          </div>
        </div>

        {/* Size Pricing */}
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Set Size Prices</h2>
          {["a4", "a5", "b5"].map((option) => (
            <div
              className="flex items-center justify-between mb-4"
              key={option}
            >
              <label className="text-sm font-medium text-gray-700 capitalize">
                {option.toUpperCase()}
              </label>
              <input
                type="number"
                name={option}
                value={prices.size[option]}
                onChange={(e) => handleChange(e, "size", option)}
                min="1"
                className="w-24 rounded-md border px-3 py-2 text-gray-700 shadow-sm"
                placeholder="₹ Price"
              />
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => handleSubmit("size")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
            >
              Set Size Prices
            </Button>
          </div>
        </div>

        {/* Ruling Pricing */}
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Set Ruling Prices</h2>
          {["lined", "grid", "blank"].map((option) => (
            <div
              className="flex items-center justify-between mb-4"
              key={option}
            >
              <label className="text-sm font-medium text-gray-700 capitalize">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
              <input
                type="number"
                name={option}
                value={prices.ruling[option]}
                onChange={(e) => handleChange(e, "ruling", option)}
                min="1"
                className="w-24 rounded-md border px-3 py-2 text-gray-700 shadow-sm"
                placeholder="₹ Price"
              />
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => handleSubmit("ruling")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
            >
              Set Ruling Prices
            </Button>
          </div>
        </div>

        {/* Cover Pricing */}
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Set Cover Prices</h2>
          {["hardcover", "softcover", "spiral"].map((option) => (
            <div
              className="flex items-center justify-between mb-4"
              key={option}
            >
              <label className="text-sm font-medium text-gray-700 capitalize">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
              <input
                type="number"
                name={option}
                value={prices.cover[option]}
                onChange={(e) => handleChange(e, "cover", option)}
                min="1"
                className="w-24 rounded-md border px-3 py-2 text-gray-700 shadow-sm"
                placeholder="₹ Price"
              />
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => handleSubmit("cover")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
            >
              Set Cover Prices
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetCustomPrices;
