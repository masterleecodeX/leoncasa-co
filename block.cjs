const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const protectionScript = `    <script>
      // Attempt to disable right-click and inspection shortcuts
      document.addEventListener('contextmenu', event => event.preventDefault());
      document.onkeydown = function (e) {
        if (
          e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c')) || // Mac equivalents
          (e.ctrlKey && e.key === 'U') ||
          (e.metaKey && e.key === 'u') // Mac view source
        ) {
          e.preventDefault();
          return false;
        }
      };
    </script>`;

content = content.replace('</head>', protectionScript + '\n  </head>');
fs.writeFileSync('index.html', content);
