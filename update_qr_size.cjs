const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

content = content.replace(/absolute top-0 bottom-0 left-\[100\%\] ml-4 aspect-square/g, 'absolute top-0 left-[100%] ml-4 w-[210px] h-[210px]');

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
