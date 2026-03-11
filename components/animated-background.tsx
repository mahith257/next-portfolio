"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const spotlightY = scrollY * 0.3;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Orange spotlight that follows scroll */}
      <div
        className="absolute left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, ${spotlightY}px)`,
          background:
            "radial-gradient(ellipse at center, var(--color-ktm-500) 0%, transparent 70%)",
          opacity: 0.08,
          filter: "blur(80px)",
        }}
      />

      {/* Secondary smaller spotlight offset */}
      <div
        className="absolute right-0 h-[400px] w-[400px] rounded-full transition-transform duration-1000 ease-out"
        style={{
          transform: `translateY(${spotlightY * 1.5 + 300}px)`,
          background:
            "radial-gradient(ellipse at center, var(--color-ktm-400) 0%, transparent 70%)",
          opacity: 0.06,
          filter: "blur(60px)",
        }}
      />

      {/* Edge fade so grid doesn't end abruptly */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,var(--background)_100%)]" />
    </div>
  );
}
