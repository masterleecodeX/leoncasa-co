const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

content = content.replace('justify-center p-4 pointer-events-none', 'justify-center p-1 pointer-events-none');

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
