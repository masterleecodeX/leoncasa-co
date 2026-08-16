const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const target = `          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Dimensions</label>
            <input value={getMetaValue(localSlide, "Dimensions")} onChange={(e) => handleMetaChange("Dimensions", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>`;

const replacement = `          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Dimensions</label>
            <input value={getMetaValue(localSlide, "Dimensions")} onChange={(e) => handleMetaChange("Dimensions", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
        </div>
        
        {/* DETAILS PAGE FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Title</label>
            <input value={localSlide.detailsTitle || ""} onChange={(e) => handleChange("detailsTitle", e.target.value)} placeholder="Kokonut." className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Subtitle (Season)</label>
            <input value={localSlide.detailsSeason || ""} onChange={(e) => handleChange("detailsSeason", e.target.value)} placeholder="SUMMER 2025" className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Description</label>
            <textarea value={localSlide.detailsDescription || ""} onChange={(e) => handleChange("detailsDescription", e.target.value)} placeholder="Description..." className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl min-h-[80px]" />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details List (Comma separated)</label>
            <input value={localSlide.detailsList || ""} onChange={(e) => handleChange("detailsList", e.target.value)} placeholder="Ready-to-wear, Accessories, Footwear" className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
        </div>

      </div>
    </div>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
