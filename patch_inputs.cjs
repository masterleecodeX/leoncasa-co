const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

// Replace "First Name" and "Last Name"
content = content.replace(
  'placeholder="Chang Sam"',
  'placeholder="First Name"'
);
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-20 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);
content = content.replace(
  '<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-black pointer-events-none">\n                      First Name\n                    </span>',
  ''
);

content = content.replace(
  'placeholder="Chueak"',
  'placeholder="Last Name"'
);
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-20 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);
content = content.replace(
  '<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-black pointer-events-none">\n                      Last Name\n                    </span>',
  ''
);

// Replace "Email"
content = content.replace(
  'placeholder="your@gmail.com"',
  'placeholder="Email address"'
);
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-16 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);
content = content.replace(
  '<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-black pointer-events-none">\n                  Email\n                </span>',
  ''
);

// Replace Password
content = content.replace(
  'placeholder="••••••••••••"',
  'placeholder="Password"'
);
content = content.replace(
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-28 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"',
  'className="w-full border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-black"'
);
content = content.replace(
  '<span className="text-sm text-black pointer-events-none">\n                    Password\n                  </span>',
  ''
);

// Replace Confirm Password
content = content.replace(
  'placeholder="••••••••••••"', // This might match twice now, since we only replaced the first one maybe? Oh wait, replace() only replaces the first occurrence unless regex with /g is used
  'placeholder="Password"'
);
// wait, Confirm Password placeholder should be "Confirm Password"
// Let's do this more safely.

fs.writeFileSync('src/components/ui/signup-page.tsx', content);
