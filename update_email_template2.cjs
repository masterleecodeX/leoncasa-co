const fs = require('fs');

const template = `Dear LeonCasa Team,

────────────────

CUSTOMER INFORMATION

Full Name:
Preferred Name:
Contact Method:
Email:

─────────────────

PRODUCT 01

Product Code / Name:
Quantity:
Color / Finish:

PRODUCT 02

Product Code / Name:
Quantity:
Color / Finish:

PRODUCT 03

Product Code / Name:
Quantity:
Color / Finish:

+ Add Additional Products Below

─────────────────

INQUIRY DETAILS

Message / Additional Requirements:

─────────────────

(Thank you for your inquiry. Our team will review the details and contact you shortly.)

Kind regards,
LeonCasa & Co.
Quality. Craftsmanship. Confidence.`;

const encodedBody = encodeURIComponent(template);

// We need to read the current line using regex because the previous script replaced it with a dynamic template string
let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');

// The line currently looks like this due to the previous script:
// <NavigationMenuLink render={<a href={`mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=${'Dear%20LeonCasa...etc'}`} target="_blank" rel="noopener noreferrer" />}>

const newString = '<NavigationMenuLink render={<a href={`mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=${"' + encodedBody + '"}`} target="_blank" rel="noopener noreferrer" />}>';

// We replace the entire line containing the mailto
content = content.replace(/<NavigationMenuLink render=\{<a href=\{`mailto:hello@leoncasa\.com\?subject=Website%20Inquiry&body=\$\{[^}]+\}`\} target="_blank" rel="noopener noreferrer" \/>\}>/, newString);

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
