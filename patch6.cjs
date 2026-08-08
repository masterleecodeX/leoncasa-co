const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

// replace early returns with finally block or just disable button directly?
// Actually let's just make the button disable.
