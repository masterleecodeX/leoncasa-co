const fs = require('fs');
let content = fs.readFileSync('src/components/ui/hero-04.tsx', 'utf8');

content = content.replace("onNext?: () => void", "onNext?: () => void\n  slideData?: any");
content = content.replace("onNext,", "onNext,\n  slideData,");
content = content.replace('<Link to="/details" className="block cursor-pointer">', '<Link to="/details" state={{ slide: slideData }} className="block cursor-pointer">');

fs.writeFileSync('src/components/ui/hero-04.tsx', content);
