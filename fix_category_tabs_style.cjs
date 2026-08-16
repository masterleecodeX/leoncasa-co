const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    '"px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 whitespace-nowrap",',
    '"px-4 py-2 text-base font-light transition-all duration-300 shrink-0 whitespace-nowrap",'
);

content = content.replace(
    /selectedCategory === cat \n\s*\? "bg-slate-900 text-white shadow-md scale-105" \n\s*: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"/g,
    'selectedCategory === cat \n                ? "text-black underline underline-offset-4" \n                : "text-gray-400 hover:text-gray-900"'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
