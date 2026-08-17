const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

const oldBlock = `<div className="md:order-2 relative flex justify-center md:justify-end min-w-0 w-full">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-slate-200 blur-3xl opacity-40 -top-6 -left-6"></div>
                        
                        <div className="relative w-full max-w-[420px] overflow-hidden rounded-xl shadow-xl aspect-[4/5] mx-auto md:ml-auto md:mr-0">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    draggable={false}
                                    src={images[currentIndex]}
                                    alt={\`Fashion detail \${currentIndex + 1}\`}
                                    className="pointer-events-none select-none w-full h-full object-cover filter brightness-105 absolute top-0 left-0"
                                />
                            </AnimatePresence>
                            
                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-black rounded-full shadow-lg backdrop-blur-md transition-all border border-black/5"
                                    >
                                        <ChevronLeft className="w-5 h-5 ml-[-2px]" />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-black rounded-full shadow-lg backdrop-blur-md transition-all border border-black/5"
                                    >
                                        <ChevronRight className="w-5 h-5 mr-[-2px]" />
                                    </button>
                                    
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm">
                                        {images.map((_, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setCurrentIndex(idx)}
                                                className={\`h-1.5 rounded-full transition-all \${idx === currentIndex ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/60 hover:bg-white/80'}\`}
                                                aria-label={\`Go to slide \${idx + 1}\`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>`;

const newBlock = `<div className="md:order-2 relative flex justify-center md:justify-end min-w-0 w-full">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-slate-200 blur-3xl opacity-40 -top-6 -left-6"></div>
                        
                        <div className="flex items-center justify-center md:justify-end gap-1 md:gap-4 w-full">
                            {images.length > 1 && (
                                <button 
                                    onClick={prevImage}
                                    className="text-gray-300 hover:text-black transition-colors shrink-0 p-1 md:p-2 focus:outline-none"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                                </button>
                            )}
                            
                            <div className="flex flex-col w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px]">
                                <div className="relative w-full overflow-hidden rounded-xl shadow-xl aspect-[4/5]">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentIndex}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.02 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            draggable={false}
                                            src={images[currentIndex]}
                                            alt={\`Fashion detail \${currentIndex + 1}\`}
                                            className="pointer-events-none select-none w-full h-full object-cover filter brightness-105 absolute top-0 left-0"
                                        />
                                    </AnimatePresence>
                                </div>
                                
                                {images.length > 1 && (
                                    <div className="flex gap-2 justify-center w-full mt-6">
                                        {images.map((_, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setCurrentIndex(idx)}
                                                className={\`h-1.5 rounded-full transition-all focus:outline-none \${idx === currentIndex ? 'w-6 bg-black' : 'w-2 bg-gray-200 hover:bg-gray-300'}\`}
                                                aria-label={\`Go to slide \${idx + 1}\`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {images.length > 1 && (
                                <button 
                                    onClick={nextImage}
                                    className="text-gray-300 hover:text-black transition-colors shrink-0 p-1 md:p-2 focus:outline-none"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                                </button>
                            )}
                        </div>
                    </div>`;

content = content.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
