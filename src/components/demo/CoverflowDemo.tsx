import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CoverflowCarousel } from "../ui/coverflow-carousel";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";


 
export default function CoverflowDemo() {
  const { t } = useTranslation();
  const CACHE_KEY = "coverflow_slides_cache";
  
  const [slides, setSlides] = useState<any[]>(() => {
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
    const q = collection(db, "coverflow");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => doc.data() as any);
        setSlides(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } else {
        setSlides([]);
        localStorage.setItem(CACHE_KEY, JSON.stringify([]));
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full overflow-hidden bg-white py-12 mb-12 h-[600px] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500 font-medium">{t("Loading gallery...")}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white py-12 mb-12">
      <CoverflowCarousel slides={slides} showCaption showNavigation />
    </div>
  );
}
