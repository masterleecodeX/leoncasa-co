import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Hero04, type Hero04Props } from '@/components/ui/hero-04'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'

export default function Hero04Demo() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const CACHE_KEY = "hero_gallery_cache";
  
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
      <div className="w-full bg-white py-20 min-h-[600px] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500 font-medium">Loading gallery...</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full bg-white py-20 min-h-[600px] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500 font-medium">No slides found. Add them in the admin menu.</p>
      </div>
    );
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
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: t('Start your gallery'),
      link: '#',
      variant: 'default',
      size: 'default',
    },
    secondaryCTA: {
      ctaEnabled: true,
      text: t('See examples'),
      link: '#',
      variant: 'link',
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
