import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ContainerToggle, CellToggle } from "../blocks/animated-toggle-layout-container"
import { useCurrency } from "@/hooks/useCurrency"
import { useTranslation } from "react-i18next";

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};

function GridProductCard({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-full flex flex-col group">
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-100">
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
          {t("High performance running shoes designed for ultimate comfort and speed. Experience the perfect blend of style and engineering.")}
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase text-slate-400">{t("Price")}</span>
            <span className="text-base font-semibold text-slate-900">{formatPrice(product.price)}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function LayoutToggleDemo() {
  const { t } = useTranslation();
  const CACHE_KEY = "products_grid_cache";
  
  const [products, setProducts] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
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
        setProducts([])
        localStorage.setItem(CACHE_KEY, JSON.stringify([]));
      }
      setLoading(false)
    }, (err) => {
      console.error(err)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 h-[400px] flex flex-col items-center justify-center gap-4 text-slate-900">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500 font-medium">{t("Loading products...")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">
      <ContainerToggle className="w-full">
        {products.map((product) => (
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
