"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ACTIVITIES = [
  {
    icon: "🎨",
    title: "Graphic Design — Adobe Photoshop",
    description:
      "I enjoy designing visuals, editing photos, and creating graphics using Adobe Photoshop. It helps me think visually and brings a design eye to everything I build.",
  },
  {
    icon: "🏏",
    title: "Cricket — Pace Bowler",
    description:
      "Cricket is my sport. I play as a pace bowler and love the discipline, teamwork, and competitive mindset the game builds — skills that carry directly into how I approach technical challenges.",
  },
];

export const Extracurricular = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="extracurricular" ref={ref} className="flex flex-col items-center justify-center py-20 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2 mb-14"
      >
        <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">Beyond the Code</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
          Extracurricular{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Activities
          </span>
        </h2>
      </motion.div>

      {/* Activity Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
        {ACTIVITIES.map((activity, i) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="activity-card flex flex-col flex-1 min-w-[260px] rounded-2xl p-7"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(112, 66, 248, 0.25)",
              backdropFilter: "blur(12px)",
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div className="text-5xl mb-4">{activity.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{activity.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{activity.description}</p>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
