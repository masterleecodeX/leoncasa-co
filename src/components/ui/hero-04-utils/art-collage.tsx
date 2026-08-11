import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import ThumbnailCarousel from "@/components/ui/thumbnail-carousel";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt,
  secondaryAlt,
  className
}: {
  primaryImage: string;
  secondaryImage: string;
  primaryAlt?: string;
  secondaryAlt?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={cn("relative aspect-[4/5] w-full max-w-[500px] mx-auto cursor-pointer group", className)}
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute top-0 left-0 z-10 w-[85%] h-[90%] transition-transform duration-500 group-hover:scale-[1.02]">
          <img 
            src={primaryImage} 
            alt={primaryAlt || ""} 
            className="h-full w-full object-cover rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
          />
        </div>
        <div className="absolute bottom-0 right-0 z-20 w-[45%] aspect-square transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
          <img 
            src={secondaryImage} 
            alt={secondaryAlt || ""} 
            className="h-full w-full object-cover rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.2)]" 
          />
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full z-10 pointer-events-none"
              >
                <ThumbnailCarousel />
              </motion.div>
              <button
                onClick={() => setIsOpen(false)}
                className="fixed top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

