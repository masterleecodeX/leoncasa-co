const fs = require('fs');

function removeUnusedImports(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // LayoutToggleDemo
    if (filePath.includes('LayoutToggleDemo')) {
        content = content.replace('import { collection, onSnapshot, query, orderBy } from "firebase/firestore"', 'import { collection, onSnapshot } from "firebase/firestore"');
        content = content.replace('import { Button } from "@/components/ui/button"\n', '');
    }
    
    // CoverflowDemo
    if (filePath.includes('CoverflowDemo')) {
        content = content.replace('import { collection, onSnapshot, query, orderBy } from "firebase/firestore"', 'import { collection, onSnapshot } from "firebase/firestore"');
    }

    fs.writeFileSync(filePath, content);
}

removeUnusedImports('src/components/demo/LayoutToggleDemo.tsx');
removeUnusedImports('src/components/demo/CoverflowDemo.tsx');
