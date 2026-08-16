const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// Add Viewer import
if(!content.includes('import { doc, getDoc')) {
  content = content.replace('import { collection, addDoc', 'import { collection, addDoc, doc, getDoc');
}

// Update state
content = content.replace(
  'const [activeTab, setActiveTab] = useState<"hero_gallery" | "products" | "admins">("hero_gallery");',
  'const [activeTab, setActiveTab] = useState<"hero_gallery" | "products" | "admins" | "viewers">("hero_gallery");\n  const [viewerCount, setViewerCount] = useState<number>(0);'
);

// Fetch viewer count
content = content.replace(
  'const unsubAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {',
  `const fetchViewers = async () => {
      try {
        const docSnap = await getDoc(doc(db, "analytics", "visitors"));
        if (docSnap.exists()) {
          setViewerCount(docSnap.data().count || 0);
        }
      } catch(e) {}
    };
    fetchViewers();
    
    const unsubAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {`
);

// Add Tab Button
const tabButton = `</button>
          <button 
            className={\`px-5 py-2 text-sm font-medium rounded-lg transition-all \${activeTab === 'viewers' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}\`}
            onClick={() => setActiveTab("viewers")}
          >
            Viewers
          </button>`;
content = content.replace(
  'onClick={() => setActiveTab("admins")}\n          >\n            Admins\n          </button>',
  `onClick={() => setActiveTab("admins")}\n          >\n            Admins\n          </button>\n          <button \n            className={\`px-5 py-2 text-sm font-medium rounded-lg transition-all \${activeTab === 'viewers' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}\`}\n            onClick={() => setActiveTab("viewers")}\n          >\n            Viewers\n          </button>`
);

// Add Viewers content
const viewersContent = `{activeTab === "viewers" && (
        <div className="space-y-6 max-w-2xl">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Website Analytics</h2>
          </div>
          <div className="p-8 border border-gray-200/75 rounded-[20px] bg-white shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Total Unique Visitors</h3>
            <p className="text-5xl font-bold text-slate-900">{viewerCount}</p>
          </div>
        </div>
      )}
    </div>`;

content = content.replace(
  '}      )}    </div>',
  `}      )}      ${viewersContent}`
);

// Fix doc import if not present
if (!content.includes('import { doc, getDoc')) {
  // It should be imported from firebase/firestore
  // Let's just run another sed if needed.
}

fs.writeFileSync('src/pages/AdminPage.tsx', content);
