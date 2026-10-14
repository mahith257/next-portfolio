"use client";

/**
 * Washed ground: a faint acid-lime bloom plus grain so the page reads as
 * material rather than a flat hex value. Sits behind everything at -z-10, so the
 * grain never sits on top of content.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(72rem_circle_at_78%_14%,color-mix(in_oklch,var(--color-acid-500)_7%,transparent),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(56rem_circle_at_12%_88%,color-mix(in_oklch,var(--foreground)_5%,transparent),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-multiply dark:opacity-[0.09] dark:mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
