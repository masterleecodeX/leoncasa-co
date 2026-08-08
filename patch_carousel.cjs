const fs = require('fs');
let content = fs.readFileSync('src/components/ui/circular-carousel.tsx', 'utf8');

const target = `const VISIBLE_COUNT = 5;
const RADIUS_X = 220;
const RADIUS_Y = 100;

function getItemPosition(index: number, activeIndex: number, total: number) {`;

const replacement = `const VISIBLE_COUNT = 5;

function getItemPosition(index: number, activeIndex: number, total: number, windowWidth: number = 1024) {
  const isMobile = windowWidth < 768;
  const radiusX = isMobile ? 130 : 220;
  const radiusY = isMobile ? 60 : 100;

  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * radiusX;
  const y = -Math.cos(angle) * radiusY;`;

content = content.replace(target, replacement);

content = content.replace(
  'const [internalIndex, setInternalIndex] = useState(0);',
  'const [internalIndex, setInternalIndex] = useState(0);\n  const [windowWidth, setWindowWidth] = useState(1024);\n\n  useEffect(() => {\n    setWindowWidth(window.innerWidth);\n    const handleResize = () => setWindowWidth(window.innerWidth);\n    window.addEventListener("resize", handleResize);\n    return () => window.removeEventListener("resize", handleResize);\n  }, []);'
);

content = content.replace(
  'const pos = getItemPosition(index, activeIndex, items.length);',
  'const pos = getItemPosition(index, activeIndex, items.length, windowWidth);'
);

// Also need to fix the width of the cards on mobile so they don't overflow
content = content.replace(
  'className="absolute left-1/2 top-1/2 flex w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center cursor-pointer pointer-events-auto"',
  'className="absolute left-1/2 top-1/2 flex w-[240px] md:w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center cursor-pointer pointer-events-auto"'
);

fs.writeFileSync('src/components/ui/circular-carousel.tsx', content);
