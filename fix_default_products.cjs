const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

content = content.replace(/name: "adidas",\s*imageUrl: "https:\/\/m.media-amazon.com\/images\/I\/61uSf-0MJzL._AC_SY695_.jpg",\s*price: 120,/g, 'name: "adidas", imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg", price: 120, category: "chair",');

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
