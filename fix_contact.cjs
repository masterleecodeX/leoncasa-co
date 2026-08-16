const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

const oldList = `              <li>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Components</div>
                  <div className="text-muted-foreground">Browse all components in the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Documentation</div>
                  <div className="text-muted-foreground">Learn how to use the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Blog</div>
                  <div className="text-muted-foreground">Read our latest blog posts.</div>
                </NavigationMenuLink>
              </li>`;

const newList = `              <li>
                <NavigationMenuLink render={<a href="mailto:contact@example.com" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">Send us an email.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-muted-foreground">Message us on WhatsApp.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="tel:+1234567890" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">Call us directly.</div>
                </NavigationMenuLink>
              </li>`;

content = content.replace(oldList, newList);
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
console.log("Contact list replaced successfully.");
