import React from "react";
import { CircularCarouselDemo } from "@/components/ui/circular-carousel-demo";
import { CardStackDemoPage } from "@/components/ui/card-stack-demo";
import { DemoOne } from "@/components/ui/blog-post-card-demo";
import { Header, type HeaderProps } from "@/components/layout/Header";
import { motion } from "motion/react";

export interface DonateViewProps extends HeaderProps {}

export function DonateView(props: DonateViewProps) {
  return (
    <motion.div
      key="donate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main className="min-h-screen w-full bg-[#f4f4f5] flex flex-col">
        <Header {...props} />
        <div className="flex flex-col items-center justify-start relative pb-32 overflow-x-hidden w-full flex-1">
          <CircularCarouselDemo />
          <CardStackDemoPage />
          <DemoOne onViewPost={props.onViewPost} />
        </div>
      </main>
    </motion.div>
  );
}
