const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the inline import
content = content.replace("import { useLocation } from 'react-router-dom';\n\nfunction ProductDetailsPage() {", "function ProductDetailsPage() {");

fs.writeFileSync('src/App.tsx', content);
