const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

content = content.replace('|| "{detailsTitle}";', '|| "Kokonut.";');
content = content.replace('|| "{detailsSeason}";', '|| "SUMMER 2025";');
content = content.replace('|| {detailsImage};', '|| "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg";');

fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
