const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

content = content.replace(
  'className="relative w-full md:w-auto md:max-w-[480px] overflow-hidden rounded-xl shadow-xl aspect-[4/5]"',
  'className="relative w-full max-w-[420px] overflow-hidden rounded-xl shadow-xl aspect-[4/5] mx-auto md:ml-auto md:mr-0"'
);

fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
