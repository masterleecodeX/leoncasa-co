const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

content = content.replace(/absolute top-0 left-\[100\%\]/g, 'absolute top-1/2 -translate-y-1/2 left-[100%]');

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
