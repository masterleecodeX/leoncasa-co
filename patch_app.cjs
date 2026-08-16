const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace('function ProductDetailsPage() {', `import { useLocation } from 'react-router-dom';

function ProductDetailsPage() {
  const location = useLocation();
  const slideData = location.state?.slide || null;
`);

content = content.replace('<HeroFashion />', '<HeroFashion slide={slideData} />');

fs.writeFileSync('src/App.tsx', content);
