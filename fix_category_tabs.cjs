const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    'className="flex flex-wrap gap-2 mb-8 justify-center"',
    'className="flex overflow-x-auto gap-2 mb-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center [&::-webkit-scrollbar]:hidden"'
);

content = content.replace(
    '"px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",',
    '"px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 whitespace-nowrap",'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
