const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  '<span className="font-semibold text-lg tracking-tight md:hidden">ReUI</span>',
  ''
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
