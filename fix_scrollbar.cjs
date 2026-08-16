const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    'className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth [&::-webkit-scrollbar]:hidden"',
    'className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
