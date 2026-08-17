const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldContactBlock = `<ul className="grid w-[calc(100vw-3rem)] sm:w-[300px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">hello@leoncasa.com</div>
                </NavigationMenuLink>
                <div className="relative group block w-full">
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
                </div>
                <NavigationMenuLink render={<a href="tel:+1234567890" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">Call us directly.</div>
                </NavigationMenuLink>
              </li>
            </ul>`;

const newContactBlock = `<ul className="grid w-[calc(100vw-3rem)] sm:w-[300px] gap-4 relative">
              <li>
                <NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">hello@leoncasa.com</div>
                </NavigationMenuLink>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-0 bottom-0 left-[100%] ml-4 w-[300px] bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center pointer-events-none z-[100]">
                    <div className="text-gray-500 text-sm flex flex-col items-center gap-3">
                      <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50/50">
                         <span className="text-xs text-gray-400 font-medium px-4 text-center leading-relaxed">QR Code Placeholder</span>
                      </div>
                    </div>
                  </div>
                </div>
                <NavigationMenuLink render={<a href="tel:+1234567890" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">Call us directly.</div>
                </NavigationMenuLink>
              </li>
            </ul>`;

content = content.replace(oldContactBlock, newContactBlock);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
