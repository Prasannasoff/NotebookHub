import { useState } from "react"
import { Check, Info } from "lucide-react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Components/ui/card"
const paperTypes = [
  { id: "standard", name: "Standard (80 gsm)", description: "Smooth, white paper suitable for most uses" },
  { id: "premium", name: "Premium (100 gsm)", description: "Thicker paper with minimal bleed-through" },
  { id: "recycled", name: "Recycled (90 gsm)", description: "Eco-friendly option with slight texture" },
]

const sizes = [
  { id: "a5", name: "A5 (148 × 210 mm)", description: "Compact size, perfect for everyday use" },
  { id: "a4", name: "A4 (210 × 297 mm)", description: "Standard letter size for detailed notes" },
  { id: "b5", name: "B5 (176 × 250 mm)", description: "Medium size, balances portability and writing space" },
]

const rulingStyles = [
  { id: "lined", name: "Lined", description: "Classic horizontal lines" },
  { id: "grid", name: "Grid", description: "Evenly spaced grid pattern" },
  { id: "dot", name: "Dot Grid", description: "Subtle dot pattern for flexibility" },
  { id: "blank", name: "Blank", description: "Clean pages with no ruling" },
]

const coverOptions = [
  { id: "hardcover", name: "Hardcover", description: "Durable, rigid cover for maximum protection" },
  { id: "softcover", name: "Softcover", description: "Flexible, lightweight cover" },
  { id: "leather", name: "Leather", description: "Premium genuine leather cover" },
  { id: "eco", name: "Eco-Friendly", description: "Sustainable materials like recycled cardboard or cork" },
]

export default function CustomOrderPage() {
  const [paperType, setPaperType] = useState(paperTypes[0].id)
  const [size, setSize] = useState(sizes[0].id)
  const [ruling, setRuling] = useState(rulingStyles[0].id)
  const [cover, setCover] = useState(coverOptions[0].id)
  const [quantity, setQuantity] = useState(50)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
    
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div>
            <h1 className="text-3xl font-bold">Custom Orders</h1>
            <p className="text-muted-foreground">Design your perfect notebook with our customization options</p>
          </div>
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="self-start">
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            {/* Paper Type */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Paper Type</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {paperTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:border-primary ${paperType === type.id ? "border-2 border-primary" : ""}`}
                    onClick={() => setPaperType(type.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {type.name}
                        {paperType === type.id && <Check className="h-5 w-5 text-primary" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription>{type.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Size</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {sizes.map((sizeOption) => (
                  <Card
                    key={sizeOption.id}
                    className={`cursor-pointer transition-all hover:border-primary ${size === sizeOption.id ? "border-2 border-primary" : ""}`}
                    onClick={() => setSize(sizeOption.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {sizeOption.name}
                        {size === sizeOption.id && <Check className="h-5 w-5 text-primary" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription>{sizeOption.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ruling Style */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ruling Style</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {rulingStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all hover:border-primary ${ruling === style.id ? "border-2 border-primary" : ""}`}
                    onClick={() => setRuling(style.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {style.name}
                        {ruling === style.id && <Check className="h-5 w-5 text-primary" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription>{style.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cover Design */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Cover Design</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {coverOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:border-primary ${cover === option.id ? "border-2 border-primary" : ""}`}
                    onClick={() => setCover(option.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {option.name}
                        {cover === option.id && <Check className="h-5 w-5 text-primary" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription>{option.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quantity */}
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
                <span className="text-xl font-medium w-16 text-center">{quantity}</span>
                <Button variant="outline" onClick={() => setQuantity(quantity + 50)}>
                  +
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Minimum order quantity: 50 units</p>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Options</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Logo Customization</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription>Add your company logo to the cover or pages</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button variant="outline" className="w-full">
                      Add Logo
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Custom Page Headers</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription>Add custom headers or footers to each page</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button variant="outline" className="w-full">
                      Customize
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto">
              Request Quote
            </Button>
          </div>

          {/* Preview/Summary */}
          <div className={`space-y-6 ${showPreview ? "block" : "hidden md:block"}`}>
            <Card className="sticky top-4">
              <CardHeader className="p-4">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=Notebook+Preview"
                    alt="Notebook Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paper Type:</span>
                    <span className="font-medium">{paperTypes.find((t) => t.id === paperType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{sizes.find((s) => s.id === size)?.name.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ruling:</span>
                    <span className="font-medium">{rulingStyles.find((r) => r.id === ruling)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cover:</span>
                    <span className="font-medium">{coverOptions.find((c) => c.id === cover)?.name}</span>
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
                  <Button className="w-full">Request Quote</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

