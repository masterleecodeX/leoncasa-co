const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

content = content.replace(
  '<NavigationMenu value={value} onValueChange={setValue}>',
  '<NavigationMenu value={value} onValueChange={setValue} className="hidden md:flex">'
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
