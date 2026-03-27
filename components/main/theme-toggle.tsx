"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // On mount, read saved preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light-mode");
    }
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      onClick={toggle}
      style={{
        position: "fixed",
        top: "80px",
        left: "20px",
        zIndex: 1000,
        width: "56px",
        height: "28px",
        borderRadius: "14px",
        border: isDark ? "1px solid #00f5ff" : "1px solid #a855f7",
        background: isDark ? "#0a0a0a" : "#f0f0f0",
        display: "flex",
        alignItems: "center",
        padding: "3px",
        cursor: "pointer",
        transition: "background 0.3s ease, border-color 0.3s ease",
        boxShadow: isDark
          ? "0 0 10px rgba(0,245,255,0.25)"
          : "0 0 10px rgba(168,85,247,0.25)",
      }}
    >
      {/* Slider circle */}
      <span
        style={{
          position: "absolute",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          background: isDark ? "#00f5ff" : "#a855f7",
          boxShadow: isDark
            ? "0 0 8px rgba(0,245,255,0.6)"
            : "0 0 8px rgba(168,85,247,0.6)",
          left: isDark ? "30px" : "3px",
          transition: "left 0.3s ease, background 0.3s ease",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
