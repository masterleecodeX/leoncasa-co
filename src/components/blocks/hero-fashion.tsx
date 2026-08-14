"use client";

import { motion } from "motion/react";

export default function HomePage() {
    return (
        <div className="w-full bg-white flex flex-col items-center py-12 md:py-16">
            <div className="w-full max-w-5xl px-6 md:px-8">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center relative overflow-visible">
                    <div className="md:order-2 relative flex justify-end">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-slate-200 blur-3xl opacity-40 -top-6 -left-6"></div>
                        <img
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
                            alt="Fashion model"
                            className="rounded-xl shadow-xl w-full max-w-[420px] aspect-[4/5] object-cover filter brightness-105"
                        />
                    </div>
                    <div className="md:order-1 flex flex-col justify-center h-full py-4">
                        <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight tracking-tighter mb-8">
                            Kokonut.
                        </h1>
                        <ul className="space-y-3 tracking-tight text-base text-black/80 mb-12">
                            {[
                                "Ready-to-wear",
                                "Accessories",
                                "Footwear",
                                "Leather goods",
                                "Jewelry",
                            ].map((item, index) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{
                                        opacity: 1,
                                        x: 4,
                                        transition: {
                                            duration: 0.3,
                                            ease: "easeOut",
                                        },
                                    }}
                                    transition={{
                                        delay: index * 0.1,
                                    }}
                                >
                                    <a href="#" className="cursor-pointer hover:text-black">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="mt-auto">
                            <h2 className="text-xl font-medium text-black">
                                SUMMER 2025
                            </h2>
                            <p className="text-sm text-black/70 max-w-sm pt-3 leading-relaxed tracking-tight">
                                <a
                                    href="https://kokonutui.com/"
                                    className="underline hover:text-black transition-colors"
                                >
                                    "The Bright Young"
                                </a>{" "}
                                draws inspiration from Anglomania,
                                redefining sartorial elegance and school
                                uniforms with a nod to British heritage.
                                Suits of the collection are tailored out of
                                English cloth...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
