const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// replace the import
content = content.replace(
    'import { ContainerToggle, CellToggle } from "../blocks/animated-toggle-layout-container"',
    'import { motion, AnimatePresence } from "motion/react"'
);

// replace ContainerToggle opening
content = content.replace(
    '<ContainerToggle className="w-full">',
    '<motion.div layout className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">\n        <AnimatePresence mode="popLayout">'
);

// replace CellToggle with motion.div
content = content.replace(
    /<CellToggle/g,
    '<motion.div\n            layout\n            initial={{ opacity: 0, scale: 0.9 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.9 }}\n            transition={{ duration: 0.2 }}\n            whileHover={{ y: -5 }}'
);

content = content.replace(
    /<\/CellToggle>/g,
    '</motion.div>'
);

// replace ContainerToggle closing
content = content.replace(
    '</ContainerToggle>',
    '        </AnimatePresence>\n      </motion.div>'
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
