const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// Add useRef import
content = content.replace(
    'import { useEffect, useState } from "react"',
    'import { useEffect, useState, useRef } from "react"'
);

// Add ref and handler
content = content.replace(
    'export default function LayoutToggleDemo() {\n  const navigate = useNavigate();',
    `export default function LayoutToggleDemo() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };`
);

// Add ref to container
content = content.replace(
    '<div className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center [&::-webkit-scrollbar]:hidden">',
    '<div ref={scrollContainerRef} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth [&::-webkit-scrollbar]:hidden">'
);

// Replace arrow div with button
content = content.replace(
    '      {/* Mobile scroll indicator fade */}\n      <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent flex items-start justify-end pt-2 sm:hidden">\n        <ChevronRight className="w-5 h-5 text-gray-400 mr-2" />\n      </div>',
    `      {/* Mobile scroll indicator fade */}
      <button 
        onClick={handleScrollRight}
        className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-white via-white/80 to-transparent flex items-start justify-end pt-2 sm:hidden cursor-pointer"
        aria-label="Scroll categories right"
      >
        <ChevronRight className="w-5 h-5 text-gray-500 mr-2 mt-0.5 hover:text-black transition-colors" />
      </button>`
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
