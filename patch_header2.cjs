const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

content = content.replace(
  '<NavigationMenuDemo onHome={onHome} />',
  '<NavigationMenuDemo onHome={onHome} />\n      <div className="md:hidden flex items-center">\n        <button onClick={onHome} className="font-semibold text-lg tracking-tight">ReUI</button>\n      </div>'
);

fs.writeFileSync('src/components/layout/Header.tsx', content);
