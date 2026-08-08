const fs = require('fs');
let content = fs.readFileSync('src/components/ui/signup-page.tsx', 'utf8');

content = content.replace(
  /                  \{\!isLogin \&\& \(\n(?:.|\n)*?Forgot Password\?\n                    <\/button>\n                  <\/>\n                \)\}\n                <\/button>/,
  function(match) {
    // wait this regex is wrong.
    return match;
  }
);
