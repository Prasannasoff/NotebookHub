import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "../../Components/ui/button";
import { useUser } from "../../Context/UserContext"; // wherever your context is
import { baseURL } from "../../api";
import { FadeLoader } from "react-spinners";

function AddNotebook() {
  const { userDetails } = useUser();
  console.log(userDetails.admin);
  const [paperType, setPaperType] = useState("");
  const [size, setSize] = useState("");
  const [ruling, setRuling] = useState("");
  const [cover, setCover] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [pages, setPages] = useState(0);
  const [showPreview, setShowPreview] = useState();
  const [image, setImage] = useState(null);
  const [noteName, setNoteName] = useState();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("paperType", paperType);
      formData.append("size", size);
      formData.append("ruling", ruling);
      formData.append("cover", cover);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("pages", pages);
      formData.append("note_name", noteName);
      formData.append("note-image", image);
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.post(`${baseURL}/admin/add-note`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <FadeLoader color="#ffffff" />
        </div>
      )}
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
          Add Notebooks
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Note Name
              </label>
              <input
                type="text"
                id="noteName"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Paper Type */}
            <div className="space-y-2">
              <label
                htmlFor="paperType"
                className="block text-sm font-medium text-gray-700"
              >
                Paper Type
              </label>
              <select
                id="paperType"
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select paper type
                </option>
                <option value="standard">Standard</option>
                <option value="recycled">Recycled</option>
                <option value="premium">Premium</option>
                <option value="cotton">Cotton</option>
              </select>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select size
                </option>
                <option value="a4">A4</option>
                <option value="a5">A5</option>
                <option value="b5">B5</option>
                <option value="letter">Letter</option>
              </select>
            </div>

            {/* Ruling */}
            <div className="space-y-2">
              <label
                htmlFor="ruling"
                className="block text-sm font-medium text-gray-700"
              >
                Ruling
              </label>
              <select
                id="ruling"
                value={ruling}
                onChange={(e) => setRuling(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select ruling
                </option>
                <option value="lined">Lined</option>
                <option value="grid">Grid</option>
                <option value="dotted">Dotted</option>
                <option value="blank">Blank</option>
              </select>
            </div>

            {/* Cover */}
            <div className="space-y-2">
              <label
                htmlFor="cover"
                className="block text-sm font-medium text-gray-700"
              >
                Cover
              </label>
              <select
                id="cover"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select cover
                </option>
                <option value="hardcover">Hardcover</option>
                <option value="softcover">Softcover</option>
                <option value="leather">Leather</option>
                <option value="spiral">Spiral</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="Pages"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Pages
              </label>
              <input
                type="number"
                id="pages"
                min="1"
                value={pages}
                onChange={(e) => setPages(Number.parseInt(e.target.value))}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Quantity */}

            <div className="space-y-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="Price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                min="1"
                value={price}
                onChange={(e) => setPrice(Number.parseInt(e.target.value))}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Notebook Image
              </label>
              <input
                type="file"
                className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => handleSubmit()}
              className="rounded-md bg-blue-600 px-6 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Notebook
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Notebook Preview
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md bg-gray-100 p-4">
                <div className="aspect-[3/4] rounded-md bg-white p-2 shadow-sm">
                  <div className="h-full w-full rounded border-2 border-gray-300 bg-white p-4">
                    <div className="flex h-full flex-col items-center justify-center">
                      {cover && (
                        <p className="font-medium text-gray-700">
                          Cover: {cover}
                        </p>
                      )}
                      {size && <p className="text-gray-600">Size: {size}</p>}
                      {paperType && (
                        <p className="text-gray-600">Paper: {paperType}</p>
                      )}
                      {ruling && (
                        <p className="text-gray-600">Ruling: {ruling}</p>
                      )}
                      {quantity > 0 && (
                        <p className="mt-2 text-sm text-gray-500">
                          Quantity: {quantity}
                        </p>
                      )}
                      <input
                        type="file"
                        className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Notebook Details
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {paperType && (
                    <li>
                      <span className="font-medium">Paper Type:</span>{" "}
                      {paperType}
                    </li>
                  )}
                  {size && (
                    <li>
                      <span className="font-medium">Size:</span> {size}
                    </li>
                  )}
                  {ruling && (
                    <li>
                      <span className="font-medium">Ruling:</span> {ruling}
                    </li>
                  )}
                  {cover && (
                    <li>
                      <span className="font-medium">Cover:</span> {cover}
                    </li>
                  )}
                  {quantity > 0 && (
                    <li>
                      <span className="font-medium">Quantity:</span> {quantity}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddNotebook;
