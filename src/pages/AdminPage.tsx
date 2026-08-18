import { useAuth } from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, addDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Button } from "../components/ui/button";
import { Trash, Plus, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const handleImageUpload = (file: File | null, callback: (base64: string) => void) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const MAX_SIZE = 600;
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("image/jpeg", 0.5)); // Compress to 70% JPEG
      };
      img.src = reader.result;
    }
  };
  reader.readAsDataURL(file);
};

const getMetaValue = (slide: any, label: string) => {
  const metaItem = slide.meta?.find((m: any) => m.label === label);
  return metaItem ? metaItem.value : "";
};

function AdminProductCard({ product, onDelete }: { product: any, onDelete: (id: string) => void }) {
  const [localProduct, setLocalProduct] = useState(product);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      setLocalProduct(product);
    }
  }, [product, isDirty]);

  const handleChange = (field: string, value: any) => {
    setLocalProduct((prev: any) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...localProduct,
        price: Number(localProduct.price)
      };
      await setDoc(doc(db, "products", product.id), payload, { merge: true });
      const cached = localStorage.getItem("products_grid_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        const updated = parsed.map((p: any) => p.id === product.id ? payload : p);
        localStorage.setItem("products_grid_cache", JSON.stringify(updated));
      }
      setIsDirty(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-5 border border-gray-200/75 rounded-[20px] flex flex-col sm:flex-row gap-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="shrink-0 flex flex-col gap-3">
        <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center p-2">
          <img src={localProduct.imageUrl} alt={localProduct.name} className="w-full h-full object-contain drop-shadow-sm" />
        </div>
        <label className="cursor-pointer flex items-center justify-center w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors">
          Change Image
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (base64) => handleChange("imageUrl", base64))}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Product Name</label>
            <input 
              value={localProduct.name || ""} 
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Price (฿)</label>
            <input 
              type="number"
              value={localProduct.price || 0} 
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Description</label>
            <textarea 
              value={localProduct.description || ""} 
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="High performance running shoes designed for ultimate comfort and speed."
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none min-h-[80px]"
            />
          </div>
        </div>

        {/* DETAILS PAGE FIELDS */}
        <div className="pt-4 border-t border-gray-100 mt-4">
          <div className="mb-4">
            <span className="text-[13px] font-medium text-gray-500 ml-1 block mb-2">Details Images</span>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar items-start">
              {(() => {
                let images = [];
                if (localProduct.detailsImages && Array.isArray(localProduct.detailsImages)) {
                  images = localProduct.detailsImages;
                } else {
                  images = [];
                  if (localProduct.detailsImage) images.push(localProduct.detailsImage);
                  if (localProduct.detailsImage2) images.push(localProduct.detailsImage2);
                  if (localProduct.detailsImage3) images.push(localProduct.detailsImage3);
                }

                return (
                  <>
                    {images.map((imgUrl, idx) => (
                      <div key={idx} className="shrink-0 flex flex-col gap-2 w-32 relative group">
                        <img src={imgUrl || `https://placehold.co/400x500/eeeeee/999999?text=Image+${idx + 1}`} alt={`Details ${idx + 1}`} className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                        
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
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Title</label>
            <input value={localProduct.detailsTitle || ""} onChange={(e) => handleChange("detailsTitle", e.target.value)} placeholder="Kokonut." className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details List (Comma separated)</label>
            <input value={localProduct.detailsList || ""} onChange={(e) => handleChange("detailsList", e.target.value)} placeholder="Ready-to-wear, Accessories, Footwear" className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Subtitle (Season)</label>
            <input value={localProduct.detailsSeason || ""} onChange={(e) => handleChange("detailsSeason", e.target.value)} placeholder="SUMMER 2025" className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all" />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Description</label>
            <textarea value={localProduct.detailsDescription || ""} onChange={(e) => handleChange("detailsDescription", e.target.value)} placeholder="Description..." className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all min-h-[80px]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Category</label>
            <select 
              value={localProduct.category || "bed"} 
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
            >
              <option value="bed">Bed</option>
              <option value="table">Table</option>
              <option value="lamp">Lamp</option>
              <option value="sofa">Sofa</option>
              <option value="chair">Chair</option>
            </select>
          </div>
        </div>
      </div>
      </div>
      
      <div className="shrink-0 flex flex-row sm:flex-col justify-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        <Button 
          onClick={handleSave} 
          disabled={!isDirty || isSaving}
          className={`rounded-xl px-4 py-2 text-sm shadow-sm transition-all gap-2 ${isDirty ? 'bg-black hover:bg-gray-800 text-white border-0' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save"}
        </Button>
        <button 
          onClick={() => onDelete(product.id)} 
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}


function AdminHeroSlideCard({ slide, onDelete }: { slide: any, onDelete: (id: string) => void }) {
  const [localSlide, setLocalSlide] = useState(slide);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      setLocalSlide(slide);
    }
  }, [slide, isDirty]);

  const handleChange = (field: string, value: any) => {
    setLocalSlide((prev: any) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleMetaChange = (label: string, value: string) => {
    const newMeta = [...(localSlide.meta || [])];
    const index = newMeta.findIndex((m: any) => m.label === label);
    if (index >= 0) {
      newMeta[index].value = value;
    } else {
      newMeta.push({ label, value });
    }
    handleChange("meta", newMeta);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "hero_gallery", slide.id), localSlide, { merge: true });
      const cached = localStorage.getItem("hero_gallery_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        const updated = parsed.map((s: any) => s.id === slide.id ? localSlide : s);
        localStorage.setItem("hero_gallery_cache", JSON.stringify(updated));
      }
      setIsDirty(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-5 border border-gray-200/75 rounded-[20px] flex flex-col gap-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Images */}
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {/* Primary Image */}
          <div className="shrink-0 flex flex-col gap-2 w-32">
            <span className="text-xs font-medium text-gray-500 text-center">Primary Image</span>
            <img src={localSlide.primaryImage} alt="Primary" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
            <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
              Change Primary
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("primaryImage", b64))} className="hidden" />
            </label>
          </div>
          {/* Secondary Image */}
          <div className="shrink-0 flex flex-col gap-2 w-32">
            <span className="text-xs font-medium text-gray-500 text-center">Secondary Image</span>
            <img src={localSlide.secondaryImage} alt="Secondary" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
            <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
              Change Secondary
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("secondaryImage", b64))} className="hidden" />
            </label>
          </div>
          {/* Wash Image */}
          <div className="shrink-0 flex flex-col gap-2 w-32">
            <span className="text-xs font-medium text-gray-500 text-center">Background Wash</span>
            <img src={localSlide.washImage} alt="Wash" className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
            <label className="cursor-pointer text-center w-full px-2 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition-colors">
              Change Wash
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (b64) => handleChange("washImage", b64))} className="hidden" />
            </label>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="sm:ml-auto shrink-0 flex flex-row sm:flex-col justify-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
          <Button onClick={handleSave} disabled={!isDirty || isSaving} className={`rounded-xl px-4 py-2 text-sm shadow-sm transition-all gap-2 ${isDirty ? 'bg-black hover:bg-gray-800 text-white border-0' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save"}
          </Button>
          <button onClick={() => onDelete(slide.id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Title</label>
            <input value={localSlide.title || ""} onChange={(e) => handleChange("title", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Title Line 2</label>
            <input value={localSlide.titleLine2 || ""} onChange={(e) => handleChange("titleLine2", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Price</label>
            <input value={getMetaValue(localSlide, "Price")} onChange={(e) => handleMetaChange("Price", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Material</label>
            <input value={getMetaValue(localSlide, "Material")} onChange={(e) => handleMetaChange("Material", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Dimensions</label>
            <input value={getMetaValue(localSlide, "Dimensions")} onChange={(e) => handleMetaChange("Dimensions", e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
        </div>
        
        {/* DETAILS PAGE FIELDS */}
        <div className="pt-4 border-t border-gray-100 mt-4">
          <div className="mb-4">
            <span className="text-[13px] font-medium text-gray-500 ml-1 block mb-2">Details Images</span>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar items-start">
              {(() => {
                let images: string[] = [];
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
                        <img src={imgUrl || `https://placehold.co/400x500/eeeeee/999999?text=Image+${idx + 1}`} alt={`Details ${idx + 1}`} className="w-full h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                        
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
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Title</label>
            <input value={localSlide.detailsTitle || ""} onChange={(e) => handleChange("detailsTitle", e.target.value)} placeholder="Kokonut." className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details List (Comma separated)</label>
            <input value={localSlide.detailsList || ""} onChange={(e) => handleChange("detailsList", e.target.value)} placeholder="Ready-to-wear, Accessories, Footwear" className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Subtitle (Season)</label>
            <input value={localSlide.detailsSeason || ""} onChange={(e) => handleChange("detailsSeason", e.target.value)} placeholder="SUMMER 2025" className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl" />
          </div>
          <div className="space-y-1.5 sm:col-span-3">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Details Description</label>
            <textarea value={localSlide.detailsDescription || ""} onChange={(e) => handleChange("detailsDescription", e.target.value)} placeholder="Description..." className="w-full px-4 py-2.5 bg-gray-50/50 focus:bg-white text-sm border border-gray-200 rounded-xl min-h-[80px]" />
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [heroSlides, setHeroSlides] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem("hero_gallery_cache");
      const parsed = cached ? JSON.parse(cached) : [];
      return parsed.length > 0 ? parsed : [
        {
          id: "default-slide-1",
          badge: "LeonCasa & Co.",
          title: "The grass farm its your art",
          description: "",
          price: "2024",
          material: "Metal+Glass",
          dimensions: "120x50",
          imageSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80",
          imageAlt: "Interior",
        }
];
    } catch(e) { return [
        {
          id: "default-slide-1",
          badge: "LeonCasa & Co.",
          title: "The grass farm its your art",
          description: "",
          price: "2024",
          material: "Metal+Glass",
          dimensions: "120x50",
          imageSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80",
          imageAlt: "Interior",
        }
]; }
  });
  const [coverflowData, setCoverflowData] = useState<any>(() => {
    try {
      const cached = localStorage.getItem("coverflow_cache");
      return cached ? JSON.parse(cached) : {
  id: "main", title: "", titleLine2Prefix: "", titleHighlight: "", description: "", ctaText: "Get Started", images: ["", "", ""]
};
    } catch(e) { return {
  id: "main", title: "", titleLine2Prefix: "", titleHighlight: "", description: "", ctaText: "Get Started", images: ["", "", ""]
}; }
  });
  const [products, setProducts] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem("products_grid_cache");
      const parsed = cached ? JSON.parse(cached) : [];
      return parsed.length > 0 ? parsed : [
  { id: "default-item-9", name: "adidas", imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg", price: 120, category: "chair" },
  { id: "default-item-8", name: "Modern Lamp", imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop", price: 85, category: "lamp" },
  { id: "default-item-7", name: "Wooden Table", imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=600&auto=format&fit=crop", price: 450, category: "table" },
  { id: "default-item-6", name: "Lounge Sofa", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop", price: 890, category: "sofa" },
  { id: "default-item-5", name: "Classic Bed", imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600&auto=format&fit=crop", price: 1200, category: "bed" }
];
    } catch(e) { return [
  { id: "default-item-9", name: "adidas", imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg", price: 120, category: "chair" },
  { id: "default-item-8", name: "Modern Lamp", imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop", price: 85, category: "lamp" },
  { id: "default-item-7", name: "Wooden Table", imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=600&auto=format&fit=crop", price: 450, category: "table" },
  { id: "default-item-6", name: "Lounge Sofa", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop", price: 890, category: "sofa" },
  { id: "default-item-5", name: "Classic Bed", imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600&auto=format&fit=crop", price: 1200, category: "bed" }
]; }
  });
  const [admins, setAdmins] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"hero_gallery" | "coverflow" | "products" | "admins" | "viewers">("hero_gallery");
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [isSavingCoverflow, setIsSavingCoverflow] = useState(false);

  useEffect(() => {
    const unsubCoverflow = onSnapshot(doc(db, "coverflow", "main"), (docSnap) => {
      if (docSnap.exists()) {
        setCoverflowData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setCoverflowData({ id: "main", title: "", titleLine2Prefix: "", titleHighlight: "", description: "", ctaText: "Get Started", images: ["", "", ""] });
      }
    }, (error) => console.warn("Admin coverflow listener:", error.message));
    
    const unsubHero = onSnapshot(collection(db, "hero_gallery"), (snapshot) => {
      setHeroSlides(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("Admin hero listener:", error.message));
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("Admin products listener:", error.message));
    const fetchViewers = async () => {
      try {
        const docSnap = await getDoc(doc(db, "analytics", "visitors"));
        if (docSnap.exists()) {
          setViewerCount(docSnap.data().count || 0);
        }
      } catch(e) {}
    };
    fetchViewers();
    
    const unsubAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {
      setAdmins(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("Admin admins listener:", error.message));

    return () => {
      unsubHero();
      unsubProducts();
      unsubAdmins();
    };
  }, []);
  if (loading) return <div className="p-8 text-center text-slate-500 flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return (
    <div className="p-8 text-center flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Access</h2>
      <p className="text-slate-500 mb-4">Please log in to continue.</p>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </div>
  );
  if (!isAdmin) return (
    <div className="p-8 text-center flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
      <p className="text-slate-500 mb-4">You do not have permission to view this page.</p>
      <Button onClick={() => navigate("/")}>Return Home</Button>
    </div>
  );





  
  const handleAddHeroSlide = async () => {
    const newSlide = {
      title: "New Gallery",
      titleLine2: "for the work.",
      meta: [
        { label: "Price", value: "2024" },
        { label: "Material", value: "Canvas" },
        { label: "Dimensions", value: "ddd" },
      ],
      washImage: "https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=2198&auto=format&fit=crop",
      primaryImage: "https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=1131&auto=format&fit=crop",
      secondaryImage: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1144&auto=format&fit=crop",
      order: heroSlides.length
    };
    await addDoc(collection(db, "hero_gallery"), newSlide);
  };
  
  const handleDeleteHeroSlide = async (id: string) => {
    await deleteDoc(doc(db, "hero_gallery", id));
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: "New Product",
      imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg",
      price: 99.99,
      category: "bed",
      order: products.length
    };
    const docRef = await addDoc(collection(db, "products"), newProduct);
    const cached = localStorage.getItem("products_grid_cache");
    if (cached) {
      const parsed = JSON.parse(cached);
      parsed.push({ id: docRef.id, ...newProduct });
      localStorage.setItem("products_grid_cache", JSON.stringify(parsed));
      setProducts(parsed);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    const cached = localStorage.getItem("products_grid_cache");
    if (cached) {
      const parsed = JSON.parse(cached);
      const filtered = parsed.filter((p: any) => p.id !== id);
      localStorage.setItem("products_grid_cache", JSON.stringify(filtered));
      setProducts(filtered);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminEmail.includes("@")) return;
    await setDoc(doc(db, "admins", newAdminEmail.trim().toLowerCase()), {
      email: newAdminEmail.trim().toLowerCase(),
      createdAt: Date.now()
    });
    setNewAdminEmail("");
  };

  const handleDeleteAdmin = async (id: string) => {
    if (id === 'mleongholami08@gmail.com') return; // protect root admin
    await deleteDoc(doc(db, "admins", id));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 pt-24 min-h-screen font-sans bg-gray-50/30">
      <div className="mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage Content</h1>
        
        <div className="flex overflow-x-auto hide-scrollbar bg-gray-100/80 p-1 rounded-xl shadow-inner border border-gray-200/60 w-full md:w-auto">
          <button 
            className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'hero_gallery' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("hero_gallery")}
          >
            Hero Gallery
          </button>
          <button 
            className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'coverflow' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("coverflow")}
          >
            Bottom Coverflow
          </button>

          <button 
            className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'products' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button 
            className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'admins' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("admins")}
          >
            Admins
          </button>
          <button 
            className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'viewers' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("viewers")}
          >
            Viewers
          </button>
        </div>
      </div>

      
      {activeTab === "hero_gallery" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Hero Gallery</h2>
            <Button onClick={handleAddHeroSlide} className="rounded-full px-5 shadow-sm hover:shadow transition-all gap-2 bg-black hover:bg-gray-800 text-white border-0">
              <Plus className="w-4 h-4" /> Add Gallery
            </Button>
          </div>
          <div className="space-y-5">
            {heroSlides.map(slide => (
              <AdminHeroSlideCard key={slide.id} slide={slide} onDelete={handleDeleteHeroSlide} />
            ))}
          </div>
        </div>
      )}

        
      
      {activeTab === "coverflow" && coverflowData && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Bottom Coverflow Images</h2>
          </div>
          <div className="p-5 border border-gray-200/75 rounded-[20px] bg-white shadow-sm space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-3">
                  <label className="text-[13px] font-medium text-gray-500 ml-1">{['Left', 'Center', 'Right'][index]} Image</label>
                  <div className="w-full aspect-[3/4] bg-gray-50 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center p-2 overflow-hidden">
                    {coverflowData.images?.[index] ? (
                      <img src={coverflowData.images[index]} alt={`Coverflow ${index}`} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                  <label className="cursor-pointer flex items-center justify-center w-full px-3 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-[13px] font-medium text-gray-700 transition-colors">
                    Upload Image
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (base64) => {
                        const newImages = [...(coverflowData.images || ["", "", ""])];
                        newImages[index] = base64;
                        setCoverflowData({ ...coverflowData, images: newImages });
                      })}
                      className="hidden"
                    />
                  </label>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button 
                disabled={isSavingCoverflow}
                onClick={async () => {
                  setIsSavingCoverflow(true);
                  try {
                    await setDoc(doc(db, "coverflow", "main"), coverflowData, { merge: true });
                    localStorage.setItem("coverflow_cache", JSON.stringify(coverflowData));
                    alert("Saved successfully to the worldwide database!");
                  } catch (e: any) {
                    console.error("Save Error:", e);
                    alert("Error saving to database: " + e.message);
                    localStorage.setItem("coverflow_cache", JSON.stringify(coverflowData));
                  } finally {
                    setIsSavingCoverflow(false);
                  }
                }}
                className={`rounded-xl px-5 shadow-sm transition-all ${isSavingCoverflow ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:shadow'} text-white`}
              >
                <Save className="w-4 h-4 mr-2" /> {isSavingCoverflow ? "Saving..." : "Save Images"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Grid Products</h2>
            <Button onClick={handleAddProduct} className="rounded-full px-5 shadow-sm hover:shadow transition-all gap-2 bg-black hover:bg-gray-800 text-white border-0">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
          <div className="space-y-5">
            {products.map(product => (
              <AdminProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "admins" && (
        <div className="space-y-6 max-w-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Administrators</h2>
          </div>
          
          <form onSubmit={handleAddAdmin} className="flex gap-3 p-4 border border-gray-200/75 rounded-[20px] bg-white shadow-sm">
            <input 
              type="email" 
              placeholder="Enter email address..." 
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              required
            />
            <Button type="submit" className="rounded-xl px-5 shadow-sm hover:shadow transition-all gap-2 bg-black hover:bg-gray-800 text-white border-0">
              <Plus className="w-4 h-4" /> Invite Admin
            </Button>
          </form>

          <div className="flex flex-col overflow-hidden border border-gray-200/75 rounded-[20px] bg-white shadow-sm">
            <div className="p-4 sm:px-6 flex justify-between items-center bg-gray-50/50 border-b border-gray-100">
              <span className="font-medium text-slate-900 text-sm">
                mleongholami08@gmail.com 
                <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white uppercase tracking-wider">Owner</span>
              </span>
            </div>
            {admins.map(admin => (
              <div key={admin.id} className="p-4 sm:px-6 flex justify-between items-center border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                <span className="font-medium text-gray-700 text-sm">{admin.email}</span>
                <button 
                  onClick={() => handleDeleteAdmin(admin.id)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "viewers" && (
        <div className="space-y-6 max-w-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Website Analytics</h2>
          </div>
          <div className="p-8 border border-gray-200/75 rounded-[20px] bg-white shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Total Unique Visitors</h3>
            <p className="text-5xl font-bold text-slate-900">{viewerCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
