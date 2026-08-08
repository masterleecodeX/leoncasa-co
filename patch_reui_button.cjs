const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  'className="flex-shrink-0 flex items-center justify-center gap-1 p-1 pr-2 text-gray-800 hover:text-black transition-colors"',
  'className="flex-shrink-0 flex items-center justify-center p-1 text-gray-500 hover:text-black transition-colors"'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
