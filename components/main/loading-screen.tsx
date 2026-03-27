"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsType } from "three";

// ── 3D Particle Sphere ──────────────────────────────────────
function ParticleSphere() {
  const ref = useRef<PointsType | null>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    import("maath/random").then((random) => {
      const pts = random.inSphere(new Float32Array(3000), { radius: 1.4 });
      setPositions(pts as Float32Array);
    });
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.12;
      ref.current.rotation.y += delta * 0.18;
    }
  });

  if (!positions) return null;

  return (
    <group>
      {/* Cyan particles (inner sphere) */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00f5ff"
          size={0.012}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
}

// ── Floating background particles ──────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 8 + 6}s`,
    drift: `${(Math.random() - 0.5) * 80}px`,
  }));

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="loading-particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ["--px" as string]: p.drift,
          }}
        />
      ))}
    </>
  );
}

// ── Typewriter ──────────────────────────────────────────────
const TYPETEXT = "Initializing Portfolio...";

function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TYPETEXT.length) {
        setDisplayed(TYPETEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        color: "#00f5ff",
        fontSize: "1.1rem",
        letterSpacing: "0.02em",
      }}
    >
      {displayed}
      <span style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}>|</span>
    </div>
  );
}

// ── Main Loading Screen ─────────────────────────────────────
export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "fadeout">("loading");
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const DURATION_MS = 3000;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const raw = (elapsed / DURATION_MS) * 100;
      const clamped = Math.min(raw, 100);
      setProgress(clamped);

      if (clamped >= 100) {
        clearInterval(intervalRef.current!);
        // Start fade after reaching 100%
        setTimeout(() => {
          setPhase("fadeout");
          setTimeout(() => {
            setVisible(false);
            onCompleteRef.current();
          }, 600);
        }, 200);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loading-screen"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        transition: phase === "fadeout" ? "opacity 0.6s ease" : undefined,
        pointerEvents: phase === "fadeout" ? "none" : "all",
        position: "fixed",
        inset: 0,
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        gap: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Floating background particles */}
      <FloatingParticles />

      {/* 3D Sphere */}
      <div style={{ width: 280, height: 280, flexShrink: 0 }}>
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <Suspense fallback={null}>
            <ParticleSphere />
          </Suspense>
        </Canvas>
      </div>

      {/* Typewriter text */}
      <Typewriter />

      {/* Progress bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 300,
        }}
      >
        <div className="progress-track">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              transition: "width 0.03s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
