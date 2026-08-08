const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  '<div className="grid grid-cols-2 gap-4 mb-4">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">'
);

// Check if any old placeholder labels are lingering
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-16 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-28 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-[140px] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
