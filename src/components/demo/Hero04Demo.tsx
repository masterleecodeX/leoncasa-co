import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Hero04, type Hero04Props } from '@/components/ui/hero-04'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Hero04Demo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const CACHE_KEY = "hero_gallery_cache";
  
  const [slides, setSlides] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : [
        {
          badge: "LeonCasa & Co.",
          title: "The grass farm its your art",
          description: "",
          price: "2024",
          material: "Metal+Glass",
          dimensions: "120x50",
          imageSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80",
          imageAlt: "Interior",
        }
      ];
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
    const q = collection(db, "hero_gallery");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as any);
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
      <div className="w-full bg-white flex flex-col items-center justify-center p-8 lg:p-16 min-h-[600px]">
        <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          <div className="flex-1 w-full space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-[100px] md:h-[160px] w-full max-w-2xl rounded-2xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-10">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none ml-auto">
            <Skeleton className="w-full aspect-[4/5] rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  // Ensure index is within bounds
  const activeIndex = currentIndex >= slides.length ? 0 : currentIndex;
  const currentSlide = slides[activeIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideProps = {
    ...currentSlide,
    slideData: currentSlide,
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: t('See more'),
      onClick: () => navigate('/details', { state: { slide: currentSlide } }),
      variant: 'default',
      size: 'default',
    },
    secondaryCTA: {
      ctaEnabled: false,
    }
  } as Hero04Props;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        <Hero04 {...slideProps} onNext={handleNext} onPrev={handlePrev} />
      </motion.div>
    </AnimatePresence>
  );
}
