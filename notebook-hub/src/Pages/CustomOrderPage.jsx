import { useState } from "react";
import axios from "axios";
import { Check, Info } from "lucide-react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { baseURL } from "../api.js";
import { useUser } from "../Context/UserContext";
const paperTypes = [
  {
    id: "standard",
    name: "Standard (80 gsm)",
    description: "Smooth, white paper suitable for most uses",
    price: 10,
  },
  {
    id: "premium",
    name: "Premium (100 gsm)",
    description: "Thicker paper with minimal bleed-through",
    price: 20,
  },
  {
    id: "recycled",
    name: "Recycled (90 gsm)",
    description: "Eco-friendly option with slight texture",
    price: 20,
  },
];

const sizes = [
  {
    id: "a5",
    name: "A5 (148 × 210 mm)",
    description: "Compact size, perfect for everyday use",
    price: 20,
  },
  {
    id: "a4",
    name: "A4 (210 × 297 mm)",
    description: "Standard letter size for detailed notes",
    price: 20,
  },
  {
    id: "b5",
    name: "B5 (176 × 250 mm)",
    description: "Medium size, balances portability and writing space",
    price: 30,
  },
];
const pages = [
  {
    id: "40",
    name: "40 Pages",
    description: "40 Pages Note(Default)",
    price: 0,
  },
  {
    id: "80",
    name: "80 Pages",
    description: "80 Pages Note",
    price: 20,
  },
  {
    id: "180",
    name: "180 Pages",
    description: "180 Pages Note",
    price: 30,
  },
];

const rulingStyles = [
  {
    id: "lined",
    name: "Lined",
    description: "Classic horizontal lines",
    price: 20,
  },
  {
    id: "grid",
    name: "Grid",
    description: "Evenly spaced grid pattern",
    price: 20,
  },
  {
    id: "dot",
    name: "Dot Grid",
    description: "Subtle dot pattern for flexibility",
    price: 30,
  },
  {
    id: "blank",
    name: "Blank",
    description: "Clean pages with no ruling",
    price: 40,
  },
];

const coverOptions = [
  {
    id: "hardcover",
    name: "Hardcover",
    description: "Durable, rigid cover for maximum protection",
    price: 50,
  },
  {
    id: "softcover",
    name: "Softcover",
    description: "Flexible, lightweight cover",
    price: 50,
  },
  {
    id: "leather",
    name: "Leather",
    description: "Premium genuine leather cover",
    price: 60,
  },
  {
    id: "eco",
    name: "Eco-Friendly",
    description: "Sustainable materials like recycled cardboard or cork",
    price: 60,
  },
];

export default function CustomOrderPage() {
  const logoPrice = 200;
  const imagePrice = 200;
  const [paperType, setPaperType] = useState(paperTypes[0].id);
  const [size, setSize] = useState(sizes[0].id);
  const [ruling, setRuling] = useState(rulingStyles[0].id);
  const [cover, setCover] = useState(coverOptions[0].id);
  const [quantity, setQuantity] = useState(25);
  const [logo, setLogo] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notebookName, setNotebookName] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [page, setPage] = useState(pages[0].id);
  const [street, setStreetName] = useState(null);
  const [city, setCityName] = useState(null);
  const [zipcode, setZipCode] = useState();
  const { userDetails } = useUser();
  const totalPrice =
    (paperTypes.find((p) => p.id === paperType)?.price || 0) +
    (sizes.find((s) => s.id === size)?.price || 0) +
    (rulingStyles.find((r) => r.id === ruling)?.price || 0) +
    (coverOptions.find((c) => c.id === cover)?.price || 0) +
    (pages.find((s) => s.id === page)?.price || 0) +
    (logo ? logoPrice : 0) +
    (image ? imagePrice : 0);
  const totalAmount = totalPrice * quantity;

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image.");
    const formData = new FormData();
    formData.append("paper-type", paperType);
    formData.append("size", size);
    formData.append("ruling", ruling);
    formData.append("cover", cover);
    formData.append("quantity", quantity);
    formData.append("price", totalAmount);
    formData.append("logo-image", logo);
    formData.append("pages", page);
    formData.append("notebookname", notebookName);
    formData.append("image", image);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("zipcode", zipcode);
    formData.append("user-id", userDetails.user_id);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${baseURL}/user/save-custom-order`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit order.");
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div>
            <h1 className="text-3xl font-bold">Custom Orders</h1>
            <p className="text-muted-foreground">
              Design your perfect notebook with our customization options
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="self-start"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Paper Type</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {paperTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      paperType === type.id ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => {
                      setPaperType(type.id);
                    }}
                  >
                    <CardHeader className="p-3 ">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {type.name}
                        {paperType === type.id && (
                          <Check className="h-5 w-5 text-primary pointer-events-none" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="pointer-events-none">
                        Rs.{type.price}
                      </CardDescription>
                      <CardDescription className="pointer-events-none">
                        {type.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Size</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {sizes.map((sizeOption) => (
                  <Card
                    key={sizeOption.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      size === sizeOption.id ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setSize(sizeOption.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {sizeOption.name}
                        {size === sizeOption.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="pointer-events-none">
                        Rs.{sizeOption.price}
                      </CardDescription>
                      <CardDescription>
                        {sizeOption.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ruling Style</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {rulingStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      ruling === style.id ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setRuling(style.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {style.name}
                        {ruling === style.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="pointer-events-none">
                        Rs.{style.price}
                      </CardDescription>
                      <CardDescription>{style.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Cover Design</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {coverOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      cover === option.id ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setCover(option.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {option.name}
                        {cover === option.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="pointer-events-none">
                        Rs.{option.price}
                      </CardDescription>
                      <CardDescription>{option.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Pages</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {pages.map((pageOption) => (
                  <Card
                    key={pageOption.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      page === pageOption.id ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setPage(pageOption.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {pageOption.name}
                        {page === pageOption.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="pointer-events-none">
                        Rs.{pageOption.price}
                      </CardDescription>
                      <CardDescription>
                        {pageOption.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quantity</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(50, quantity - 50))}
                  disabled={quantity <= 50}
                >
                  -
                </Button>
                <span className="text-xl font-medium w-16 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity(quantity + 50)}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum order quantity: 50 units
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Options</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">
                      Logo Customization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="pointer-events-none">
                      Rs.{logoPrice}
                    </CardDescription>
                    <CardDescription>
                      Add your company logo to the cover or pages
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button variant="outline" className="w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
                      />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">
                      Customize FrontPage Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="pointer-events-none">
                      Rs.{imagePrice}
                    </CardDescription>
                    <CardDescription>
                      Add your Customized Front Page Image
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button variant="outline" className="w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100"
                      />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Notebook Name</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="mb-2">
                      Enter a custom title or name for your notebook
                    </CardDescription>
                    <input
                      type="text"
                      placeholder="e.g. Project Ideas Notebook"
                      value={notebookName}
                      onChange={(e) => setNotebookName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">City</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="mb-2">
                      Enter your City
                    </CardDescription>
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCityName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Street</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="mb-2">
                      Enter your street
                    </CardDescription>
                    <input
                      type="text"
                      placeholder="Street"
                      value={street}
                      onChange={(e) => setStreetName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">ZIP Code</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="mb-2">
                      Enter your ZIP code
                    </CardDescription>
                    <input
                      type="number"
                      placeholder="ZIP CODE"
                      value={zipcode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </CardContent>
                </Card>

                <Button
                  size="lg"
                  className="w-full md:w-auto mt-4"
                  onClick={handleSubmit}
                >
                  Submit Custom Order
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`space-y-6 ${showPreview ? "block" : "hidden md:block"}`}
          >
            <Card className="sticky top-4">
              <CardHeader className="p-4">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={preview}
                    alt="Notebook Preview"
                    className="object-contain rounded-md w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paper Type:</span>
                    <span className="font-medium">
                      {paperTypes.find((t) => t.id === paperType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">
                      {sizes.find((s) => s.id === size)?.name.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ruling:</span>
                    <span className="font-medium">
                      {rulingStyles.find((r) => r.id === ruling)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cover:</span>
                    <span className="font-medium">
                      {coverOptions.find((c) => c.id === cover)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{quantity} units</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Info className="h-4 w-4" />
                    <span>Final pricing will be provided in your quote</span>
                  </div>
                  <div className="mt-4 text-xl font-bold">
                    Total Price: Rs.{totalAmount}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
