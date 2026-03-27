"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsType } from "three";
import * as THREE from "three";

// ─── Natural Motion Particle Background (HTML Canvas) ────────────────────────────

function NaturalMotionParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Color palette: [r, g, b, baseAlpha]
    const PALETTE: [number, number, number, number][] = [
      [255, 255, 255, 0.8],  // pure white
      [0, 245, 255, 0.6],  // soft cyan
      [168, 85, 247, 0.4],  // light purple
    ];

    // 180 particles — first 36 (20%) are "deep" glow particles
    const particles = Array.from({ length: 180 }, (_, i) => {
      const deep = i < 36;
      const [r, g, b, baseAlpha] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // deep: 3–5px, normal: 1–3px
        radius: deep ? Math.random() * 2 + 3 : Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.6,   // maps to –0.3 … +0.3 /frame
        vy: (Math.random() - 0.5) * 0.6,
        r, g, b,
        baseAlpha,
        // individual pulse: random phase so none sync up
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.004,
        deep,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // ── Drift ─────────────────────────────────────────
        p.x += p.vx;
        p.y += p.vy;

        // Seamless edge wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // ── Pulse ──────────────────────────────────────────
        p.pulsePhase += p.pulseSpeed;
        // oscillates from 0.1 → baseAlpha → 0.1
        const alpha = 0.1 + (p.baseAlpha - 0.1) * (0.5 + 0.5 * Math.sin(p.pulsePhase));

        // ── Draw ───────────────────────────────────────────
        ctx.save();
        if (p.deep) {
          ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},${alpha * 0.9})`;
          ctx.shadowBlur = 8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Hero Canvas: Neon ribbon / swirling light trail ────────────────────────

function NeonRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);

  // useMemo ensures this only runs on the client — avoids SSR NaN in TubeGeometry
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    Array.from({ length: 80 }, (_, i) => {
      const t = (i / 79) * Math.PI * 4;
      return new THREE.Vector3(
        Math.cos(t) * 1.4 + Math.cos(t * 2.3) * 0.5,
        Math.sin(t) * 1.2 + Math.sin(t * 1.7) * 0.4,
        Math.sin(t * 0.9) * 0.8
      );
    }),
    true
  ), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.28;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 200, 0.012, 8, true]} />
      <meshStandardMaterial
        color="#00f5ff"
        emissive="#00f5ff"
        emissiveIntensity={2.5}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SecondaryRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);

  // useMemo ensures this only runs on the client — avoids SSR NaN in TubeGeometry
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    Array.from({ length: 60 }, (_, i) => {
      const t = (i / 59) * Math.PI * 4;
      return new THREE.Vector3(
        Math.sin(t * 1.3) * 1.1 + Math.cos(t * 2.1) * 0.35,
        Math.cos(t * 1.1) * 1.0 + Math.sin(t * 2.5) * 0.3,
        Math.cos(t * 1.4) * 0.7
      );
    }),
    true
  ), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 150, 0.008, 6, true]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={2.0}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const ref = useRef<PointsType | null>(null);
  const [sphere, setSphere] = useState<Float32Array | null>(null);

  useEffect(() => {
    import("maath/random").then((random) => {
      const raw = random.inSphere(new Float32Array(1200), { radius: 1.8 }) as Float32Array;
      // Sanitize NaN values so Three.js doesn't throw bounding-sphere errors
      for (let i = 0; i < raw.length; i++) {
        if (isNaN(raw[i])) raw[i] = 0;
      }
      setSphere(raw);
    });
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 14;
      ref.current.rotation.y -= delta / 18;
    }
  });

  if (!sphere) return null;
  return (
    <Points ref={ref} stride={3} positions={sphere} frustumCulled>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.004}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} color="#00f5ff" intensity={3} />
      <pointLight position={[-2, -2, 1]} color="#a855f7" intensity={2} />
      <NeonRibbon />
      <SecondaryRibbon />
      <FloatingParticles />
    </Canvas>
  );
}

// ─── Typewriter Hook ────────────────────────────────────────────────────────

const ROLES = [
  "Data Scientist",
  "Pattern Analyst",
  "Insight Engineer",
  "ML Practitioner",
];

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 40 : 70;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setRoleIdx((r) => (r + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return display;
}

// ─── Main Component ─────────────────────────────────────────────────────────

export const HeroContent = () => {
  const role = useTypewriter();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 mt-40 w-full z-[20] gap-12"
      style={{ position: "relative" }}
    >
      {/* Natural motion particle background */}
      <NaturalMotionParticles />
      {/* Left — Text Content */}
      <div id="about-me" className="h-full w-full flex flex-col gap-5 justify-center text-start max-w-2xl">
        {/* Badge */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.9] w-fit"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">Data Science &amp; AI Portfolio</h1>
        </motion.div>

        {/* Name */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="flex flex-col gap-2 mt-2"
        >
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(0.9rem, 2.4vw, 3.2rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.08,
              whiteSpace: "nowrap",
              background: "linear-gradient(90deg, #fff 30%, #00f5ff 65%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            SHAHID AFRID KHAN
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex items-center gap-2 text-lg"
          style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}
        >
          <span>{role}</span>
          <span className="typewriter-cursor" />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base lg:text-lg text-gray-400 my-5 max-w-[600px] leading-relaxed"
        >
          I study Computer Science with a focus on Data Science at Lovely Professional
          University. I love AI, automation, and building things that solve real problems —
          from intelligent agents to Android apps to data visualizations.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          variants={slideInFromLeft(0.9)}
          className="flex gap-6 mb-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {[
            { value: "3+", label: "Years" },
            { value: "10+", label: "Certs" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span style={{ color: "var(--cyan)", fontSize: "1.3rem", fontWeight: 700 }}>{s.value}</span>
              <span style={{ color: "#94a3b8", fontSize: "0.72rem", letterSpacing: "0.08em" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-fit">
          <motion.a
            variants={slideInFromLeft(1)}
            href="#projects"
            className="btn-cyan"
          >
            Enter the Universe →
          </motion.a>

          {/* Download CV Button (Mod 3 — keep as-is) */}
          <motion.a
            variants={slideInFromLeft(1.1)}
            href="/assets/resume.pdf"
            download
            className="cv-download-btn"
          >
            ⬇ Download CV
          </motion.a>
        </div>
      </div>

      {/* Right — 3D Neon Ribbon Canvas */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full max-w-[480px] h-[480px] flex justify-center items-center relative flex-shrink-0"
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,245,255,0.08) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Floating badge orbs (50+ Projects removed) */}
        <div
          className="hero-orb"
          style={{ width: 76, height: 76, bottom: "10%", right: "2%", animationDelay: "2s" }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#a855f7" }}>Python</span>
          <span style={{ fontSize: "0.5rem", color: "#94a3b8" }}>Expert</span>
        </div>
        <div
          className="hero-orb"
          style={{ width: 68, height: 68, bottom: "14%", left: "4%", animationDelay: "4s" }}
        >
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00FF78" }}>3+</span>
          <span style={{ fontSize: "0.5rem", color: "#94a3b8" }}>Years</span>
        </div>

        {/* Three.js Canvas — neon ribbon */}
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
          <HeroCanvas />
        </div>
      </motion.div>
    </motion.div>
  );
};
