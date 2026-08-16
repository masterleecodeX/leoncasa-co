const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldNav = `                    <p className="text-white/80 text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Introduction" onClick={handleIntroductionClick}>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="#" title="Installation" onClick={handleInstallationClick}>
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="#" title="Typography" onClick={handleTypographyClick}>
                Styles for headings, paragraphs, lists...etc
              </ListItem>`;

const newNav = `                    <p className="text-white/80 text-sm leading-tight">
                      Discover premium, handcrafted furniture designed to elevate your living spaces.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Our Story" onClick={handleIntroductionClick}>
                Learn about our heritage and passion for crafting timeless furniture.
              </ListItem>
              <ListItem href="#" title="Collections" onClick={handleInstallationClick}>
                Explore our curated selection of modern and classic pieces.
              </ListItem>
              <ListItem href="#" title="Materials" onClick={handleTypographyClick}>
                Discover the premium woods, fabrics, and metals we use.
              </ListItem>`;

content = content.replace(oldNav, newNav);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
console.log("Updated Home descriptions");
