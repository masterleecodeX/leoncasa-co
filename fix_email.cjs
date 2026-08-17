const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');
content = content.replace('<NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" />}>', '<NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" target="_top" />}>');
fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
