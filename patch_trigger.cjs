const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-1.tsx', 'utf8');

content = content.replace(
  'rounded-md bg-transparent px-4 py-2 text-sm',
  'rounded-md bg-transparent px-2 sm:px-4 py-2 text-sm'
);

fs.writeFileSync('src/components/ui/navigation-menu-1.tsx', content);
