const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// add selectedCategory state
const stateReplacement = `  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Bed", "Table", "Lamp", "Sofa", "Chair"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  useEffect(() => {`;

content = content.replace("  useEffect(() => {", stateReplacement);

// add tabs
const tabsReplacement = `  return (
    <div id="installation-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedCategory === cat 
                ? "bg-slate-900 text-white shadow-md scale-105" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <ContainerToggle className="w-full">
        {filteredProducts.map((product) => (`;

content = content.replace(`  return (
    <div id="installation-section" className="w-full max-w-[1400px] mx-auto p-4 md:px-8 md:py-8 text-slate-900">
      <ContainerToggle className="w-full">
        {products.map((product) => (`, tabsReplacement);

fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
