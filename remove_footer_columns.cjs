const fs = require('fs');

let content = fs.readFileSync('src/config/site.ts', 'utf8');

const regex = /\s*\{\s*label:\s*'Company',[\s\S]*?\},(?=\s*\{)/g;
content = content.replace(regex, '');

const regex2 = /\s*\{\s*label:\s*'Resources',[\s\S]*?\},(?=\s*\{)/g;
content = content.replace(regex2, '');

fs.writeFileSync('src/config/site.ts', content);
