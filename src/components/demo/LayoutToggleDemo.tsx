import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ContainerToggle, CellToggle } from "../blocks/animated-toggle-layout-container"

const PRODUCTS = [
  {
    id: "item-9",
    name: "adidas",
    imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg",
    price: 120,
  },
  {
    id: "item-8",
    name: "nike",
    imageUrl: "https://m.media-amazon.com/images/I/81YBp7gNeHL._AC_SX695_.jpg",
    price: 120,
  },
  {
    id: "item-4",
    name: "brooks",
    imageUrl: "https://m.media-amazon.com/images/I/81s8buboliL._AC_SY695_.jpg",
    price: 95,
  },
  {
    id: "item-2",
    name: "nike",
    imageUrl: "https://m.media-amazon.com/images/I/81hPhqRGDIL._AC_SX695_.jpg",
    price: 79.95,
  },
  {
    id: "item-5",
    name: "salomon",
    imageUrl: "https://m.media-amazon.com/images/I/71NRA5y7qIL._AC_SX695_.jpg",
    price: 89.99,
  },
  {
    id: "item-7",
    name: "brooks",
    imageUrl: "https://m.media-amazon.com/images/I/81gwJjH+E9L._AC_SY695_.jpg",
    price: 88,
  },
  {
    id: "item-1",
    name: "nike",
    imageUrl: "https://m.media-amazon.com/images/I/81IaVB-vw7L._AC_SX695_.jpg",
    price: 199.99,
  },
  {
    id: "item-6",
    name: "new balance",
    imageUrl: "https://m.media-amazon.com/images/I/61LGqMZ5UXL._AC_SY695_.jpg",
    price: 70,
  },
  {
    id: "item-3",
    name: "under armour",
    imageUrl: "https://m.media-amazon.com/images/I/61P3L82SruL._AC_SY695_.jpg",
    price: 85.99,
  },
]

function GridProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <div className="relative w-full h-full flex flex-col group">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] flex justify-center items-center bg-gradient-to-r from-neutral-100 to-stone-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mx-auto h-auto max-h-[85%] max-w-[85%] mix-blend-multiply object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-10" />
      </div>
      <Card className="flex-1 flex flex-col border-none rounded-none shadow-none">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold capitalize tracking-tight text-slate-900">
            {product.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">Running</Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">Performance</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-4 text-xs text-slate-500 line-clamp-2">
          High performance running shoes designed for ultimate comfort and speed. Experience the perfect blend of style and engineering.
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase text-slate-400">Price</span>
            <span className="text-base font-semibold text-slate-900">${product.price}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function LayoutToggleDemo() {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">
      <ContainerToggle className="w-full">
        {PRODUCTS.map((product) => (
          <CellToggle
            key={product.id}
            className="cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
          >
            <GridProductCard product={product} />
          </CellToggle>
        ))}
      </ContainerToggle>
    </div>
  )
}
