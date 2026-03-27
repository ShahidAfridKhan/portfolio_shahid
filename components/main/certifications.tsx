"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CERTIFICATIONS } from "@/constants";

export const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="certifications" ref={ref} className="flex flex-col items-center justify-center py-20 px-6">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-2 mb-14"
            >
                <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">Credentials</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
                    My{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Certifications
                    </span>
                </h2>
            </motion.div>

            {/* Cert Cards */}
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center">
                {CERTIFICATIONS.map((cert, i) => (
                    <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        className="cert-card flex flex-col flex-1 min-w-[280px] rounded-2xl p-7"
                        style={{
                            background: "rgba(3, 0, 20, 0.6)",
                            border: "1px solid rgba(56, 189, 248, 0.25)",
                            backdropFilter: "blur(12px)",
                            transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                        }}
                    >
                        {/* Icon */}
                        <div className="text-5xl mb-4">{cert.icon}</div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-1 leading-snug">{cert.title}</h3>

                        {/* Issuer + Date */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-cyan-400 font-medium">{cert.issuer}</span>
                            <span className="text-gray-500 text-xs">•</span>
                            <span className="text-sm text-gray-400">{cert.date}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">{cert.description}</p>

                        {/* View Button */}
                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold text-white transition hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(112,66,248,0.3) 100%)",
                                border: "1px solid rgba(56,189,248,0.5)",
                            }}
                        >
                            View Certificate ↗
                        </a>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};
