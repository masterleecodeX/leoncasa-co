const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const imageSectionToRemove = `          {/* Details Image */}
          <div className="shrink-0 flex flex-col gap-2 w-32">
            <span className="text-xs font-medium text-gray-500 text-center">Details Image</span>
            <img src={localSlide.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"} alt="Details" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
            <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
              Change Details
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("detailsImage", b64))} className="hidden" />
            </label>
          </div>`;

content = content.replace(imageSectionToRemove, '');

const detailsHeaderOld = `        {/* DETAILS PAGE FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-4">`;

const detailsHeaderNew = `        {/* DETAILS PAGE FIELDS */}
        <div className="pt-4 border-t border-gray-100 mt-4">
          <div className="mb-4">
            <span className="text-[13px] font-medium text-gray-500 ml-1 block mb-2">Details Image</span>
            <div className="shrink-0 flex flex-col gap-2 w-32">
              <img src={localSlide.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"} alt="Details" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
              <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
                Change Details
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("detailsImage", b64))} className="hidden" />
              </label>
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">`;

// Also need to add an extra closing div at the end of the fields section!
const oldDetailsEnd = `            <textarea value={localSlide.detailsDescription || ""} onChange={(e) => handleChange("detailsDescription", e.target.value)} placeholder="Description..." className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl min-h-[80px]" />
          </div>
        </div>`;
const newDetailsEnd = `            <textarea value={localSlide.detailsDescription || ""} onChange={(e) => handleChange("detailsDescription", e.target.value)} placeholder="Description..." className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl min-h-[80px]" />
          </div>
        </div>
        </div>`;


content = content.replace(detailsHeaderOld, detailsHeaderNew);
content = content.replace(oldDetailsEnd, newDetailsEnd);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log("Moved Details Image under the borderline.");
