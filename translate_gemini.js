import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({}); // will pick up GEMINI_API_KEY from env

const englishStrings = {
  "Home": "Home",
  "Components": "Components",
  "Docs": "Docs",
  "List": "List",
  "Simple": "Simple",
  "With Icon": "With Icon",
  "Login": "Login",
  "Account": "Account",
  "Settings": "Settings",
  "Admin Panel": "Admin Panel",
  "Logout": "Logout",
  "Language": "Language",
  "Build faster interfaces": "Build faster interfaces",
  "with": "with",
  "Ready-Made Blocks": "Ready-Made Blocks",
  "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.": "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.",
  "Get Started": "Get Started",
  "How it works": "How it works",
  "A gallery for the work": "A gallery for the work",
  "you are proud of.": "you are proud of.",
  "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.": "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.",
  "Start your gallery": "Start your gallery",
  "See examples": "See examples",
  "Product": "Product",
  "Features": "Features",
  "Pricing": "Pricing",
  "Testimonials": "Testimonials",
  "Company": "Company",
  "FAQs": "FAQs",
  "About Us": "About Us",
  "Privacy Policy": "Privacy Policy",
  "Terms of Services": "Terms of Services",
  "Resources": "Resources",
  "Blog": "Blog",
  "Changelog": "Changelog",
  "Brand": "Brand",
  "Help": "Help",
  "ReUI": "ReUI",
  "Beautifully designed components built with Tailwind CSS.": "Beautifully designed components built with Tailwind CSS.",
  "Introduction": "Introduction",
  "Re-usable components built using Radix UI and Tailwind CSS.": "Re-usable components built using Radix UI and Tailwind CSS.",
  "Installation": "Installation",
  "How to install dependencies and structure your app.": "How to install dependencies and structure your app.",
  "Typography": "Typography",
  "Styles for headings, paragraphs, lists...etc": "Styles for headings, paragraphs, lists...etc",
  "Backlog": "Backlog",
  "To Do": "To Do",
  "Done": "Done",
  "Price": "Price",
  "Loading products...": "Loading products...",
  "Loading gallery...": "Loading gallery...",
  "No slides found. Add them in the admin menu.": "No slides found. Add them in the admin menu.",
  "High performance running shoes designed for ultimate comfort and speed. Experience the perfect blend of style and engineering.": "High performance running shoes designed for ultimate comfort and speed. Experience the perfect blend of style and engineering."
};

const languages = [
  'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
];

async function run() {
    const translations = {
        en: { translation: englishStrings }
    };
    
    const batchSize = 10;
    for (let i = 0; i < languages.length; i += batchSize) {
        const batch = languages.slice(i, i + batchSize);
        console.log(`Processing batch ${i} to ${i + batchSize}...`);
        
        const promises = batch.map(async (lang) => {
            if (lang === 'en') return;
            const prompt = `Translate the following JSON string values into the language with ISO code '${lang}'. Return EXACTLY a JSON object with the identical keys.
JSON:
${JSON.stringify(englishStrings, null, 2)}`;
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                    }
                });
                const translated = JSON.parse(response.text);
                translations[lang] = { translation: translated };
                console.log(`Successfully translated to ${lang}`);
            } catch (err) {
                console.error(`Failed to translate ${lang}:`, err.message);
                translations[lang] = { translation: englishStrings }; // fallback
            }
        });
        
        await Promise.all(promises);
        
        fs.writeFileSync('src/translations.json', JSON.stringify(translations, null, 2));
    }
    console.log("Translation complete!");
}

run();
