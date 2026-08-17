const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');
content = content.replace('pointer-events-none z-[100]', 'z-[100]');
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
