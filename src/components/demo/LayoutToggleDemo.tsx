import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Skeleton } from '@/components/ui/skeleton'

const DEFAULT_PRODUCTS = [
  {
    id: "item-9",
    name: "adidas", imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg", price: 120, category: "chair",
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
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full flex flex-col group">
      <div className="relative w-full aspect-square sm:aspect-[6/7] overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 z-10" />
      </div>
      <Card className="flex-1 flex flex-col border-none rounded-none shadow-none">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold capitalize tracking-tight text-slate-900">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-4 text-xs text-slate-500">
          <p className="line-clamp-2">
            {(product as any).description || "High performance running shoes designed for ultimate comfort and speed. Experience the perfect blend of style and engineering."}
          </p>
          <span 
            onClick={() => navigate('/details', { state: { slide: product } })}
            className="inline-block mt-1 font-medium underline cursor-pointer text-slate-900 hover:text-black transition-colors"
          >
            See more
          </span>
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);
  
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };
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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Living room", "Bedroom", "Dining room", "Kitchen", "Bathroom", "Office", "Outdoor", "Lighting & decoration"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

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
      <div id="collection-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900 border-t border-gray-200 mt-8 md:mt-12 pt-8 md:pt-12">
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
    <div id="collection-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900 border-t border-gray-200 mt-8 md:mt-12 pt-8 md:pt-12">
      <div className="relative mb-8 -mx-4 sm:mx-0">
        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth hide-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2 text-base font-light transition-all duration-300 shrink-0 whitespace-nowrap",
              selectedCategory === cat 
                ? "text-black underline underline-offset-4" 
                : "text-gray-400 hover:text-gray-900"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Mobile scroll indicator fade */}
      {showRightArrow && (<button 
        onClick={handleScrollRight}
        className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-white via-white/80 to-transparent flex items-start justify-end pt-2 sm:hidden cursor-pointer"
        aria-label="Scroll categories right"
      >
        <ChevronRight className="w-5 h-5 text-gray-500 mr-2 mt-0.5 hover:text-black transition-colors" />
      </button>)}
      </div>
      
      <div className="mb-8 px-4 sm:px-0 text-left">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 uppercase transition-all duration-300">
          {selectedCategory === "All" ? "Collection" : selectedCategory}
        </h2>
      </div>

          <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            onClick={() => navigate('/details', { state: { slide: product } })}
            className="cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:brightness-90"
          >
            <GridProductCard product={product} />
          </motion.div>
        ))}      
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
