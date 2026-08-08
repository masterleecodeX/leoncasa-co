const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

content = content.replace(
  '<div className="flex items-center gap-2 md:gap-0">',
  '<div className="flex items-center gap-2 md:gap-0 min-w-0 flex-1">'
);

content = content.replace(
  '<div className="flex items-center gap-2 sm:gap-3">',
  '<div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">'
);

fs.writeFileSync('src/components/layout/Header.tsx', content);
