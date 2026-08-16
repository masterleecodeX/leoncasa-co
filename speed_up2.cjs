const fs = require('fs');
let content = fs.readFileSync('src/components/ui/hero-10.tsx', 'utf8');

content = content.replace(/duration: 0.015/g, 'duration: 0.03');
content = content.replace(/\* 0.015/g, '* 0.03');

fs.writeFileSync('src/components/ui/hero-10.tsx', content);
