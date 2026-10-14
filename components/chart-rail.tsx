"use client";

import { useEffect, useState } from "react";
import { CareerChart } from "@/components/career-chart";
import type { ChartView } from "@/lib/chart-data";

/**
 * Chooses which reading of the chart the rail should show, from the same
 * deterministic reference line the navbar uses: the last section whose top has
 * passed 32% of the viewport. An IntersectionObserver band would make the
 * answer depend on section height, which is exactly what left the nav stuck.
 *
 * The rail itself never unmounts — only `view` changes, which is what produces
 * the morph rather than a swap.
 */
export function ChartRail({ className }: { className?: string }) {
  const [view, setView] = useState<ChartView>("impact");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const referenceY = window.innerHeight * 0.32;
      const experience = document.getElementById("experience");
      const projects = document.getElementById("projects");

      let next: ChartView = "impact";
      if (projects && projects.getBoundingClientRect().top <= referenceY) next = "projects";
      else if (experience && experience.getBoundingClientRect().top <= referenceY) next = "timeline";

      setView((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <CareerChart view={view} className={className} />;
}
