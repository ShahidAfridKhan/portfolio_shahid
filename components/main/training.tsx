"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const Training = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="training" ref={ref} className="flex flex-col items-center justify-center py-20 px-6">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-2 mb-14"
            >
                <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">Hands-On Experience</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
                    My{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Training
                    </span>
                </h2>
            </motion.div>

            {/* Training Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-3xl rounded-2xl p-8"
                style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(112, 66, 248, 0.4)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 40px rgba(112, 66, 248, 0.15), 0 0 80px rgba(56,189,248,0.08)",
                }}
            >
                {/* Tech Logos Row */}
                <div className="flex items-center gap-4 mb-6">
                    {[
                        {
                            name: "Android",
                            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
                        },
                        {
                            name: "Kotlin",
                            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
                        },
                        {
                            name: "XML",
                            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg",
                            fallback: "📄",
                        },
                    ].map((tech) => (
                        <div
                            key={tech.name}
                            className="flex items-center justify-center w-14 h-14 rounded-xl"
                            title={tech.name}
                            style={{
                                background: "rgba(112,66,248,0.12)",
                                border: "1px solid rgba(112,66,248,0.3)",
                            }}
                        >
                            {tech.fallback ? (
                                <span className="text-2xl">{tech.fallback}</span>
                            ) : (
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        target.nextElementSibling!.textContent = tech.name[0];
                                    }}
                                />
                            )}
                        </div>
                    ))}
                    <div
                        className="ml-2 text-xs px-3 py-1 rounded-full font-semibold"
                        style={{
                            background: "rgba(16,185,129,0.15)",
                            border: "1px solid rgba(16,185,129,0.4)",
                            color: "#10b981",
                        }}
                    >
                        Summer Internship
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">Android App Development — Summer Internship</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-base">
                    I completed a summer internship where I built real Android applications using Kotlin for the app logic and XML for designing the UI screens. I worked in a team of five developers and delivered features like user authentication, diary entry management, voice-based unlock, and a smooth navigation experience — all under tight real-world deadlines.
                </p>
            </motion.div>
        </section>
    );
};
