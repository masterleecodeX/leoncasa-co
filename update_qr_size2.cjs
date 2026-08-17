const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

content = content.replace(/w-\[210px\] h-\[210px\]/g, 'w-[180px] h-[180px]');

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
