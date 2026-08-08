const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

content = content.replace(
  '<div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">',
  '<div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 relative z-[60] bg-white sm:bg-transparent">'
);

fs.writeFileSync('src/components/layout/Header.tsx', content);
