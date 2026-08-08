const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  '<h1 className="text-4xl font-medium text-center mb-10 tracking-tight text-black">',
  '<h1 className="text-4xl sm:text-[44px] font-semibold text-center mb-10 tracking-tight text-black">'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
