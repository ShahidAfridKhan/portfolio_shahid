"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { EDUCATION } from "@/constants";

export const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="education" ref={ref} className="flex flex-col items-center justify-center py-20 px-6">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-2 mb-14"
            >
                <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">Academic Background</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
                    My{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Education
                    </span>
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative w-full max-w-3xl">
                {/* Vertical line */}
                <div
                    className="absolute left-6 top-0 bottom-0 w-0.5"
                    style={{ background: "linear-gradient(to bottom, rgba(168,85,247,0.8), rgba(56,189,248,0.4), transparent)" }}
                />

                <div className="flex flex-col gap-8">
                    {EDUCATION.map((edu, i) => (
                        <motion.div
                            key={edu.institution}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
                            className="relative pl-16"
                        >
                            {/* Dot */}
                            <div
                                className="absolute left-[19px] top-6 w-4 h-4 rounded-full border-2 flex-shrink-0"
                                style={{
                                    background: "#030014",
                                    borderColor: "#a855f7",
                                    boxShadow: "0 0 12px rgba(168,85,247,0.7)",
                                }}
                            />

                            {/* Card */}
                            <div
                                className="education-card rounded-2xl p-6"
                                style={{
                                    background: "rgba(3, 0, 20, 0.6)",
                                    border: "1px solid rgba(112, 66, 248, 0.25)",
                                    backdropFilter: "blur(12px)",
                                    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                                }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                                    <span className="text-sm text-gray-500 flex-shrink-0">{edu.duration}</span>
                                </div>

                                <div className="text-cyan-400 font-medium text-sm mb-1">{edu.degree}</div>
                                <div className="text-gray-500 text-sm mb-4">{edu.location}</div>

                                {/* Grade badge */}
                                <div
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                                    style={{
                                        background: "rgba(168,85,247,0.15)",
                                        border: "1px solid rgba(168,85,247,0.4)",
                                        color: "#c084fc",
                                    }}
                                >
                                    🎓 {edu.grade}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};
