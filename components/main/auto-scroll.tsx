'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const VERTICAL_IDS  = ['certifications', 'achievements', 'extracurricular', 'education', 'contact'];
const BASE_SPEED    = 0.8;    // px / frame
const SNAP_SPEED    = 0.2;    // px / frame while decelerating near section
const SNAP_THRESH   = 100;    // px  — start decelerating
const SNAP_HOLD_MS  = 2500;   // ms  — pause at each section
const FLASH_MS      = 600;    // ms  — heading glow flash

export default function AutoScroll() {
  const [isOn,     setIsOn    ] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ── internal refs ─────────────────────────────────────── */
  const isOnRef    = useRef(true);
  const pauseRef   = useRef(false);
  const speedRef   = useRef(BASE_SPEED);
  const rafRef     = useRef<number | null>(null);
  const mouseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapDone   = useRef<Set<string>>(new Set());
  const isSnapping = useRef(false);

  /* ── helpers ───────────────────────────────────────────── */
  const getSectionTop = (id: string) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
  };

  const verticalStart = () => {
    const el = document.getElementById('vertical-sections');
    return el ? el.getBoundingClientRect().top + window.scrollY : window.innerHeight;
  };

  const verticalEnd = () => {
    const el = document.getElementById('vertical-sections');
    return el ? el.getBoundingClientRect().bottom + window.scrollY : document.body.scrollHeight;
  };

  const flashHeading = (id: string) => {
    const el = document.getElementById(id);
    const h  = el?.querySelector<HTMLElement>('h1,h2,h3');
    if (!h) return;
    const prev = h.style.textShadow;
    h.style.transition  = 'text-shadow 0.3s ease';
    h.style.textShadow  = '0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.5)';
    setTimeout(() => { h.style.textShadow = prev; }, FLASH_MS);
  };

  const entryAnim = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity    = '0.3';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      });
    });
  };

  const resumeAfter = useCallback((ms: number, t: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (t.current) clearTimeout(t.current);
    pauseRef.current = true;
    setIsPaused(true);
    t.current = setTimeout(() => {
      if (!isSnapping.current) {
        pauseRef.current = false;
        setIsPaused(false);
      }
    }, ms);
  }, []);

  /* ── rAF tick ──────────────────────────────────────────── */
  const tick = useCallback(() => {
    rafRef.current = requestAnimationFrame(tick);
    if (!isOnRef.current || pauseRef.current || isSnapping.current) return;

    const vy     = window.scrollY;
    const vStart = verticalStart();
    if (vy < vStart - 60) return;                               // still in horizontal zone

    // Update progress bar
    const vEnd  = verticalEnd();
    const range = Math.max(vEnd - vStart, 1);
    setProgress(Math.min(1, Math.max(0, (vy - vStart) / range)));

    // Stop at bottom
    if (vy + window.innerHeight >= document.body.scrollHeight - 5) return;

    // Snap point check
    let nearSnap = false;
    for (const id of VERTICAL_IDS) {
      const top  = getSectionTop(id);
      const dist = top - vy;

      if (dist > 0 && dist < SNAP_THRESH) {
        speedRef.current = SNAP_SPEED;
        nearSnap = true;
      }

      // Arrived at section
      if (Math.abs(dist) < 30 && !snapDone.current.has(id)) {
        snapDone.current.add(id);
        isSnapping.current = true;
        window.scrollTo({ top, behavior: 'smooth' });
        flashHeading(id);
        entryAnim(id);
        setTimeout(() => {
          speedRef.current   = BASE_SPEED;
          isSnapping.current = false;
          pauseRef.current   = false;
          setIsPaused(false);
        }, SNAP_HOLD_MS);
        return;
      }
    }

    if (!nearSnap) speedRef.current = BASE_SPEED;
    window.scrollBy(0, speedRef.current);
  }, [resumeAfter]);

  /* ── mount ─────────────────────────────────────────────── */
  useEffect(() => {
    // Restore preference
    const saved = localStorage.getItem('autoScroll');
    if (saved === 'false') { isOnRef.current = false; setIsOn(false); }

    const onMouse = () => resumeAfter(3000, mouseTimer);
    const onWheel = () => resumeAfter(4000, wheelTimer);

    const onHoverIn  = () => { pauseRef.current = true; setIsPaused(true); };
    const onHoverOut = () => resumeAfter(2000, hoverTimer);

    const attachHover = () => {
      document.querySelectorAll('#vertical-sections button, #vertical-sections a, #vertical-sections article, #vertical-sections [class*="card"]')
        .forEach(el => {
          el.addEventListener('mouseenter', onHoverIn);
          el.addEventListener('mouseleave', onHoverOut);
        });
    };
    setTimeout(attachHover, 1500);

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('wheel',     onWheel, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('wheel',     onWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      [mouseTimer, wheelTimer, hoverTimer].forEach(t => { if (t.current) clearTimeout(t.current); });
    };
  }, [tick, resumeAfter]);

  /* ── toggle ────────────────────────────────────────────── */
  const toggle = () => {
    const next = !isOnRef.current;
    isOnRef.current = next;
    setIsOn(next);
    localStorage.setItem('autoScroll', String(next));
    if (!next) { pauseRef.current = false; setIsPaused(false); }
  };

  const jumpTo = (id: string) => {
    const top = getSectionTop(id);
    window.scrollTo({ top, behavior: 'smooth' });
    snapDone.current.delete(id);
  };

  const dotPcts = VERTICAL_IDS.map((_, i) => (i / (VERTICAL_IDS.length - 1)) * 100);

  return (
    <>
      {/* ── vertical progress bar ──────────────────── */}
      <div style={{
        position: 'fixed', right: '8px', top: '50%', transform: 'translateY(-50%)',
        width: '2px', height: '200px', background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px', zIndex: 500, pointerEvents: 'none',
      }}>
        {/* fill */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%',
          height: `${progress * 100}%`,
          background: 'linear-gradient(180deg,#00f5ff,#a855f7)',
          borderRadius: '2px', transition: 'height 0.12s linear',
          boxShadow: '0 0 6px rgba(0,245,255,0.4)',
        }} />
      </div>

      {/* ── section dot markers ─────────────────────── */}
      {VERTICAL_IDS.map((id, i) => (
        <button
          key={id}
          title={id}
          onClick={() => jumpTo(id)}
          style={{
            position: 'fixed', right: '5px',
            top: `calc(50% - 100px + ${dotPcts[i] * 2}px)`,
            width: '8px', height: '8px', borderRadius: '50%', border: 'none',
            background: progress >= dotPcts[i] / 100 - 0.02 ? '#00f5ff' : 'rgba(255,255,255,0.25)',
            cursor: 'pointer', padding: 0, zIndex: 501,
            boxShadow: progress >= dotPcts[i] / 100 - 0.02 ? '0 0 6px #00f5ff' : 'none',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        />
      ))}

      {/* ── pulse keyframe ──────────────────────────── */}
      <style>{`@keyframes cyanPulse{0%,100%{box-shadow:0 0 6px rgba(0,245,255,.4)}50%{box-shadow:0 0 18px rgba(0,245,255,.8)}}`}</style>

      {/* ── AUTO toggle ─────────────────────────────── */}
      <button
        onClick={toggle}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000,
          background: 'rgba(0,245,255,0.1)', border: '1px solid #00f5ff',
          borderRadius: '20px', color: '#00f5ff', fontSize: '11px',
          letterSpacing: '1px', padding: '8px 14px', cursor: 'pointer',
          animation: isOn ? 'cyanPulse 2s ease-in-out infinite' : 'none',
          backdropFilter: 'blur(8px)',
        }}
      >
        {isOn ? (isPaused ? '⏸ AUTO' : '⏸ AUTO') : '▶ AUTO'}
      </button>
    </>
  );
}
