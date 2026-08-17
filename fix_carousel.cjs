const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

content = content.replace(
  '"use client";\n\nimport { motion } from "motion/react";',
  '"use client";\n\nimport { useState } from "react";\nimport { motion, AnimatePresence } from "motion/react";\nimport { ChevronLeft, ChevronRight } from "lucide-react";'
);

// If the first replace didn't work (due to spacing), try more flexible regex:
if (!content.includes('useState')) {
    content = content.replace(
      /import { motion } from "motion\/react";/g,
      'import { useState } from "react";\nimport { motion, AnimatePresence } from "motion/react";\nimport { ChevronLeft, ChevronRight } from "lucide-react";'
    );
}


// Replace the detailsImage extraction
content = content.replace(
  /const detailsImage = slide\?.detailsImage \|\| "https:\/\/ferf1mheo22r9ira\.public\.blob\.vercel-storage\.com\/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K\.jpeg";/g,
  `const images = [
        slide?.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
    ];
    if (slide?.detailsImage2) images.push(slide.detailsImage2);
    if (slide?.detailsImage3) images.push(slide.detailsImage3);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);`
);

// Replace the image block
const oldGrid = `<div className="flex gap-4 overflow-x-auto hide-scrollbar w-full snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-2 md:gap-4 md:w-auto md:max-w-[480px]">
                            <img draggable={false}
                                src={detailsImage}
                                alt="Fashion detail 1"
                                className={\`pointer-events-none select-none rounded-xl shadow-xl w-[85%] shrink-0 snap-center aspect-[4/5] object-cover filter brightness-105 sm:w-full md:w-full md:col-span-\${(slide?.detailsImage2 || slide?.detailsImage3) ? '2' : '2'}\`}
                            />
                            {slide?.detailsImage2 && (
                                <img draggable={false}
                                    src={slide.detailsImage2}
                                    alt="Fashion detail 2"
                                    className="pointer-events-none select-none rounded-xl shadow-xl w-[85%] shrink-0 snap-center aspect-[4/5] object-cover filter brightness-105 sm:w-full md:w-full md:col-span-1"
                                />
                            )}
                            {slide?.detailsImage3 && (
                                <img draggable={false}
                                    src={slide.detailsImage3}
                                    alt="Fashion detail 3"
                                    className="pointer-events-none select-none rounded-xl shadow-xl w-[85%] shrink-0 snap-center aspect-[4/5] object-cover filter brightness-105 sm:w-full md:w-full md:col-span-1"
                                />
                            )}
                        </div>`;

const newCarousel = `<div className="relative w-full md:w-auto md:max-w-[480px] overflow-hidden rounded-xl shadow-xl aspect-[4/5]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    draggable={false}
                                    src={images[currentIndex]}
                                    alt={\`Fashion detail \${currentIndex + 1}\`}
                                    className="pointer-events-none select-none w-full h-full object-cover filter brightness-105 absolute top-0 left-0"
                                />
                            </AnimatePresence>
                            
                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-black rounded-full shadow-lg backdrop-blur-md transition-all border border-black/5"
                                    >
                                        <ChevronLeft className="w-5 h-5 ml-[-2px]" />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-black rounded-full shadow-lg backdrop-blur-md transition-all border border-black/5"
                                    >
                                        <ChevronRight className="w-5 h-5 mr-[-2px]" />
                                    </button>
                                    
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm">
                                        {images.map((_, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setCurrentIndex(idx)}
                                                className={\`h-1.5 rounded-full transition-all \${idx === currentIndex ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/60 hover:bg-white/80'}\`}
                                                aria-label={\`Go to slide \${idx + 1}\`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>`;

content = content.replace(oldGrid, newCarousel);

fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
console.log("Updated HeroFashion to use a carousel.");
