const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(
    '<AnimatePresence mode="popLayout">',
    '<AnimatePresence mode="wait">'
);

content = content.replace(
    '            initial={{ opacity: 0, scale: 0.9 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.9 }}\n            transition={{ duration: 0.2 }}',
    '            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.3 }}'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
