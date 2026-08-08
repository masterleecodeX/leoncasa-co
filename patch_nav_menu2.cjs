const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  'gap-2 sm:gap-6 px-3 -mx-3 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]',
  'gap-2 sm:gap-6 px-2 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] w-full'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
