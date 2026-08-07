"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingActionMenuProps = {
options: {
  label: string;
  onClick: () => void;
  Icon?: React.ReactNode;
}[];
className?: string;
userPhotoUrl?: string | null;
};

const FloatingActionMenu = ({
options,
className,
userPhotoUrl,
}: FloatingActionMenuProps) => {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
  setIsOpen(!isOpen);
};

return (
  <div className={cn("relative", className)}>
    <Button
      onClick={toggleMenu}
      className={cn(
        "w-7 h-7 rounded-full bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_15px_rgba(0,0,0,0.15)] p-0 overflow-hidden flex items-center justify-center text-white border-0"
      )}
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="flex items-center justify-center w-full h-full"
      >
        {isOpen ? (
          <Plus className="w-4 h-4" />
        ) : userPhotoUrl ? (
          <img src={userPhotoUrl} alt="Profile" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </motion.div>
    </Button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10, y: -10, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 10, y: -10, filter: "blur(10px)" }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          className="absolute top-full right-0 mt-2 z-50"
        >
          <div className="flex flex-col items-end gap-2">
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <Button
                  onClick={option.onClick}
                  size="sm"
                  className="flex items-center gap-2 bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm"
                >
                  {option.Icon}
                  <span className="text-white">{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default FloatingActionMenu;
