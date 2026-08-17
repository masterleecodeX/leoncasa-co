const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldBlock = `<div className="absolute top-0 bottom-0 left-[100%] ml-4 w-[300px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center z-[100]">
                    <div className="text-gray-500 text-sm flex flex-col items-center gap-3">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50/50">
                         <span className="text-xs text-gray-400 font-medium px-4 text-center leading-relaxed">QR Code Placeholder</span>
                      </div>
                    </div>
                  </div>`;

const newBlock = `<div className="absolute top-0 left-[100%] ml-4 w-[300px] h-[300px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:block pointer-events-none z-[100]">
                  </div>`;

content = content.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
