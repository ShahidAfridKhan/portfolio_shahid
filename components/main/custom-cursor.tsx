"use client";

import { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);
  const isHovered = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onEnter = () => {
      isHovered.current = true;
      ring.classList.add("ring-hovered");
    };
    const onLeave = () => {
      isHovered.current = false;
      ring.classList.remove("ring-hovered");
    };

    // Lerp animation loop for outer ring
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.08);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.08);
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    // Attach hover detection on interactive elements
    const attachHover = () => {
      const els = document.querySelectorAll("a, button, [role='button'], .skill-card, .project-card, .cert-card, .achievement-card, .activity-card, .education-card");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return els;
    };
    let els = attachHover();

    // Re-attach after DOM changes (for dynamically rendered content)
    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      els = attachHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cyan dot — follows instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#00f5ff",
          boxShadow: "0 0 8px #00f5ff, 0 0 16px rgba(0,245,255,0.5)",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
        }}
      />
      {/* Outer ring — follows with lerp delay */}
      <div
        ref={ringRef}
        className="cursor-outer-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid #00f5ff",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease",
          willChange: "left, top",
        }}
      />
    </>
  );
};
