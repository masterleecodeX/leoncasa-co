const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  'gap-2 sm:gap-6 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]',
  'gap-2 sm:gap-6 px-1 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)]'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
