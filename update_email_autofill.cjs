const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

content = content.replace(
  '<NavigationMenuLink render={<a href="mailto:hello@leoncasa.com" target="_top" />}>',
  '<NavigationMenuLink render={<a href="mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=Hello%20LeonCasa%20Team,%0A%0A" target="_blank" rel="noopener noreferrer" />}>'
);

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
