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
    }, (err) => {
      console.error(err);
    });

    return () => unsubscribe();
  }, []);

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
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: t('Start your gallery'),
      link: '/details',
      variant: 'default',
      size: 'default',
    },
    secondaryCTA: {
      ctaEnabled: true,
      text: t('See examples'),
      link: '/details',
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
