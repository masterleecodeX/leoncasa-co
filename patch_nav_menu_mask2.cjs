const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  '[mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]',
  '[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
