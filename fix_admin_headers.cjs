const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

content = content.replace(
  /<div className="flex justify-between items-end">/g,
  '<div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">'
);

// Admins tab has a slightly different header, let's fix it too:
content = content.replace(
  /<div className="flex justify-between items-end mb-2">/g,
  '<div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">'
);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log("Fixed Admin headers for mobile.");
