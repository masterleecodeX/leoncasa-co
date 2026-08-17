const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    'className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"', 
    'className="w-full h-full object-cover transition-opacity duration-300"'
);

content = content.replace(
    /whileHover={{ y: -2 }}\s*/g,
    ''
);

content = content.replace(
    'className="cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-shadow hover:shadow-md"',
    'className="cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:opacity-75"'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
console.log("Updated hover effect to dim.");
