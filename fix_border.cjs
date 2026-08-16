const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    '<div id="installation-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">',
    '<div id="installation-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900 border-t border-gray-200 mt-8 md:mt-12 pt-8 md:pt-12">'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
