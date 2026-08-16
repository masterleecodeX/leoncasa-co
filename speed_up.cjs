const fs = require('fs');
let content = fs.readFileSync('src/components/ui/hero-10.tsx', 'utf8');

content = content.replace(/duration: 0.05/g, 'duration: 0.015');
content = content.replace(/\* 0.05/g, '* 0.015');

fs.writeFileSync('src/components/ui/hero-10.tsx', content);
