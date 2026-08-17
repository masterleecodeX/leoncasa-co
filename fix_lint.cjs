const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// The unused handleImageUpload in the main AdminPage component
const handleImageUploadMatch = `  const handleImageUpload = (file: File | null, callback: (base64: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };`;
content = content.replace(handleImageUploadMatch, '');

// The unused getMetaValue in the main AdminPage component
const getMetaValueMatch = `  const getMetaValue = (slide: any, label: string) => {
    const metaItem = slide.meta?.find((m: any) => m.label === label);
    return metaItem ? metaItem.value : "";
  };`;
content = content.replace(getMetaValueMatch, '');

// The unused handleUpdateProduct
const handleUpdateProductMatch = `  const handleUpdateProduct = async (id: string, updates: any) => {
    await setDoc(doc(db, "products", id), updates, { merge: true });
  };`;
content = content.replace(handleUpdateProductMatch, '');


fs.writeFileSync('src/pages/AdminPage.tsx', content);
console.log("Fixed unused vars in AdminPage.");
