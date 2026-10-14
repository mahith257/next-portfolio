"use client";

import { useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  captions,
  getDetail,
  getLayout,
  getTimelineTicks,
  getNow,
  subscribeToClock,
  unitKeys,
  viewTarget,
  viewTitles,
  type ChartView,
  type ChartDetail,
  type MarkPlacement,
  type RowPlacement,
} from "@/lib/chart-data";

interface CareerChartProps {
  view: ChartView;
  className?: string;
}

/*
 * The morph cascades top-down instead of moving in lockstep: each band (row,
 * its guide, its marks) waits 26ms more than the band above it, so the figure
 * ripples over ~130ms while every element still lands within ~0.58s. The delay
 * rides a custom property so only left/top honour it — hover opacity and scale
 * stay immediate.
 */
const STAGGER_MS = 26;

/** A mark's position lives in container percentages, its emphasis in CSS vars. */
function markStyle(mark: MarkPlacement, activeIndex: number | null): CSSProperties {
  const isActive = activeIndex !== null && mark.owner === activeIndex;
  const style = {
    left: `${mark.left}%`,
    top: `${mark.top}%`,
    opacity: mark.visible ? (activeIndex === null || isActive ? 1 : 0.18) : 0,
    "--mark-scale": !mark.visible ? 0.2 : isActive ? 1.5 : 1,
    "--stagger": `${mark.owner * STAGGER_MS}ms`,
    ...(isActive ? { "--mark-bg": "var(--foreground)" } : {}),
  } as CSSProperties;
  return style;
}

function Detail({ detail }: { detail: ChartDetail }) {
  if (!detail) return null;

  if (detail.kind === "impact") {
    return (
      <>
        <p className="text-2xl leading-none font-semibold tracking-[-0.04em]">{detail.value}</p>
        <p className="mt-1.5 text-sm leading-snug text-foreground">{detail.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail.source}</p>
      </>
    );
  }

  if (detail.kind === "timeline") {
    return (
      <>
        <p className="text-base leading-snug font-semibold tracking-[-0.02em]">
          {detail.role} <span className="text-muted-foreground">at</span> {detail.company}
        </p>
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
          {detail.period}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{detail.impact}</p>
      </>
    );
  }

  return (
    <>
      <p className="text-base leading-snug font-semibold tracking-[-0.02em]">{detail.title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{detail.outcome}</p>
      <p className="mt-1.5 font-mono text-[0.58rem] tracking-[0.1em] text-muted-foreground">
        {detail.tech.join(" · ")}
      </p>
    </>
  );
}

/**
 * One chart, three readings. Rows, marks and guides are always mounted from a
 * fixed pool and merely re-positioned, so switching `view` produces a morph
 * rather than a re-render — the same 24 marks travel from a unit chart, into a
 * chronology, into columns.
 */
export function CareerChart({ view, className }: CareerChartProps) {
  const now = useSyncExternalStore(subscribeToClock, getNow, getNow);
  const layout = useMemo(() => getLayout(view, now), [view, now]);
  const ticks = useMemo(() => getTimelineTicks(now), [now]);
  const [active, setActive] = useState<{ view: ChartView; index: number } | null>(null);

  // Row indices only mean something inside the view that produced them, so a
  // view change invalidates the hover instead of leaving a row lit by mistake.
  const activeIndex = active && active.view === view ? active.index : null;
  const detail = getDetail(view, activeIndex, now);

  const leave = () => setActive(null);
  const enter = (index: number) => setActive({ view, index });

  return (
    <div className={className}>
      <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-acid-600 dark:text-acid-400">
          {viewTitles[view]}
      </p>

      <div className="career-chart">
        {layout.guides.map((guide, index) => (
          <span
            key={`guide-${index}`}
            aria-hidden="true"
            className="career-chart-guide"
            style={
              {
                left: `${guide.left}%`,
                top: `${guide.top}%`,
                width: `${guide.width}%`,
                opacity: guide.visible ? 1 : 0,
                "--stagger": `${index * STAGGER_MS}ms`,
              } as CSSProperties
            }
          />
        ))}

        {ticks.map((tick, index) => (
          <span
            key={`tick-${tick.label}`}
            aria-hidden="true"
            className="career-chart-tick absolute flex flex-col items-center gap-1 font-mono text-[0.5rem] tracking-[0.1em] text-muted-foreground"
            style={
              {
                left: `${tick.left}%`,
                top: "86%",
                transform: "translateX(-50%)",
                opacity: view === "timeline" ? 1 : 0,
                "--stagger": `${index * 30}ms`,
              } as CSSProperties
            }
          >
            <span className="h-1.5 w-px bg-border" />
            {tick.label}
          </span>
        ))}

        {layout.marks.map((mark, index) => (
          <span
            key={`mark-${index}`}
            aria-hidden="true"
            className="career-chart-mark"
            style={markStyle(mark, activeIndex)}
          />
        ))}

        {layout.rows.map((row, index) => (
          <RowButton
            key={`row-${index}`}
            row={row}
            index={index}
            view={view}
            active={activeIndex === index}
            onEnter={enter}
            onLeave={leave}
          />
        ))}
      </div>

      <div className="mt-3 border-t border-border pt-3" aria-live="polite">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-acid-600 dark:text-acid-400">
          {unitKeys[view]}
        </p>
        <div className="mt-2 min-h-[4.75rem]">
          {/* Keyed CSS enter animations rather than AnimatePresence mode="wait":
              when the view changes faster than the exit animation, "wait"
              can strand the previous view's text on screen. A remount
              can't go stale. */}
          <div
            key={detail ? `${view}-${activeIndex}` : `${view}-caption`}
            className="animate-in fade-in slide-in-from-bottom-1 duration-200 ease-out"
          >
            {detail ? (
              <Detail detail={detail} />
            ) : (
              <p className="text-xs leading-relaxed text-muted-foreground">{captions[view]}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface RowButtonProps {
  row: RowPlacement;
  index: number;
  view: ChartView;
  active: boolean;
  onEnter: (index: number) => void;
  onLeave: () => void;
}

function RowButton({ row, index, view, active, onEnter, onLeave }: RowButtonProps) {
  // Touch has no hover, so a tap would jump straight past the detail it is
  // meant to reveal. The first tap shows the detail; a second tap on the same
  // row navigates. Recorded on pointerdown, before the tap's focus event lights
  // the row and makes it look already active.
  const tapRevealsRef = useRef(false);

  // labelOffset is expressed against the container; the band is what the label
  // is positioned inside, so it has to be rebased before it can be used.
  const innerTop = row.height > 0 ? (row.labelOffset / row.height) * 100 : 0;
  const align = row.align === "center" ? "center" : "left";

  return (
    <button
      type="button"
      className="career-chart-row"
      style={
        {
          left: `${row.left}%`,
          top: `${row.top}%`,
          width: `${row.width}%`,
          height: `${row.height}%`,
          opacity: row.visible ? 1 : 0,
          pointerEvents: row.visible ? "auto" : "none",
          "--stagger": `${index * STAGGER_MS}ms`,
        } as CSSProperties
      }
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(index)}
      onBlur={onLeave}
      onPointerDown={(event) => {
        tapRevealsRef.current = event.pointerType !== "mouse" && !active;
      }}
      onClick={() => {
        if (tapRevealsRef.current) {
          tapRevealsRef.current = false;
          onEnter(index);
          return;
        }
        document.querySelector(viewTarget[view])?.scrollIntoView({ block: "start" });
      }}
      aria-label={row.label.replace("\n", " ")}
      tabIndex={row.visible ? 0 : -1}
    >
      <span
        className="pointer-events-none absolute inset-x-0 block"
        style={{ top: `${innerTop}%`, textAlign: align }}
      >
        <span
          key={`${view}-label-${row.id}`}
          className="block whitespace-pre-line text-[0.68rem] leading-[1.15] tracking-[-0.01em] text-foreground animate-in fade-in duration-200 ease-out"
        >
          {row.label}
        </span>
      </span>

      {row.value !== null && (
        <span
          className="pointer-events-none absolute block"
          style={
            row.align === "center"
              ? { top: 0, left: 0, right: 0, textAlign: "center" }
              : { top: `${innerTop}%`, right: 0, textAlign: "right" }
          }
        >
          <span
            key={`${view}-value-${row.id}`}
            className="block font-mono text-[0.66rem] font-medium tracking-[0.02em] text-acid-600 animate-in fade-in duration-200 ease-out dark:text-acid-400"
          >
            {row.value}
          </span>
        </span>
      )}
    </button>
  );
}
