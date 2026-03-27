"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/main/custom-cursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("@/components/main/loading-screen").then((m) => ({ default: m.LoadingScreen })),
  { ssr: false }
);

export default function ClientProviders() {
  const [showLoading, setShowLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const alreadyLoaded = sessionStorage.getItem("portfolio_loaded");
    if (!alreadyLoaded) {
      setShowLoading(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("portfolio_loaded", "true");
    setShowLoading(false);
  };

  if (!mounted) return null;

  return (
    <>
      <CustomCursor />
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
    </>
  );
}
