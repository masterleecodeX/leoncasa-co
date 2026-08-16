const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

if (!content.includes('.hide-scrollbar')) {
    content += `\n\n@layer utilities {
  .hide-scrollbar {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
}`;
    fs.writeFileSync('src/index.css', content);
}
