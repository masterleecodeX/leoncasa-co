"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroFashion({ slide }: { slide?: any }) {
    const detailsTitle = slide?.detailsTitle || "Kokonut.";
    const detailsSeason = slide?.detailsSeason || "SUMMER 2025";
    const detailsDescription = slide?.detailsDescription || `"The Bright Young" draws inspiration from Anglomania, redefining sartorial elegance and school uniforms with a nod to British heritage. Suits of the collection are tailored out of English cloth...`;
    let images = [];
    if (slide?.detailsImages && Array.isArray(slide.detailsImages) && slide.detailsImages.length > 0) {
        images = slide.detailsImages;
    } else {
        images = [
            slide?.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
        ];
        if (slide?.detailsImage2) images.push(slide.detailsImage2);
        if (slide?.detailsImage3) images.push(slide.detailsImage3);
    }
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    
    let listItems = [
        "Ready-to-wear",
        "Accessories",
        "Footwear",
        "Leather goods",
        "Jewelry",
    ];
    if (slide?.detailsList) {
        listItems = slide.detailsList.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
    }

    return (
        <div className="w-full bg-white flex flex-col items-center py-12 md:py-16">
            <div className="w-full max-w-5xl px-6 md:px-8">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center relative overflow-visible">
                                        <div className="md:order-2 relative flex justify-center md:justify-end min-w-0 w-full">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-slate-200 blur-3xl opacity-40 -top-6 -left-6"></div>
                        
                        <div className="relative w-full max-w-[420px] mx-auto md:ml-auto md:mr-0">
                            <div className="relative w-full overflow-hidden rounded-xl shadow-xl aspect-[4/5]">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        draggable={false}
                                        src={images[currentIndex]}
                                        alt={`Fashion detail ${currentIndex + 1}`}
                                        className="pointer-events-none select-none w-full h-full object-cover filter brightness-105 absolute top-0 left-0"
                                    />
                                </AnimatePresence>
                            </div>
                            
                            {images.length > 1 && (
                                <div className="flex items-center justify-between w-full mt-6 px-2">
                                    <button 
                                        onClick={prevImage}
                                        className="text-gray-400 hover:text-black transition-colors p-2 focus:outline-none flex items-center justify-center -ml-2"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-6 h-6" strokeWidth={2} />
                                    </button>
                                    
                                    <div className="flex gap-2 justify-center">
                                        {images.map((_, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setCurrentIndex(idx)}
                                                className={`h-1.5 rounded-full transition-all focus:outline-none ${idx === currentIndex ? 'w-6 bg-black' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <button 
                                        onClick={nextImage}
                                        className="text-gray-400 hover:text-black transition-colors p-2 focus:outline-none flex items-center justify-center -mr-2"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-6 h-6" strokeWidth={2} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:order-1 flex flex-col justify-center h-full py-4 min-w-0 w-full">
                        <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight tracking-tighter mb-8 break-all sm:break-words">
                            {detailsTitle}
                        </h1>
                        <ul className="space-y-3 tracking-tight text-base text-black/80 mb-12">
                            {listItems.map((item, index) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0.8 }}

                                    transition={{
                                        delay: index * 0.1,
                                    }}
                                >
                                    <span className="text-black/80">
                                        {item}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="mt-auto">
                            <h2 className="text-xl font-medium text-black">
                                {detailsSeason}
                            </h2>
                            <p className="text-sm text-black/70 max-w-md pt-3 leading-relaxed tracking-tight break-all sm:break-words">
                                {detailsDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
