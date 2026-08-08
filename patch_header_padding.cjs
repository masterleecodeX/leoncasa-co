const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

// Ensure we have a gap between the menu and the auth buttons
content = content.replace(
  '<div className="flex items-center gap-2 md:gap-0 min-w-0 flex-1">',
  '<div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1 pr-2">'
);

fs.writeFileSync('src/components/layout/Header.tsx', content);
