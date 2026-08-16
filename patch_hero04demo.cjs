const fs = require('fs');
let content = fs.readFileSync('src/components/demo/Hero04Demo.tsx', 'utf8');

content = content.replace("...currentSlide,", "...currentSlide,\n    slideData: currentSlide,");

fs.writeFileSync('src/components/demo/Hero04Demo.tsx', content);
