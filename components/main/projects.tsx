"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "@/constants";

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="project-card flex flex-col rounded-2xl overflow-hidden p-6 flex-1 min-w-[280px] max-w-[420px]"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(112, 66, 248, 0.25)",
        backdropFilter: "blur(12px)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Category tag */}
      <div className="mb-3">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: "rgba(56,189,248,0.15)",
            border: "1px solid rgba(56,189,248,0.4)",
            color: "#38bdf8",
          }}
        >
          {project.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 leading-snug">{project.title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-md text-purple-300"
            style={{
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.3)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition hover:scale-105"
        style={{
          background: "linear-gradient(135deg, rgba(112,66,248,0.4) 0%, rgba(56,189,248,0.4) 100%)",
          border: "1px solid rgba(112,66,248,0.5)",
        }}
      >
        View on GitHub ↗
      </a>
    </motion.div>
  );
}

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects" ref={ref} className="flex flex-col items-center justify-center py-20 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2 mb-14"
      >
        <span className="text-sm text-purple-400 font-semibold tracking-widest uppercase">What I&apos;ve Built</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Projects
          </span>
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center flex-wrap">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

    </section>
  );
};
