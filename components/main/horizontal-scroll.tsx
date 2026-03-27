"use client";

import { useEffect, useRef, useCallback } from "react";

// Expose a global so the Navbar can scroll to a named panel without prop-drilling
declare global {
  interface Window {
    hsScrollTo?: (sectionId: string) => void;
  }
}

interface Props {
  children: React.ReactNode;
  /** ordered list of section ids matching the panel order */
  sectionIds: string[];
}

export default function HorizontalScroll({ children, sectionIds }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 769;

  // ── Helpers ────────────────────────────────────────────
  const panelWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 0;

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const maxScroll = () => {
    const el = trackRef.current;
    if (!el) return 0;
    return el.scrollWidth - el.clientWidth;
  };

  // index of the panel whose left edge is closest to currentX
  const currentPanelIndex = () => {
    const pw = panelWidth();
    if (!pw) return 0;
    return Math.round(currentXRef.current / pw);
  };

  // ── rAF lerp loop ─────────────────────────────────────
  const tick = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const diff = targetXRef.current - currentXRef.current;
    if (Math.abs(diff) < 0.5) {
      currentXRef.current = targetXRef.current;
      el.scrollLeft = currentXRef.current;
      rafRef.current = null;
      return;
    }
    currentXRef.current += diff * 0.1;        // lerp factor — tune for feel
    el.scrollLeft = currentXRef.current;
    // update progress bar
    const bar = document.getElementById("hs-progress-bar");
    if (bar) {
      const pct = (currentXRef.current / maxScroll()) * 100;
      bar.style.width = `${clamp(pct, 0, 100)}%`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startRaf = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Scroll to absolute X ───────────────────────────────
  const scrollToX = useCallback((x: number) => {
    targetXRef.current = clamp(x, 0, maxScroll());
    startRaf();
  }, [startRaf]);

  // ── Scroll to panel index ─────────────────────────────
  const scrollToPanel = useCallback((index: number) => {
    const count = sectionIds.length;
    const i = clamp(index, 0, count - 1);
    scrollToX(i * panelWidth());
  }, [sectionIds.length, scrollToX]);

  // ── Scroll to section by id ───────────────────────────
  const scrollToSection = useCallback((sectionId: string) => {
    const idx = sectionIds.indexOf(sectionId);
    if (idx !== -1) scrollToPanel(idx);
  }, [sectionIds, scrollToPanel]);

  useEffect(() => {
    // Expose globally for navbar
    window.hsScrollTo = scrollToSection;
    return () => { delete window.hsScrollTo; };
  }, [scrollToSection]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // ── Wheel → horizontal ────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;
      e.preventDefault();
      targetXRef.current = clamp(
        targetXRef.current + e.deltaY,
        0,
        maxScroll()
      );
      startRaf();
    };

    // ── Keyboard ──────────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (!isDesktop()) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToPanel(currentPanelIndex() + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToPanel(currentPanelIndex() - 1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startRaf, scrollToPanel]);

  return (
    <>
      {/* ── Progress bar ───────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          zIndex: 9999,
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div
          id="hs-progress-bar"
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, #00f5ff, #a855f7)",
            boxShadow: "0 0 8px #00f5ff",
            transition: "width 0.05s linear",
          }}
        />
      </div>


      {/* ── Scroll track ───────────────────────────────── */}
      <div
        ref={trackRef}
        className="hs-track"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",   // hidden — we drive scrollLeft manually
          overflowY: "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
}
