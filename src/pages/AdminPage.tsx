import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, addDoc } from "firebase/firestore";
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
        const MAX_SIZE = 1024;
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
        callback(canvas.toDataURL("image/jpeg", 0.7)); // Compress to 70% JPEG
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

function AdminSlideCard({ slide, onDelete }: { slide: any, onDelete: (id: string) => void }) {
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
      await setDoc(doc(db, "coverflow", slide.id), localSlide, { merge: true });
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
        <img src={localSlide.src} alt={localSlide.alt} className="w-full sm:w-32 h-32 object-cover rounded-2xl border border-gray-100 shadow-sm" />
        <label className="cursor-pointer flex items-center justify-center w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors">
          Change Image
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (base64) => handleChange("src", base64))}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Title</label>
            <input 
              value={localSlide.title || ""} 
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Subtitle</label>
            <input 
              value={localSlide.subtitle || ""} 
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Price</label>
            <input 
              value={getMetaValue(localSlide, "Price")} 
              onChange={(e) => handleMetaChange("Price", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Material</label>
            <input 
              value={getMetaValue(localSlide, "Material")} 
              onChange={(e) => handleMetaChange("Material", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Dimensions</label>
            <input 
              value={getMetaValue(localSlide, "Dimensions")} 
              onChange={(e) => handleMetaChange("Dimensions", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
        </div>
      </div>
      
      <div className="shrink-0 flex flex-col gap-2 self-start">
        <Button 
          onClick={handleSave} 
          disabled={!isDirty || isSaving}
          className={`rounded-xl px-4 py-2 text-sm shadow-sm transition-all gap-2 ${isDirty ? 'bg-black hover:bg-gray-800 text-white border-0' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save"}
        </Button>
        <button 
          onClick={() => onDelete(slide.id)} 
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Product Name</label>
            <input 
              value={localProduct.name || ""} 
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">Price ($)</label>
            <input 
              type="number"
              value={localProduct.price || 0} 
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
        </div>
      </div>
      
      <div className="shrink-0 flex flex-col gap-2 self-start">
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

export default function AdminPage() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"coverflow" | "products" | "admins">("coverflow");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  useEffect(() => {
    const unsubSlides = onSnapshot(collection(db, "coverflow"), (snapshot) => {
      setSlides(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {
      setAdmins(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubSlides();
      unsubProducts();
      unsubAdmins();
    };
  }, []);

  const getMetaValue = (slide: any, label: string) => {
    const metaItem = slide.meta?.find((m: any) => m.label === label);
    return metaItem ? metaItem.value : "";
  };

  const handleUpdateMeta = async (id: string, currentMeta: any[], label: string, value: string) => {
    const newMeta = [...(currentMeta || [])];
    const index = newMeta.findIndex(m => m.label === label);
    if (index >= 0) {
      newMeta[index].value = value;
    } else {
      newMeta.push({ label, value });
    }
    await setDoc(doc(db, "coverflow", id), { meta: newMeta }, { merge: true });
  };

  const handleImageUpload = (file: File | null, callback: (base64: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSlide = async () => {
    const newSlide = {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=640&h=640&fit=crop&q=70&auto=format",
      alt: "New Slide",
      title: "New Title",
      subtitle: "New Subtitle",
      meta: [
        { label: "Price", value: "2024" },
        { label: "Material", value: "Canvas" }
      ],
      order: slides.length
    };
    await addDoc(collection(db, "coverflow"), newSlide);
  };

  const handleUpdateSlide = async (id: string, field: string, value: string) => {
    await setDoc(doc(db, "coverflow", id), { [field]: value }, { merge: true });
  };

  const handleDeleteSlide = async (id: string) => {
    await deleteDoc(doc(db, "coverflow", id));
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: "New Product",
      imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg",
      price: 99.99,
      order: products.length
    };
    await addDoc(collection(db, "products"), newProduct);
  };

  const handleUpdateProduct = async (id: string, field: string, value: any) => {
    await setDoc(doc(db, "products", id), { [field]: field === "price" ? Number(value) : value }, { merge: true });
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
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
        
        <div className="inline-flex bg-gray-100/80 p-1 rounded-xl shadow-inner border border-gray-200/60">
          <button 
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'coverflow' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("coverflow")}
          >
            Carousel Slides
          </button>
          <button 
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'products' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button 
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'admins' ? 'bg-white text-black shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab("admins")}
          >
            Admins
          </button>
        </div>
      </div>

      {activeTab === "coverflow" && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-medium tracking-tight text-gray-900">Carousel Slides</h2>
            <Button onClick={handleAddSlide} className="rounded-full px-5 shadow-sm hover:shadow transition-all gap-2 bg-black hover:bg-gray-800 text-white border-0">
              <Plus className="w-4 h-4" /> Add Slide
            </Button>
          </div>
          <div className="space-y-5">
            {slides.map(slide => (
              <AdminSlideCard key={slide.id} slide={slide} onDelete={handleDeleteSlide} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
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
          <div className="flex justify-between items-end mb-2">
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
    </div>
  );
}
