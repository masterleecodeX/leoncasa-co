const fs = require('fs');

const template = `Dear LeonCasa Team,

——————————————————

YOUR INFORMATION

Full Name:
Nick Name:
Contact Option :
Email:

——————————————————


PRODUCT

Product Code Or Name:
Quantity:
Color:


PRODUCT

Product Code Or Name:
Quantity:
Color:


 Add more below ……..


——————————————————


INQUIRY DETAILS
Message / Additional Requirements:



Thank you for your inquiry. Our team will review the details and contact you shortly.



Regards,
LeonCasa & Co.
Quality. Craftsmanship. Confidence.`;

const encodedBody = encodeURIComponent(template);

const oldString = '<NavigationMenuLink render={<a href="mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=Hello%20LeonCasa%20Team,%0A%0A" target="_blank" rel="noopener noreferrer" />}>';
const newString = '<NavigationMenuLink render={<a href={`mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=${"' + encodedBody + '"}`} target="_blank" rel="noopener noreferrer" />}>';

let content = fs.readFileSync('src/components/demo/NavigationMenuDemo.tsx', 'utf8');
content = content.replace(oldString, newString);

fs.writeFileSync('src/components/demo/NavigationMenuDemo.tsx', content);
