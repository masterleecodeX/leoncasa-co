const fs = require('fs');
let content = fs.readFileSync('src/components/ui/hero-10.tsx', 'utf8');

content = content.replace(
  "className={cn('mx-auto w-full mt-4 md:mt-12', vs.fan)}",
  "className={cn('mx-auto w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24', vs.fan)}"
);

fs.writeFileSync('src/components/ui/hero-10.tsx', content);
