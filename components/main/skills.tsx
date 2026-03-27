"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_CARDS = [
  // Programming Languages
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Language" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Language" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", category: "Language" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Language" },
  // Frameworks & Libraries
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Framework" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Framework" },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "Library" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "Library" },
  // Tools & Platforms
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Tool" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tool" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "Tool" },
  { name: "Power BI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pbi/pbi-original.svg", category: "Tool", fallback: "📊" },
  { name: "IntelliJ IDEA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", category: "Tool" },
];

const SOFT_SKILLS = [
  { emoji: "🧠", label: "Problem-Solving" },
  { emoji: "🤝", label: "Team Collaboration" },
  { emoji: "⏰", label: "Time Management" },
  { emoji: "🔄", label: "Adaptability" },
];

function SkillCard({ name, icon, index, fallback }: { name: string; icon: string; index: number; fallback?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="skill-card flex flex-col items-center justify-center p-5 rounded-xl cursor-default select-none group"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(112, 66, 248, 0.25)",
        backdropFilter: "blur(10px)",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {fallback ? (
        <span className="text-4xl mb-3">{fallback}</span>
      ) : (
        <img
          src={icon}
          alt={name}
          width={56}
          height={56}
          className="mb-3 object-contain"
          style={{ filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      )}
      <span className="text-sm text-gray-300 font-medium text-center">{name}</span>
    </motion.div>
  );
}

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="skills"
      ref={ref}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20 px-6"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2 mb-10"
      >
        <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">What I Know</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Skills
          </span>
        </h2>
      </motion.div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-5xl w-full">
        {SKILL_CARDS.map((skill, i) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            index={i}
            fallback={(skill as any).fallback}
          />
        ))}
      </div>

      {/* Soft Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <h3 className="text-lg text-gray-400 font-medium">Soft Skills</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {SOFT_SKILLS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm text-gray-200 font-medium"
              style={{
                background: "rgba(112,66,248,0.15)",
                border: "1px solid rgba(112,66,248,0.35)",
              }}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Skills Ticker ─────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: marquee 25s linear infinite; }
        .ticker-wrap:hover .ticker-track { animation-play-state: paused; }
      `}</style>

      <div
        className="ticker-wrap"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "64px",
          background: "rgba(0,245,255,0.05)",
          borderTop: "1px solid rgba(0,245,255,0.2)",
          borderBottom: "1px solid rgba(0,245,255,0.2)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          /* fade mask edges */
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Doubled list for seamless loop */}
        <div
          className="ticker-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {[...Array(2)].map((_, pass) => (
            <span key={pass} style={{ display: "flex", alignItems: "center" }}>
              {SKILL_CARDS.map((s) => (
                <span key={`${pass}-${s.name}`} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span
                    style={{
                      color: "#00f5ff",
                      fontSize: "15px",
                      fontWeight: 600,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      padding: "0 28px",
                    }}
                  >
                    {s.name}
                  </span>
                  <span
                    style={{
                      color: "#00f5ff",
                      fontSize: "18px",
                      opacity: 0.6,
                      textShadow: "0 0 8px #00f5ff",
                    }}
                  >
                    ·
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Background video */}
      <div className="w-full h-full absolute -z-10">
        <div className="w-full h-full opacity-20 absolute flex items-center justify-center">
          <video className="w-full h-auto" preload="false" playsInline loop muted autoPlay>
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>

    </section>
  );
};
