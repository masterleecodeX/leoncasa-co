import React from 'react';
import { CircularCarouselDemo } from '@/components/ui/circular-carousel-demo';
import { CardStackDemoPage } from '@/components/ui/card-stack-demo';
import { Header, type HeaderProps } from '@/components/layout/Header';
import { motion } from 'motion/react';

export interface DonateViewProps extends HeaderProps {}

export function DonateView(props: DonateViewProps) {
  return (
    <motion.div key="donate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <main className="min-h-screen w-full bg-[#f4f4f5] flex flex-col items-center justify-start relative pt-4 pb-32 overflow-x-hidden">
        <Header 
          {...props} 
          className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center mb-0 relative z-50"
        />
        <CircularCarouselDemo />
        <CardStackDemoPage />
      </main>
    </motion.div>
  );
}
