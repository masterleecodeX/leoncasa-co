const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  'overflow-x-auto no-scrollbar max-w-[calc(100vw-80px)]',
  'overflow-x-auto no-scrollbar'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
