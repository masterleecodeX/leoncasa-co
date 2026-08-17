const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    'hover:brightness-[0.97]',
    'hover:brightness-90'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
console.log("Updated hover effect to brightness-90");
