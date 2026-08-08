const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  /className="flex gap-3 justify-center"/g,
  'className="flex gap-2 sm:gap-3 justify-center"'
);

content = content.replace(
  /className="w-\[50px\] h-\[48px\] border border-gray-300 rounded-xl text-center text-xl font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"/g,
  'className="w-10 h-12 sm:w-[50px] sm:h-[48px] border border-gray-300 rounded-xl text-center text-lg sm:text-xl font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
