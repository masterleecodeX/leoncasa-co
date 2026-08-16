const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// 1. Add showRightArrow state and handleScroll
content = content.replace(
    /const scrollContainerRef = useRef<HTMLDivElement>\(null\);/g,
    `const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);`
);

// 2. Add onScroll to the scroll container
content = content.replace(
    '<div ref={scrollContainerRef} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth hide-scrollbar">',
    '<div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth hide-scrollbar">'
);

// 3. Wrap button in {showRightArrow && (...)}
content = content.replace(
    '      {/* Mobile scroll indicator fade */}\n      <button',
    '      {/* Mobile scroll indicator fade */}\n      {showRightArrow && (<button'
);
content = content.replace(
    '        <ChevronRight className="w-5 h-5 text-gray-500 mr-2 mt-0.5 hover:text-black transition-colors" />\n      </button>',
    '        <ChevronRight className="w-5 h-5 text-gray-500 mr-2 mt-0.5 hover:text-black transition-colors" />\n      </button>)}'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
