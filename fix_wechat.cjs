const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldBlock = `              <li>
                <NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">hello@leoncasa.com</div>
                </NavigationMenuLink>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-0 bottom-0 left-[100%] ml-4 aspect-square bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center p-1 pointer-events-none z-[100]">
                    {/* Replace the src below with your actual QR code image path (e.g. "/qr-code.png") */}
                    <img 
                      src="https://img.sanishtech.com/u/a66b30e39d5501350f456997f10f48c1.jpg" 
                      alt="WhatsApp QR Code" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <NavigationMenuLink render={<a href="tel:+1234567890" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">Call us directly.</div>
                </NavigationMenuLink>
              </li>`;

const newBlock = `              <li>
                <NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">hello@leoncasa.com</div>
                </NavigationMenuLink>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-0 bottom-0 left-[100%] ml-4 aspect-square bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center p-1 pointer-events-none z-[100]">
                    {/* Replace the src below with your actual QR code image path (e.g. "/qr-code.png") */}
                    <img 
                      src="https://img.sanishtech.com/u/a66b30e39d5501350f456997f10f48c1.jpg" 
                      alt="WhatsApp QR Code" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="#" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WeChat</div>
                    <div className="text-muted-foreground">Connect with us on WeChat.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-0 bottom-0 left-[100%] ml-4 aspect-square bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center p-1 pointer-events-none z-[100]">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WeChatPlaceholder" 
                      alt="WeChat QR Code" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <NavigationMenuLink render={<a href="tel:0952595058" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">095 259 5058</div>
                </NavigationMenuLink>
              </li>`;

content = content.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
