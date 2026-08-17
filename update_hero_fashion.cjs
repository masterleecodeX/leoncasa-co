const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/hero-fashion.tsx', 'utf8');

const imgBlockOld = `<div className="md:order-2 relative flex justify-center md:justify-end min-w-0">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-slate-200 blur-3xl opacity-40 -top-6 -left-6"></div>
                        <img draggable={false}
                            src={detailsImage}
                            alt="Fashion model"
                            className="pointer-events-none select-none rounded-xl shadow-xl w-full max-w-[420px] aspect-[4/5] object-cover filter brightness-105"
                        />
                    </div>`;

const imgBlockNew = `                    <div className="md:order-2 relative flex justify-center md:justify-end min-w-0 w-full">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-slate-200 blur-3xl opacity-40 -top-6 -left-6"></div>
                        
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar w-full snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-2 md:grid-flow-row-dense md:w-auto">
                            <img draggable={false}
                                src={detailsImage}
                                alt="Fashion detail 1"
                                className="pointer-events-none select-none rounded-xl shadow-xl w-[85%] sm:w-full md:w-full max-w-[420px] md:max-w-none shrink-0 snap-center aspect-[4/5] object-cover filter brightness-105 md:col-span-2"
                            />
                            {slide?.detailsImage2 && (
                                <img draggable={false}
                                    src={slide.detailsImage2}
                                    alt="Fashion detail 2"
                                    className="pointer-events-none select-none rounded-xl shadow-xl w-[85%] sm:w-full md:w-full max-w-[420px] md:max-w-none shrink-0 snap-center aspect-[4/5] object-cover filter brightness-105 md:col-span-1"
                                />
                            )}
                            {slide?.detailsImage3 && (
                                <img draggable={false}
                                    src={slide.detailsImage3}
                                    alt="Fashion detail 3"
                                    className="pointer-events-none select-none rounded-xl shadow-xl w-[85%] sm:w-full md:w-full max-w-[420px] md:max-w-none shrink-0 snap-center aspect-[4/5] object-cover filter brightness-105 md:col-span-1"
                                />
                            )}
                        </div>
                    </div>`;

content = content.replace(imgBlockOld, imgBlockNew);
fs.writeFileSync('src/components/blocks/hero-fashion.tsx', content);
