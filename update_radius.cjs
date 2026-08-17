const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');
content = content.replace('aspect-square bg-white rounded-xl shadow-xl', 'aspect-square bg-white rounded-lg shadow-xl');
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
