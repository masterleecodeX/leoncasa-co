const fs = require('fs');
let content = fs.readFileSync('src/components/ui/hero-10.tsx', 'utf8');

content = content.replace(
  "{ width: 'w-[42%]', layout: 'z-20', rotate: 0, x: 0, ty: -8 },",
  "{ width: 'w-[42%]', layout: 'z-20', rotate: 0, x: 0, ty: 12 },"
);

fs.writeFileSync('src/components/ui/hero-10.tsx', content);
