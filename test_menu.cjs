const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldWhatsApp = `<NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-muted-foreground">Message us on WhatsApp.</div>
                </NavigationMenuLink>`;

const newWhatsApp = `<div className="relative group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-6 w-[300px] h-[300px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 hidden sm:block z-[9999]">
                  </div>
                </div>`;

content = content.replace(oldWhatsApp, newWhatsApp);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
