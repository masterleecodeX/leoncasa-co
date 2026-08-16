const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const target1 = `        </div>

        {/* Action Buttons */}`;
const replacement1 = `          {/* Details Image */}
          <div className="shrink-0 flex flex-col gap-2 w-32">
            <span className="text-xs font-medium text-gray-500 text-center">Details Image</span>
            <img src={localSlide.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"} alt="Details" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
            <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
              Change Details
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("detailsImage", b64))} className="hidden" />
            </label>
          </div>
        </div>

        {/* Action Buttons */}`;

const target2 = `      </div>
    </div>`;

const replacement2 = `        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
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

content = content.replace(target1, replacement1);
// For target2, it's at the end of AdminHeroSlideCard. Let's make sure it replaces the right one.
// The easiest way is to use a specific match. Let's replace the last occurrence or something specific.
const target2Spec = `          </div>
        </div>
      </div>
    </div>
  );
}

// ----- 3. Products List Component -----`;
const replacement2Spec = `          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
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
    </div>
  );
}

// ----- 3. Products List Component -----`;
content = content.replace(target2Spec, replacement2Spec);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
