const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  'overflow-x-auto no-scrollbar',
  'overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
