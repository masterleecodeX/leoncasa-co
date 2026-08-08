const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// First remove the old script
content = content.replace(/<script>[\s\S]*?<\/script>\n    /, '');

const script = `<script>
      window.addEventListener('error', function(e) {
        if (e.message && e.message.includes('ResizeObserver loop')) {
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      });
      window.addEventListener('unhandledrejection', function(e) {
        if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver loop')) {
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      });
    </script>`;

content = content.replace('<head>', '<head>\n    ' + script);

fs.writeFileSync('index.html', content);
