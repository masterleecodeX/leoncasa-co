const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    '      </div>\n      <ContainerToggle className="w-full">',
    `      </div>
      {/* Mobile scroll indicator fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent flex items-start justify-end pt-2 sm:hidden">
        <ChevronRight className="w-5 h-5 text-gray-400 mr-2" />
      </div>
    </div>
    <ContainerToggle className="w-full">`
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
