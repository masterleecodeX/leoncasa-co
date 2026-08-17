const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldWhatsAppBlock = `<div className="relative group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-6 w-[300px] h-[300px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 hidden sm:block z-[9999]">
                  </div>
                </div>`;

const newWhatsAppBlock = `<div className="relative group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-4 w-[300px] h-[300px] bg-white rounded-xl shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center pointer-events-none z-[100]">
                    <div className="text-muted-foreground text-sm flex flex-col items-center gap-4">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                         <span className="text-xs text-gray-400 font-medium">QR Code</span>
                      </div>
                      <p>Scan to chat</p>
                    </div>
                  </div>
                </div>`;

content = content.replace(oldWhatsAppBlock, newWhatsAppBlock);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
