const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  '<div className="flex items-center gap-6 relative z-50">',
  '<div className="flex items-center gap-2 sm:gap-6 relative z-50 overflow-x-auto no-scrollbar max-w-[calc(100vw-80px)]">'
);

content = content.replace(
  'className="flex items-center justify-center p-1 text-gray-500 hover:text-black transition-colors"',
  'className="flex-shrink-0 flex items-center justify-center p-1 text-gray-500 hover:text-black transition-colors"'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
