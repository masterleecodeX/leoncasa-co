const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

content = content.replace(
  '<div className="flex gap-4 overflow-x-auto pb-2">',
  '<div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">'
);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log("Fixed images scrollbar visibility.");
