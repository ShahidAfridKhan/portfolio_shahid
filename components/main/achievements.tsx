"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ACHIEVEMENTS } from "@/constants";

export const Achievements = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section id="achievements" ref={ref} className="flex flex-col items-center justify-center py-20 px-6">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-2 mb-14"
            >
                <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">Highlights</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
                    My{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                        Achievements
                    </span>
                </h2>
            </motion.div>

            {/* Achievement Cards */}
            <div className="flex flex-col gap-6 w-full max-w-4xl">
                {ACHIEVEMENTS.map((achievement, i) => (
                    <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.18, ease: "easeOut" }}
                        className="achievement-card flex items-start gap-6 rounded-2xl p-7"
                        style={{
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderLeft: `4px solid ${achievement.borderColor}`,
                            backdropFilter: "blur(12px)",
                            boxShadow: `0 0 20px ${achievement.borderColor}22`,
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                    >
                        {/* Emoji */}
                        <div className="text-5xl flex-shrink-0">{achievement.emoji}</div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                                <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                                {achievement.date && (
                                    <span className="text-xs text-gray-500 font-medium">{achievement.date}</span>
                                )}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};
