const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// Replace the relative container for categories
content = content.replace(
    '<div className="relative mb-8 -mx-4 sm:mx-0">\n        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth hide-scrollbar">',
    `<div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 sm:gap-6">
        <div className="px-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 uppercase transition-all duration-300">
            {selectedCategory === "All" ? "Collection" : selectedCategory}
          </h2>
        </div>
      <div className="relative -mx-4 sm:mx-0 w-full lg:w-auto overflow-hidden">
        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 lg:justify-end scroll-smooth hide-scrollbar">`
);

// We need to fix the closing tags to match the new structure
// The existing code has:
//       </button>)}
//     </div>
//     <ContainerToggle className="w-full">
content = content.replace(
    '      </button>)}\n    </div>\n    <ContainerToggle className="w-full">',
    '      </button>)}\n      </div>\n    </div>\n    <ContainerToggle className="w-full">'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
