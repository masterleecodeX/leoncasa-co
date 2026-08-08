const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  'type={showConfirmPassword ? "text" : "password"} \n                    placeholder="Password"',
  'type={showConfirmPassword ? "text" : "password"} \n                    placeholder="Confirm Password"'
);

content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-[140px] text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);

content = content.replace(
  '<span className="text-sm text-black pointer-events-none">\n                      Confirm Password\n                    </span>',
  ''
);

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
