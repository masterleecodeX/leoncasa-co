const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const script = `<script>
      window.addEventListener('error', function(e) {
        if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || e.message === 'ResizeObserver loop limit exceeded') {
          e.stopImmediatePropagation();
        }
      });
    </script>`;

content = content.replace('<head>', '<head>\n    ' + script);

fs.writeFileSync('index.html', content);
