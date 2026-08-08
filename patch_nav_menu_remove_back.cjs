const fs = require('fs');
let content = fs.readFileSync('src/components/ui/navigation-menu-demo.tsx', 'utf8');

// Remove the back button
content = content.replace(
  /{onHome && \([\s\S]*?<\/button>\s*\)}/,
  ''
);

fs.writeFileSync('src/components/ui/navigation-menu-demo.tsx', content);
