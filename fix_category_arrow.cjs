const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

if (!content.includes('ChevronRight')) {
    content = content.replace(
        'import { cn } from "@/lib/utils"',
        'import { cn } from "@/lib/utils"\nimport { ChevronRight } from "lucide-react"'
    );
}

content = content.replace(
    '<div className="flex overflow-x-auto gap-2 mb-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center [&::-webkit-scrollbar]:hidden">',
    '<div className="relative mb-8 -mx-4 sm:mx-0">\n        <div className="flex overflow-x-auto gap-2 pb-4 px-4 sm:px-0 sm:justify-center [&::-webkit-scrollbar]:hidden">'
);

content = content.replace(
    /<\/button>\n\s*\}\)\}\n\s*<\/div>\n\s*<ContainerToggle className="w-full">/,
    `</button>
        ))}
        </div>
        {/* Mobile scroll indicator fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent flex items-start justify-end pt-2 sm:hidden">
          <ChevronRight className="w-5 h-5 text-gray-400 mr-2" />
        </div>
      </div>
      <ContainerToggle className="w-full">`
);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
