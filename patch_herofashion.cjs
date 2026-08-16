const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

// Replace export default function HomePage() {
content = content.replace("export default function HomePage() {", "export default function HeroFashion({ slide }: { slide?: any }) {");

// We need to inject the variable bindings right after the function signature
const targetVars = `    return (`;
const replacementVars = `    const detailsTitle = slide?.detailsTitle || "Kokonut.";
    const detailsSeason = slide?.detailsSeason || "SUMMER 2025";
    const detailsDescription = slide?.detailsDescription || \`"The Bright Young" draws inspiration from Anglomania, redefining sartorial elegance and school uniforms with a nod to British heritage. Suits of the collection are tailored out of English cloth...\`;
    const detailsImage = slide?.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg";
    
    let listItems = [
        "Ready-to-wear",
        "Accessories",
        "Footwear",
        "Leather goods",
        "Jewelry",
    ];
    if (slide?.detailsList) {
        listItems = slide.detailsList.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
    }

    return (`;
content = content.replace(targetVars, replacementVars);

// Replace Kokonut. with {detailsTitle}
content = content.replace(/Kokonut\./g, "{detailsTitle}");

// Replace SUMMER 2025 with {detailsSeason}
content = content.replace(/SUMMER 2025/g, "{detailsSeason}");

// Replace the image src
content = content.replace(/"https:\/\/ferf1mheo22r9ira\.public\.blob\.vercel-storage\.com\/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K\.jpeg"/g, "{detailsImage}");

// Replace the hardcoded list with {listItems}
content = content.replace(`{[
                                "Ready-to-wear",
                                "Accessories",
                                "Footwear",
                                "Leather goods",
                                "Jewelry",
                            ]`, `{listItems`);

// For the description, it's spread across lines:
const targetDesc = `<a
                                    href="https://kokonutui.com/"
                                    className="underline hover:text-black transition-colors"
                                >
                                    "The Bright Young"
                                </a>{" "}
                                draws inspiration from Anglomania,
                                redefining sartorial elegance and school
                                uniforms with a nod to British heritage.
                                Suits of the collection are tailored out of
                                English cloth...`;
content = content.replace(targetDesc, "{detailsDescription}");

fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
