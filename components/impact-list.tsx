"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MARK_POINTS, impactMetrics, unitKeys, unitsForPoints, viewTitles } from "@/lib/chart-data";
import { cn } from "@/lib/utils";

/** Slots per row: 10 × 10 points = 100%, so the filled share reads as the value. */
const SLOTS = 100 / MARK_POINTS;

/**
 * The impact reading of the career chart for screens without the sticky rail.
 * Same data and unit as the rail, but in normal flow: each row is a label, its
 * value, and a 10-slot scale, and tapping a row reveals the claim behind it.
 */
export function ImpactList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-acid-600 dark:text-acid-400">
        {viewTitles.impact}
      </p>

      <ul className="mt-4 border-t border-border">
        {impactMetrics.map((metric) => {
          const filled = unitsForPoints(metric.value);
          const expanded = open === metric.id;

          return (
            <li key={metric.id} className="border-b border-border">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`impact-${metric.id}`}
                onClick={() => setOpen(expanded ? null : metric.id)}
                className="group w-full py-3 text-left"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    {metric.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3.5 w-3.5 text-muted-foreground transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </span>
                  <span className="font-mono text-sm font-medium text-acid-600 dark:text-acid-400">
                    {metric.display}
                  </span>
                </span>

                <span aria-hidden="true" className="mt-2.5 flex gap-1.5">
                  {Array.from({ length: SLOTS }, (_, slot) => (
                    <span
                      key={slot}
                      className={cn(
                        "h-2 w-2 rounded-full",
                        slot < filled ? "bg-acid-500" : "border border-foreground/20",
                      )}
                    />
                  ))}
                </span>
              </button>

              {expanded && (
                <p
                  id={`impact-${metric.id}`}
                  className="-mt-0.5 pb-3 text-xs leading-relaxed text-muted-foreground animate-in fade-in duration-200"
                >
                  {metric.source}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">
        {unitKeys.impact} · Tap a row for the source
      </p>
    </div>
  );
}
