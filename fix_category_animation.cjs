const fs = require('fs');
let content = fs.readFileSync('src/components/demo/LayoutToggleDemo.tsx', 'utf8');

// The string to replace everything from <motion.div layout className="w-full grid... down to </motion.div> at the end
const oldContent = content.substring(
    content.indexOf('<motion.div layout className="w-full grid'),
    content.lastIndexOf('</motion.div>') + '</motion.div>'.length
);

const newContent = `      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
        {filteredProducts.map((product) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={product.id}
            onClick={() => navigate('/details')}
            className="cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
          >
            <GridProductCard product={product} />
          </motion.div>
        ))}      
        </motion.div>
      </AnimatePresence>`;

content = content.replace(oldContent, newContent);
fs.writeFileSync('src/components/demo/LayoutToggleDemo.tsx', content);
console.log("Replaced successfully!");
