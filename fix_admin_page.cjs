const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// Fix Tabs
content = content.replace(
  '<div className="inline-flex bg-gray-100/80 p-1 rounded-xl shadow-inner border border-gray-200/60">',
  '<div className="flex overflow-x-auto no-scrollbar bg-gray-100/80 p-1 rounded-xl shadow-inner border border-gray-200/60 w-full md:w-auto">'
);
content = content.replace(
  /className={`px-5 py-2 text-sm font-medium rounded-lg transition-all \${activeTab === '([^']+)' \? 'bg-white text-black shadow-sm border border-gray-200\/50' : 'text-gray-500 hover:text-gray-900'}`}/g,
  'className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === \'$1\' ? \'bg-white text-black shadow-sm border border-gray-200/50\' : \'text-gray-500 hover:text-gray-900\'}`}'
);


// Fix AdminHeroSlideCard Action Buttons
content = content.replace(
  '<div className="sm:ml-auto shrink-0 flex flex-col gap-2 self-start">',
  '<div className="sm:ml-auto shrink-0 flex flex-row sm:flex-col justify-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">'
);

// Fix AdminProductCard Action Buttons
content = content.replace(
  '<div className="shrink-0 flex flex-col gap-2 self-start">',
  '<div className="shrink-0 flex flex-row sm:flex-col justify-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">'
);

// Add custom style for hiding scrollbar if not present
if (!content.includes('::-webkit-scrollbar')) {
  // We can just rely on standard tailwind or add a custom utility. 
  // For now let's just make it overflow-x-auto
}

fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log("Fixed mobile layout for AdminPage.");
