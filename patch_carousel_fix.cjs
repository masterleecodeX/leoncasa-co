const fs = require('fs');
let content = fs.readFileSync('src/components/ui/circular-carousel.tsx', 'utf8');

const target = `const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;`;

content = content.replace(target, '');

fs.writeFileSync('src/components/ui/circular-carousel.tsx', content);
