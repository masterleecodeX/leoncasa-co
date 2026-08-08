const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  'className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 relative overflow-y-auto"',
  'className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-y-auto"'
);

content = content.replace(
  'className="md:hidden absolute top-8 left-8 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"',
  'className="md:hidden absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors z-20"'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
