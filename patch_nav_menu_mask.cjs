const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  '[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]',
  '[mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]'
);

// Also remove `px-2` or `px-3` and add padding to make space for the fade
content = content.replace(
  'gap-2 sm:gap-6 px-2 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)] w-full',
  'gap-2 sm:gap-6 px-4 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)] w-full'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
