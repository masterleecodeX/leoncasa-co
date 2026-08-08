import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Luxury Performance",
    description: "Experience the thrill of precision engineering",
    imageSrc: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Elegant Design",
    description: "Where beauty meets functionality",
    imageSrc: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Future of Mobility",
    description: "Innovation that moves you forward",
    imageSrc: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=900&auto=format&fit=crop",
  },
];

import { useEffect, useState } from "react";

export function CardStackDemoPage() {
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? windowWidth * 0.75 : 520;
  const cardHeight = isMobile ? windowWidth * 0.75 * 0.615 : 320;
  return (
    <div className="w-full mb-32 -mt-[65px]">
      <div className="mx-auto w-full max-w-5xl px-8">
        <CardStack
          items={items}
          initialIndex={0}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          spreadDeg={35}
          autoAdvance={false}
          intervalMs={2000}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}
