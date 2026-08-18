import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Hero10, type Hero10Props } from '@/components/ui/hero-10'
import { siteConfig } from '@/config/site'
import { useTranslation } from 'react-i18next'

export default function Hero10Demo() {
  const { t } = useTranslation();
  const CACHE_KEY = "coverflow_cache";
  const [data, setData] = useState<any>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const q = collection(db, "coverflow");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        setData(docData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(docData));
      }
    }, (error) => console.warn("Coverflow listener error:", error.message));
    return () => unsubscribe();
  }, []);

  const images = data?.images && data.images.length === 3 ? data.images : siteConfig.hero.images;

  const values = {
    title: data?.title || t(siteConfig.hero.title),
    titleLine2Prefix: data?.titleLine2Prefix || t(siteConfig.hero.titleLine2Prefix),
    titleHighlight: data?.titleHighlight || t(siteConfig.hero.titleHighlight),
    description: data?.description || t(siteConfig.hero.description),
    socialProof: data?.socialProof || siteConfig.hero.socialProof,
    images: images,
    imageAlts: siteConfig.hero.imageAlts,
    animation: 'subtle',
    primaryCTA: {
      ctaEnabled: true,
      text: data?.ctaText || t(siteConfig.hero.primaryCTA.text),
      link: siteConfig.hero.primaryCTA.link,
      variant: 'default',
      size: 'default',
    },
    secondaryCTA: {
      ctaEnabled: false,
      text: "",
    },
  } satisfies Hero10Props

  return <Hero10 {...values} />
}
