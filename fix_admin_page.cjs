const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// The block to remove:
const blockToRemove = `      {activeTab === "viewers" && (
        <div className="space-y-6 max-w-2xl">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Website Analytics</h2>
          </div>
          <div className="p-8 border border-gray-200/75 rounded-[20px] bg-white shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Total Unique Visitors</h3>
            <p className="text-5xl font-bold text-slate-900">{viewerCount}</p>
          </div>
        </div>
      )}`;

// We remove it from where it currently is (in AdminProductCard)
content = content.replace(blockToRemove, "");

// And we inject it right before the closing div of the main component.
// Let's find the end of the admins list:
const searchTarget = `            ))}
          </div>
        </div>
      )}`;

const replacement = `            ))}
          </div>
        </div>
      )}

${blockToRemove}
    </div>
  );
}`;

content = content.replace(searchTarget + "\n    </div>\n  );\n}", replacement);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
