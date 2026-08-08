const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">',
  '<div className="flex flex-col gap-3 mb-8">'
);

content = content.replace(
  'className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[15px] font-normal text-black"',
  'className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[15px] font-medium text-black"'
);

content = content.replace(
  'className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[15px] font-normal text-black"',
  'className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[15px] font-medium text-black"'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
