const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  '<div className="w-full max-w-[480px] mx-auto">',
  '<div className="w-full max-w-[480px] mx-auto pt-12 md:pt-0">'
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
