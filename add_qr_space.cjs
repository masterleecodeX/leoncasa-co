const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldBlock = `<div className="absolute top-0 bottom-0 left-[100%] ml-4 aspect-square bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:block pointer-events-none z-[100]">
                  </div>`;

const newBlock = `<div className="absolute top-0 bottom-0 left-[100%] ml-4 aspect-square bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center p-4 pointer-events-none z-[100]">
                    {/* Replace the src below with your actual QR code image path (e.g. "/qr-code.png") */}
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/1234567890" 
                      alt="WhatsApp QR Code" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>`;

content = content.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
