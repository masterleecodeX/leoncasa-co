const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace('group-hover:scale-105', 'group-hover:scale-[1.02]');
content = content.replace('whileHover={{ y: -5 }}', 'whileHover={{ y: -2 }}');

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
console.log("Hover effects reduced.");
