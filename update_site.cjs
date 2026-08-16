const fs = require('fs');
let content = fs.readFileSync('src/config/site.ts', 'utf8');

content = content.replace(
    "{ title: 'LinkedIn', href: 'YOUR_LINKEDIN_LINK_HERE', icon: 'LinkedinIcon' }",
    "{ title: 'WhatsApp', href: 'YOUR_WHATSAPP_LINK_HERE', icon: 'WhatsappIcon' }"
);

fs.writeFileSync('src/config/site.ts', content);
