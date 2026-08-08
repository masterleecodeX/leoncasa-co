const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

content = content.replace(
  '<div className="md:hidden flex items-center">\n          <button onClick={onHome} className="font-semibold text-lg tracking-tight">ReUI</button>\n        </div>',
  ''
);
// In case the spacing is slightly different
content = content.replace(
  /<div className="md:hidden flex items-center">[\s\S]*?<\/div>/,
  ''
);

fs.writeFileSync('src/components/layout/Header.tsx', content);

let content2 = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');
content2 = content2.replace(
  '<NavigationMenu value={value} onValueChange={setValue} className="hidden md:flex">',
  '<NavigationMenu value={value} onValueChange={setValue}>'
);
fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content2);
