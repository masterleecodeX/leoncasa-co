const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
    /<NavigationMenuDemo \/>\s*<HeaderActions \/>/g,
    `<div className="flex-1 min-w-0">\n          <NavigationMenuDemo />\n        </div>\n        <div className="shrink-0 flex items-center ml-2 sm:ml-4">\n          <HeaderActions />\n        </div>`
);

content = content.replace(
    /<NavigationMenuDemo showBackArrow=\{true\} \/>\s*<HeaderActions \/>/g,
    `<div className="flex-1 min-w-0">\n          <NavigationMenuDemo showBackArrow={true} />\n        </div>\n        <div className="shrink-0 flex items-center ml-2 sm:ml-4">\n          <HeaderActions />\n        </div>`
);

fs.writeFileSync('src/App.tsx', content);
