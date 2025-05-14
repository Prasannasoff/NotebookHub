import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { baseURL } from "../api";
import axios from "axios";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import image from "../assets/notebook.png";
import NoteModel from "../Components/ui/Model/NoteModel";
const paperTypeCategories = ["All Products", "80 GSM", "100 GSM", "90 GSM"];
const sizeCategories = ["All Products", "A5", "A4", "B5"];
const coverDesignCategories = [
  "All Products",
  "Spiral",
  "Hardcover",
  "Leather",
  "Eco-Friendly",
];

const rulingStylesCategories = [
  "All Products",
  "Lined",
  "Grid",
  "Dot Grid",
  "Blank",
];

import { Badge } from "../Components/ui/Badge";
import { useUser } from "../Context/UserContext"; // wherever your context is
export default function ShopPage() {
  const [noteBookDetails, setNoteDookDetails] = useState([]);
  const [ModelOpen, setModelOpen] = useState(false);
  const [ProductItem, setProductItem] = useState();
  const [selectedCover, setSelectedCover] = useState("All Products");
  const [selectedRuling, setSelectedRuling] = useState("All Products");
  const [selectedSize, setSelectedSize] = useState("All Products");
  const [selectedPaperType, setSelectedPaperType] = useState("All Products");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { userDetails } = useUser();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:9092/user/get-all-notebooks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setNoteDookDetails(response.data);
    };
    fetchData();
  }, []);
  const filteredProducts = noteBookDetails.filter((product) => {
    const matchesCover =
      selectedCover === "All Products" ||
      product.cover?.toLowerCase() === selectedCover.toLowerCase();

    const matchesRuling =
      selectedRuling === "All Products" ||
      product.ruling?.toLowerCase() === selectedRuling.toLowerCase();

    const matchesSize =
      selectedSize === "All Products" ||
      product.size?.toLowerCase() === selectedSize.toLowerCase();

    const matchesPaperType =
      selectedPaperType === "All Products" ||
      product.paperType?.toLowerCase() === selectedPaperType.toLowerCase();

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return (
      matchesCover &&
      matchesRuling &&
      matchesSize &&
      matchesPaperType &&
      matchesPrice
    );
  });
  const handleBooking = (product) => {
    console.log(userDetails);
    setModelOpen(true);
    setProductItem(product);
  };
  return (
    <div className="flex min-h-screen flex-col">
      {ModelOpen && (
        <NoteModel
          productData={ProductItem}
          isOpen={ModelOpen}
          setModelOpen={setModelOpen}
          userDetails={userDetails}
        />
      )}
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shop Notebooks</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <div className="hidden md:block space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <h4 className="text-lg font-semibold">Cover type</h4>

              <div className="space-y-2">
                {coverDesignCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCover === category ? "default" : "ghost"}
                    onClick={() => setSelectedCover(category)}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    {category}
                  </Button>
                ))}
                <h4 className="text-lg font-semibold">Size Category</h4>

                {sizeCategories.map((ruling) => (
                  <Button
                    key={ruling}
                    variant={selectedSize === ruling ? "default" : "ghost"}
                    onClick={() => setSelectedSize(ruling)}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    {ruling}
                  </Button>
                ))}
                <h4 className="text-lg font-semibold">Paper Type</h4>

                {paperTypeCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedPaperType === category ? "default" : "ghost"
                    }
                    onClick={() => setSelectedPaperType(category)}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    {category}
                  </Button>
                ))}
                <h4 className="text-lg font-semibold">Ruling Style</h4>
                {rulingStylesCategories.map((ruling) => (
                  <Button
                    key={ruling}
                    variant={selectedRuling === ruling ? "default" : "ghost"}
                    onClick={() => setSelectedRuling(ruling)}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    {ruling}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">$0</span>
                  <span className="text-sm">$50</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-full w-1/2 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Minimum Order</h3>
              <Button
                variant="ghost"
                onClick={() => setPriceRange([0, 50])}
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                Less than 50
              </Button>
              <Button
                variant="ghost"
                onClick={() => setPriceRange([50, 100])}
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                50 - 100
              </Button>
              <Button
                variant="ghost"
                onClick={() => setPriceRange([100, 10000])} // or any upper limit
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                More than 100
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="relative overflow-hidden transition-all hover:shadow-lg max-w-[400px]"
                >
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-300 hover:bg-amber-400 text-black font-medium px-3 py-1">
                      New
                    </Badge>
                  </div>
                  <div className="flex h-[270px] items-center justify-center bg-gray-200 ">
                    <img
                      src={`data:image/jpeg;base64,${product.noteImage}`}
                      alt={product.name}
                      className="h-full object-cover"
                    />
                  </div>

                  <CardHeader className="pt-5 pb-2 px-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {product.note_name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          High-quality premium notebook for everyday use
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Pages:</span>
                      <span className="font-medium">{product.pages} pages</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">{product.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rule:</span>
                      <span className="font-medium">{product.ruling}</span>
                    </div>
                  </CardContent>
                  <div className="p-4 flex flex-col space-y-3 items-center justify-center">
                    <Button
                      className="min-w-60 bg-amber-300"
                      onClick={() => handleBooking(product)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-gray-700" />
                        Add to Cart
                      </div>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
