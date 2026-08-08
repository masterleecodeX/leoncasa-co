const fs = require('fs');
let content = fs.readFileSync('src/components/ui/card-stack-demo.tsx', 'utf8');

content = content.replace(
  'export function CardStackDemoPage() {',
  'import { useEffect, useState } from "react";\n\nexport function CardStackDemoPage() {\n  const [windowWidth, setWindowWidth] = useState(1024);\n\n  useEffect(() => {\n    setWindowWidth(window.innerWidth);\n    const handleResize = () => setWindowWidth(window.innerWidth);\n    window.addEventListener("resize", handleResize);\n    return () => window.removeEventListener("resize", handleResize);\n  }, []);\n\n  const isMobile = windowWidth < 768;\n  const cardWidth = isMobile ? windowWidth * 0.75 : 520;\n  const cardHeight = isMobile ? windowWidth * 0.75 * 0.615 : 320;'
);

content = content.replace(
  'initialIndex={0}',
  'initialIndex={0}\n          cardWidth={cardWidth}\n          cardHeight={cardHeight}'
);

fs.writeFileSync('src/components/ui/card-stack-demo.tsx', content);
