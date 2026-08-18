const fs = require('fs');
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

// The issue might be that in vite, absolute paths from public should be referenced without the leading slash in some specific setups,
// or it's just a casing/path issue. Let's make sure the paths are exactly '/whatsapp-qr.jpg'

content = content.replace(/src="\/whatsapp-qr\.jpg"/g, 'src="/whatsapp-qr.jpg"');
content = content.replace(/src="\/wechat-qr\.jpg"/g, 'src="/wechat-qr.jpg"');

// Just in case, let's also check if they were using a relative path
content = content.replace(/src="\.\/whatsapp-qr\.jpg"/g, 'src="/whatsapp-qr.jpg"');
content = content.replace(/src="\.\/wechat-qr\.jpg"/g, 'src="/wechat-qr.jpg"');

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
