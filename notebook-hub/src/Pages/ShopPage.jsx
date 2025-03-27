import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Components/ui/card"
import axios from "axios"
import { useEffect } from "react"
const categories = ["All Products", "Hardcover", "Softcover", "Spiral Bound", "Leather Bound", "Eco-Friendly"]

const products = [
  {
    id: 1,
    name: "Classic Hardcover Notebook",
    description: "Premium quality hardcover notebook with 200 pages",
    price: 19.99,
    minOrder: 50,
    category: "Hardcover",
  },
  {
    id: 2,
    name: "Softcover Journal",
    description: "Flexible softcover notebook with 150 pages",
    price: 14.99,
    minOrder: 100,
    category: "Softcover",
  },
  {
    id: 3,
    name: "Spiral Bound Notebook",
    description: "Durable spiral bound notebook with 120 pages",
    price: 12.99,
    minOrder: 75,
    category: "Spiral Bound",
  },
  {
    id: 4,
    name: "Premium Leather Journal",
    description: "Luxury leather bound notebook with 180 pages",
    price: 29.99,
    minOrder: 25,
    category: "Leather Bound",
  },
  {
    id: 5,
    name: "Recycled Paper Notebook",
    description: "Eco-friendly notebook with 100 recycled pages",
    price: 16.99,
    minOrder: 50,
    category: "Eco-Friendly",
  },
  {
    id: 6,
    name: "Pocket Notebook",
    description: "Compact hardcover notebook with 80 pages",
    price: 9.99,
    minOrder: 100,
    category: "Hardcover",
  },
  {
    id: 7,
    name: "Executive Journal",
    description: "Professional leather notebook with 200 pages",
    price: 34.99,
    minOrder: 20,
    category: "Leather Bound",
  },
  {
    id: 8,
    name: "Bamboo Cover Notebook",
    description: "Sustainable bamboo cover with 120 recycled pages",
    price: 22.99,
    minOrder: 40,
    category: "Eco-Friendly",
  },
]

export default function ShopPage() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:9092/user/get-all-notebooks");
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen flex-col">

      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shop Notebooks</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <div className="hidden md:block space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    {category}
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
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                  Less than 50
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                  50 - 100
                </Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                  More than 100
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-square relative">
                    <img
                      src={`/placeholder.svg?height=300&width=300&text=${product.name.replace(/\s+/g, "+")}`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Min. Order: {product.minOrder} units</div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

