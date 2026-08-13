import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ContainerToggle, CellToggle } from "../blocks/animated-toggle-layout-container"
import { Skeleton } from '@/components/ui/skeleton'

const DEFAULT_PRODUCTS = [
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

function GridProductCard({ product }: { product: typeof DEFAULT_PRODUCTS[0] }) {
  return (
    <div className="relative w-full h-full flex flex-col group">
      <div className="relative w-full aspect-square sm:aspect-[6/7] overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-10" />
      </div>
      <Card className="flex-1 flex flex-col border-none rounded-none shadow-none">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold capitalize tracking-tight text-slate-900">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-4 text-xs text-slate-500 line-clamp-2">
          High performance running shoes designed for ultimate comfort and speed. Experience the perfect blend of style and engineering.
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase text-slate-400">Price</span>
            <span className="text-base font-semibold text-slate-900">฿{product.price}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function LayoutToggleDemo() {
  const navigate = useNavigate();
  const CACHE_KEY = "products_grid_cache";
  
  const [products, setProducts] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  });

  const [loading, setLoading] = useState(() => {
    try {
      return localStorage.getItem(CACHE_KEY) ? false : true;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    const q = collection(db, "products")
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as any);
        setProducts(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } else {
        setProducts(DEFAULT_PRODUCTS)
        localStorage.setItem(CACHE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      }
      setLoading(false);
    }, (err) => {
      console.error(err)
      setLoading(false);
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div id="installation-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
              <Skeleton className="w-full aspect-square sm:aspect-[6/7] rounded-none" />
              <div className="p-4 flex flex-col gap-4">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <div className="space-y-3">
                  <Skeleton className="h-3 w-full rounded-md" />
                  <Skeleton className="h-3 w-5/6 rounded-md" />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Skeleton className="h-3 w-12 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="installation-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">
      <ContainerToggle className="w-full">
        {products.map((product) => (
          <CellToggle
            key={product.id}
            onClick={() => navigate('/details')}
            className="cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
          >
            <GridProductCard product={product} />
          </CellToggle>
        ))}
      </ContainerToggle>
    </div>
  )
}
