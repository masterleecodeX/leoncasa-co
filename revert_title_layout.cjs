const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// Replace top part
content = content.replace(
    `<div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 sm:gap-6">
        <div className="px-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 uppercase transition-all duration-300">
            {selectedCategory === "All" ? "Collection" : selectedCategory}
          </h2>
        </div>
      <div className="relative -mx-4 sm:mx-0 w-full lg:w-auto overflow-hidden">
        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 lg:justify-end scroll-smooth hide-scrollbar">`,
    `<div className="relative mb-8 -mx-4 sm:mx-0">
        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth hide-scrollbar">`
);

// Insert title right before ContainerToggle
content = content.replace(
    '      </button>)}\n      </div>\n    </div>\n    <ContainerToggle className="w-full">',
    `      </button>)}
      </div>
      
      <div className="mb-8 px-4 sm:px-0 text-left">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 uppercase transition-all duration-300">
          {selectedCategory === "All" ? "Collection" : selectedCategory}
        </h2>
      </div>

    <ContainerToggle className="w-full">`
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
