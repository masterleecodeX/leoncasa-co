const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

// Fix image alignment on mobile (justify-center md:justify-end)
content = content.replace(
    'className="md:order-2 relative flex justify-end"',
    'className="md:order-2 relative flex justify-center md:justify-end min-w-0"'
);

// Fix text blowout on mobile (add min-w-0 to the flex col)
content = content.replace(
    'className="md:order-1 flex flex-col justify-center h-full py-4"',
    'className="md:order-1 flex flex-col justify-center h-full py-4 min-w-0 w-full"'
);

// Use break-all for the h1 and p to force break those long string testing cases
content = content.replace(
    'className="text-5xl md:text-6xl font-bold text-black leading-tight tracking-tighter mb-8 break-words"',
    'className="text-5xl md:text-6xl font-bold text-black leading-tight tracking-tighter mb-8 break-all sm:break-words"'
);

content = content.replace(
    'className="text-sm text-black/70 max-w-md pt-3 leading-relaxed tracking-tight break-words"',
    'className="text-sm text-black/70 max-w-md pt-3 leading-relaxed tracking-tight break-all sm:break-words"'
);

fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
