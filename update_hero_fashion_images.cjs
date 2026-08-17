const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

const oldImageParsing = `    const images = [
        slide?.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
    ];
    if (slide?.detailsImage2) images.push(slide.detailsImage2);
    if (slide?.detailsImage3) images.push(slide.detailsImage3);`;

const newImageParsing = `    let images = [];
    if (slide?.detailsImages && Array.isArray(slide.detailsImages) && slide.detailsImages.length > 0) {
        images = slide.detailsImages;
    } else {
        images = [
            slide?.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
        ];
        if (slide?.detailsImage2) images.push(slide.detailsImage2);
        if (slide?.detailsImage3) images.push(slide.detailsImage3);
    }`;

content = content.replace(oldImageParsing, newImageParsing);
fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
console.log("Updated hero-fashion.tsx successfully.");
