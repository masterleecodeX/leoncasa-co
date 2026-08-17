const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-1.tsx', 'utf8');
content = content.replace("relative h-full w-full overflow-hidden", "relative h-full w-full overflow-visible");
fs.writeFileSync('src/components/ui/navigation-menu-1.tsx', content);
