const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const oldDetailsImages = `<span className="text-[13px] font-medium text-gray-500 ml-1 block mb-2">Details Images</span>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              <div className="shrink-0 flex flex-col gap-2 w-32">
                <img src={localSlide.detailsImage || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"} alt="Details 1" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
                  Change Image 1
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("detailsImage", b64))} className="hidden" />
                </label>
              </div>
              <div className="shrink-0 flex flex-col gap-2 w-32">
                <img src={localSlide.detailsImage2 || "https://placehold.co/400x500/eeeeee/999999?text=Image+2"} alt="Details 2" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
                  Change Image 2
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("detailsImage2", b64))} className="hidden" />
                </label>
              </div>
              <div className="shrink-0 flex flex-col gap-2 w-32">
                <img src={localSlide.detailsImage3 || "https://placehold.co/400x500/eeeeee/999999?text=Image+3"} alt="Details 3" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
                  Change Image 3
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("detailsImage3", b64))} className="hidden" />
                </label>
              </div>
            </div>`;

const newDetailsImages = `<span className="text-[13px] font-medium text-gray-500 ml-1 block mb-2">Details Images</span>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar items-start">
              {(() => {
                let images = [];
                if (localSlide.detailsImages && Array.isArray(localSlide.detailsImages)) {
                  images = localSlide.detailsImages;
                } else {
                  images = [];
                  if (localSlide.detailsImage) images.push(localSlide.detailsImage);
                  if (localSlide.detailsImage2) images.push(localSlide.detailsImage2);
                  if (localSlide.detailsImage3) images.push(localSlide.detailsImage3);
                }

                return (
                  <>
                    {images.map((imgUrl, idx) => (
                      <div key={idx} className="shrink-0 flex flex-col gap-2 w-32 relative group">
                        <img src={imgUrl || \`https://placehold.co/400x500/eeeeee/999999?text=Image+\${idx + 1}\`} alt={\`Details \${idx + 1}\`} className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                        
                        <button 
                          onClick={() => {
                            const newImages = [...images];
                            newImages.splice(idx, 1);
                            handleChange("detailsImages", newImages);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>

                        <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
                          Change Image
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => {
                            const newImages = [...images];
                            newImages[idx] = b64;
                            handleChange("detailsImages", newImages);
                          })} className="hidden" />
                        </label>
                      </div>
                    ))}
                    
                    <div className="shrink-0 flex flex-col gap-2 w-32">
                        <label className="w-full h-32 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-2xl cursor-pointer transition-colors text-gray-500 hover:text-gray-700">
                          <Plus className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-medium">Add Image</span>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => {
                            const newImages = [...images, b64];
                            handleChange("detailsImages", newImages);
                          })} className="hidden" />
                        </label>
                    </div>
                  </>
                );
              })()}
            </div>`;

if (content.includes('Change Image 3')) {
  content = content.replace(oldDetailsImages, newDetailsImages);
  fs.writeFileSync('src/pages/AdminPage.tsx', content);
  console.log("Updated AdminPage.tsx successfully.");
} else {
  console.log("Could not find the target string in AdminPage.tsx");
}
