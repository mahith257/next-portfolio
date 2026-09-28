"use client";

import { useEffect, useState } from "react";

type Pointer = { x: number; y: number };

const nodes = [
  { x: 10, y: 18, size: 4, delay: "0s" },
  { x: 26, y: 36, size: 6, delay: "-1.2s" },
  { x: 45, y: 14, size: 4, delay: "-2.4s" },
  { x: 61, y: 44, size: 5, delay: "-0.5s" },
  { x: 81, y: 21, size: 4, delay: "-3s" },
  { x: 89, y: 63, size: 6, delay: "-1.8s" },
  { x: 35, y: 78, size: 4, delay: "-2s" },
  { x: 13, y: 71, size: 5, delay: "-0.8s" },
];

export function AnimatedBackground() {
  const [pointer, setPointer] = useState<Pointer>({ x: 50, y: 28 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };
    const updateScroll = () => setScrollY(window.scrollY);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      style={
        {
          "--pointer-x": `${pointer.x}%`,
          "--pointer-y": `${pointer.y}%`,
          "--scroll-offset": `${Math.min(scrollY * 0.08, 140)}px`,
        } as React.CSSProperties
      }
    >
      <div className="signal-grid absolute inset-0" />
      <div className="signal-spotlight absolute inset-0" />
      <div className="signal-orbit signal-orbit-one" />
      <div className="signal-orbit signal-orbit-two" />

      <svg className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path className="signal-line" d="M10 18 L26 36 L45 14 L61 44 L81 21" />
        <path className="signal-line signal-line-muted" d="M13 71 L35 78 L61 44 L89 63" />
        <path className="signal-line signal-line-muted" d="M26 36 L13 71" />
      </svg>

      {nodes.map((node) => (
        <span
          key={`${node.x}-${node.y}`}
          className="signal-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            animationDelay: node.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_68%_at_50%_35%,transparent_30%,var(--background)_100%)]" />
    </div>
  );
}
