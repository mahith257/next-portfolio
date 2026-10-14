import { experiences, projects } from "@/lib/data";

/**
 * The chart is a *reading* of lib/data.ts, not a second source of claims.
 * Every number, role, period and technology below is parsed or transcribed
 * from that file; nothing is authored here.
 *
 * No three.js: the whole thing is absolutely-positioned DOM whose left/top
 * percentages are rewritten per view, so the CSS transition performs the morph.
 */

export type ChartView = "impact" | "timeline" | "projects";

/* ------------------------------------------------------------ view keying */

/** One mark = 10 percentage points of measured change. */
export const MARK_POINTS = 10;

/**
 * Fixed-size pool so marks keep their identity across views — React never
 * remounts them, each one simply travels to its new position. Sized to the
 * largest view (the timeline distributes all of it), so smaller views park the
 * surplus rather than destroy it.
 */
export const MARK_POOL = 24;
export const ROW_POOL = 6;
export const GUIDE_POOL = 6;

/**
 * Column charts need room to rise, so the projects view spans nearly the full
 * plot height — four units at this pitch matches the row rhythm of the other
 * two views instead of huddling in the bottom third.
 */
const PROJECT_BASELINE = 78;
const PROJECT_LEVEL_GAP = 16;

export function unitsForPoints(value: number): number {
  return Math.max(1, Math.round(value / MARK_POINTS));
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  display: string;
  source: string;
}

/** Six headline outcomes, each traceable to a bullet in lib/data.ts. */
export const impactMetrics: ImpactMetric[] = [
  {
    id: "session",
    label: "Session duration",
    value: 60,
    display: "+60%",
    source: "Intelligent caching across GraphQL + Apollo and REST + React Query.",
  },
  {
    id: "comprehension",
    label: "Data comprehension",
    value: 50,
    display: "+50%",
    source: "Reusable charts, maps and tables built on five visualization libraries.",
  },
  {
    id: "load",
    label: "Initial load time",
    value: 40,
    display: "−40%",
    source: "A virtualized infinite list built on react-window.",
  },
  {
    id: "effort",
    label: "UI development effort",
    value: 30,
    display: "−30%",
    source: "A design system on MUI primitives with shared tokens and variants.",
  },
  {
    id: "regressions",
    label: "Regression bugs",
    value: 30,
    display: "−30%",
    source: "A user-management micro frontend decoupled from the monolith.",
  },
  {
    id: "engagement",
    label: "User engagement",
    value: 20,
    display: "+20%",
    source: "Rendering and responsiveness work across core React products.",
  },
];

export const IMPACT_UNITS = impactMetrics.reduce(
  (total, metric) => total + unitsForPoints(metric.value),
  0,
);

/* --------------------------------------------------------------- timeline */

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** "Apr 2025" -> absolute month index. Returns null rather than throwing. */
function parseStamp(stamp: string): number | null {
  const match = /^([A-Z][a-z]{2})\s+(\d{4})$/.exec(stamp.trim());
  if (!match) return null;
  const month = MONTHS[match[1]];
  if (month === undefined) return null;
  return Number(match[2]) * 12 + month;
}

function monthIndexFromTime(ms: number): number {
  const date = new Date(ms);
  return date.getFullYear() * 12 + date.getMonth();
}

/** "Jul 2021 – Sep 2022" / "Apr 2025 – Present" -> inclusive month range. */
function parsePeriod(period: string, nowIndex: number): { start: number; end: number } | null {
  const parts = period.split(/[–-]/);
  if (parts.length !== 2) return null;

  const start = parseStamp(parts[0]);
  if (start === null) return null;

  const tail = parts[1].trim();
  const end = /^present$/i.test(tail) ? nowIndex : parseStamp(tail);
  if (end === null || end < start) return null;

  return { start, end };
}

export interface TimelineEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  impact: string;
  start: number;
  end: number;
}

/**
 * Newest first, so the top lane is the current/most recent role. Unparseable
 * periods are dropped instead of failing the render.
 * The caption reflects this and will be shown under the timeline figure.
 */
export function buildTimeline(nowMs: number): TimelineEntry[] {
  const nowIndex = monthIndexFromTime(nowMs);

  return experiences
    .map((experience, index) => {
      const range = parsePeriod(experience.period, nowIndex);
      if (!range) return null;
      return {
        id: `${experience.company}-${experience.role}-${index}`,
        company: experience.company,
        role: experience.role,
        period: experience.period,
        impact: experience.impact,
        start: range.start,
        end: range.end,
      } satisfies TimelineEntry;
    })
    .filter((entry): entry is TimelineEntry => entry !== null)
    .sort((a, b) => b.start - a.start || b.end - a.end);
}

/**
 * Splits a fixed total across weights, guaranteeing every entry gets at least
 * one mark — a three-month internship still has to be visible next to a
 * thirty-month role. Remainders go to the largest fractional parts first.
 */
export function distribute(total: number, weights: number[]): number[] {
  const count = weights.length;
  if (count === 0) return [];
  if (total < count) return weights.map(() => 1);

  const sum = weights.reduce((acc, weight) => acc + weight, 0);
  const raw = sum > 0 ? weights.map((weight) => (weight / sum) * total) : weights.map(() => total / count);

  const out = raw.map((value) => Math.floor(value));
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  let remaining = total - out.reduce((acc, value) => acc + value, 0);
  for (let cursor = 0; remaining > 0; cursor++, remaining--) {
    out[order[cursor % order.length].index] += 1;
  }

  // Floor can leave an entry at zero; steal from the largest so every row shows.
  for (let index = 0; index < count; index++) {
    if (out[index] > 0) continue;
    let donor = 0;
    for (let candidate = 1; candidate < count; candidate++) {
      if (out[candidate] > out[donor]) donor = candidate;
    }
    if (donor === index || out[donor] <= 1) break;
    out[donor] -= 1;
    out[index] = 1;
  }

  return out;
}

/* --------------------------------------------------------------- projects */

export interface ProjectMark {
  id: string;
  title: string;
  /** Split on the first space so column labels set on two centred lines. */
  lines: string[];
  outcome: string;
  tech: string[];
  units: number;
}

export const projectMarks: ProjectMark[] = projects.map((project) => {
  const [first, ...rest] = project.title.split(" ");
  return {
    id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: project.title,
    lines: rest.length ? [first, rest.join(" ")] : [first],
    outcome: project.outcome,
    tech: project.techStack,
    units: Math.max(1, project.techStack.length),
  };
});

/* ----------------------------------------------------------------- layout */

export interface RowPlacement {
  id: string;
  /** Band the whole row occupies; doubles as the pointer/keyboard target. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Distance from the band's top down to the label itself. */
  labelOffset: number;
  label: string;
  value: string | null;
  align: "left" | "center";
  visible: boolean;
}

export interface MarkPlacement {
  left: number;
  top: number;
  owner: number;
  visible: boolean;
}

export interface GuidePlacement {
  left: number;
  top: number;
  width: number;
  visible: boolean;
}

export interface AxisTick {
  left: number;
  label: string;
}

export interface ChartLayout {
  rows: RowPlacement[];
  marks: MarkPlacement[];
  guides: GuidePlacement[];
}

/** Park surplus entries on the last real one so they fade in place. */
function park<T extends { left: number; top: number }>(items: T[], filled: number, tail: Partial<T> = {}): void {
  const anchor = filled > 0 ? items[filled - 1] : null;
  for (let index = filled; index < items.length; index++) {
    Object.assign(items[index], tail, anchor ? { left: anchor.left, top: anchor.top } : {});
  }
}

function impactLayout(): ChartLayout {
  const rows: RowPlacement[] = Array.from({ length: ROW_POOL }, () => ({
    id: "", left: 0, top: 0, width: 100, height: 0, labelOffset: 0,
    label: "", value: null, align: "left", visible: false,
  }));

  impactMetrics.forEach((metric, index) => {
    const top = 12 + index * 12.8;
    rows[index] = {
      id: metric.id,
      left: 0,
      top: top - 3,
      width: 100,
      // Pitch is 12.8; one point under it keeps adjacent pointer bands from
      // overlapping while still enclosing label and marks.
      height: 12.4,
      labelOffset: 3,
      label: metric.label,
      value: metric.display,
      align: "left",
      visible: true,
    };
  });
  park(rows, impactMetrics.length, { visible: false });

  const marks: MarkPlacement[] = Array.from({ length: MARK_POOL }, () => ({
    left: 0, top: 0, owner: 0, visible: false,
  }));

  let cursor = 0;
  impactMetrics.forEach((metric, index) => {
    const baseTop = 12 + index * 12.8 + 6.8;
    for (let unit = 0; unit < unitsForPoints(metric.value); unit++) {
      marks[cursor++] = { left: 3 + unit * 11.5, top: baseTop, owner: index, visible: true };
    }
  });
  park(marks, cursor, { visible: false });

  const guides: GuidePlacement[] = Array.from({ length: GUIDE_POOL }, (_, index) => ({
    left: 0,
    top: index < impactMetrics.length ? 12 + index * 12.8 + 10.6 : 0,
    width: 100,      visible: index < impactMetrics.length,
    }));
  park(guides, impactMetrics.length, { visible: false });

  return { rows, marks, guides };
}

/**
 * Exported separately from the layout so the axis can stay mounted and simply
 * fade — otherwise the tick nodes unmount the moment the view changes and the
 * crossfade has nothing to fade out of.
 */
export function getTimelineTicks(nowMs: number): AxisTick[] {
  const entries = buildTimeline(nowMs);
  if (entries.length === 0) return [];

  const axisStart = Math.min(...entries.map((entry) => entry.start));
  const axisEnd = Math.max(...entries.map((entry) => entry.end));
  const span = Math.max(1, axisEnd - axisStart);
  const xOf = (month: number) => 4 + ((month - axisStart) / span) * 92;

  const ticks: AxisTick[] = [];
  for (let year = Math.ceil(axisStart / 12); year * 12 <= axisEnd; year++) {
    const at = year * 12;
    if (at >= axisStart && at <= axisEnd) ticks.push({ left: xOf(at), label: String(year) });
  }
  return ticks;
}

function timelineLayout(nowMs: number): ChartLayout {
  const entries = buildTimeline(nowMs);
  if (entries.length === 0) return impactLayout();

  const axisStart = Math.min(...entries.map((entry) => entry.start));
  const axisEnd = Math.max(...entries.map((entry) => entry.end));
  const span = Math.max(1, axisEnd - axisStart);
  const xOf = (month: number) => 4 + ((month - axisStart) / span) * 92;

  const rows: RowPlacement[] = Array.from({ length: ROW_POOL }, () => ({
    id: "", left: 0, top: 0, width: 100, height: 0, labelOffset: 0,
    label: "", value: null, align: "left", visible: false,
  }));

  entries.forEach((entry, index) => {
    const top = 12 + index * 15.5;
    rows[index] = {
      id: entry.id,
      left: 0,
      top: top - 3.5,
      width: 100,
      // Pitch is 15.5 — see the note on the impact band above.
      height: 14.5,
      labelOffset: 3.5,
      label: entry.company,
      value: entry.period,
      align: "left",
      visible: true,
    };
  });
  park(rows, entries.length, { visible: false });

  const marks: MarkPlacement[] = Array.from({ length: MARK_POOL }, () => ({
    left: 0, top: 0, owner: 0, visible: false,
  }));

  const weights = entries.map((entry) => entry.end - entry.start + 1);
  const counts = distribute(MARK_POOL, weights);

  let cursor = 0;
  entries.forEach((entry, index) => {
    const duration = entry.end - entry.start + 1;
    const count = counts[index];
    const laneTop = 12 + index * 15.5 + 7.5;
    for (let unit = 0; unit < count; unit++) {
      const month = entry.start + ((unit + 0.5) * duration) / count;
      marks[cursor++] = { left: xOf(month), top: laneTop, owner: index, visible: true };
    }
  });
  park(marks, cursor, { visible: false });

  const guides: GuidePlacement[] = Array.from({ length: GUIDE_POOL }, (_, index) => ({
    left: 4,
    top: index < entries.length ? 12 + index * 15.5 + 7.5 : 0,
    width: 92,
    visible: index < entries.length,
  }));
  park(guides, entries.length, { visible: false });

  return { rows, marks, guides };
}

function projectsLayout(): ChartLayout {
  const rows: RowPlacement[] = Array.from({ length: ROW_POOL }, () => ({
    id: "", left: 0, top: 0, width: 20, height: 0, labelOffset: 0,
    label: "", value: null, align: "center", visible: false,
  }));

  projectMarks.forEach((project, index) => {
    const centre = 10 + index * 20;
    // Each band runs from just above that column's tallest mark down past its
    // name, so the pointer target tracks the column it belongs to instead of
    // being one shared strip across all five.
    // Clearance is measured, not guessed: the mark's radius plus the label's
    // line box, so the count clears the dot it annotates at any rail width.
    const bandTop = PROJECT_BASELINE - (project.units - 1) * PROJECT_LEVEL_GAP - 4.5;
    const labelAt = 83;
    // The band has to run past the label's own box: the name is top-anchored at
    // labelAt and two lines of text spill below it, so stopping the band there
    // would leave the identifier itself unhovers.
    const bandBottom = 87.5;

    rows[index] = {
      id: project.id,
      left: centre - 10,
      top: bandTop,
      width: 20,
      height: bandBottom - bandTop,
      labelOffset: labelAt - bandTop,
      label: project.lines.join("\n"),
      value: String(project.units),
      align: "center",
      visible: true,
    };
  });
  park(rows, projectMarks.length, { visible: false });

  const marks: MarkPlacement[] = Array.from({ length: MARK_POOL }, () => ({
    left: 0, top: 0, owner: 0, visible: false,
  }));

  let cursor = 0;
  projectMarks.forEach((project, index) => {
    const centre = 10 + index * 20;
    for (let unit = 0; unit < project.units; unit++) {
      marks[cursor++] = {
        left: centre,
        top: PROJECT_BASELINE - unit * PROJECT_LEVEL_GAP,
        owner: index,
        visible: true,
      };
    }
  });
  park(marks, cursor, { visible: false });

  const levelCount = Math.max(...projectMarks.map((project) => project.units), 1);
  const guides: GuidePlacement[] = Array.from({ length: GUIDE_POOL }, (_, index) => ({
    left: 0,
    top: index < levelCount ? PROJECT_BASELINE - index * PROJECT_LEVEL_GAP : 0,
    width: 100,
    visible: index < levelCount,
  }));
  park(guides, levelCount, { visible: false });

  return { rows, marks, guides };
}

export function getLayout(view: ChartView, nowMs: number): ChartLayout {
  if (view === "timeline") return timelineLayout(nowMs);
  if (view === "projects") return projectsLayout();
  return impactLayout();
}

/* --------------------------------------------------------------- readouts */

export const unitKeys: Record<ChartView, string> = {
  impact: "One mark = 10 points of measured change",
  timeline: "One mark ≈ one unit of time in role",
  projects: "One mark = one technology in the stack",
};

export const viewTitles: Record<ChartView, string> = {
  impact: "Measured outcomes",
  timeline: "Where the work happened",
  projects: "Selected work",
};

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** "Six" for small counts, digits beyond ten — keeps captions in step with the data. */
function countWord(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}

export const captions: Record<ChartView, string> = {
  impact: `${countWord(impactMetrics.length)} outcomes quoted from the bullets below. Hover or tap a row to read the claim it came from.`,
  timeline: `${countWord(experiences.length)} roles, newest first. Hover or tap a lane for the role and its headline result.`,
  projects: `${countWord(projectMarks.length)} projects. Hover or tap a column to read what each one was built to do.`,
};

export interface ImpactDetail {
  kind: "impact";
  label: string;
  value: string;
  source: string;
}

export interface TimelineDetail {
  kind: "timeline";
  company: string;
  role: string;
  period: string;
  impact: string;
}

export interface ProjectDetail {
  kind: "projects";
  title: string;
  outcome: string;
  tech: string[];
}

export type ChartDetail = ImpactDetail | TimelineDetail | ProjectDetail | null;

export function getDetail(view: ChartView, index: number | null, nowMs: number): ChartDetail {
  if (index === null) return null;

  if (view === "impact") {
    const metric = impactMetrics[index];
    if (!metric) return null;
    return { kind: "impact", label: metric.label, value: metric.display, source: metric.source };
  }

  if (view === "timeline") {
    const entry = buildTimeline(nowMs)[index];
    if (!entry) return null;
    return {
      kind: "timeline",
      company: entry.company,
      role: entry.role,
      period: entry.period,
      impact: entry.impact,
    };
  }

  const project = projectMarks[index];
  if (!project) return null;
  return { kind: "projects", title: project.title, outcome: project.outcome, tech: project.tech };
}

/** Section a click on this view should land on. */
export const viewTarget: Record<ChartView, string> = {
  impact: "#experience",
  timeline: "#experience",
  projects: "#projects",
};

/* ------------------------------------------------------ environment clock */

let cachedNow: number | null = null;

/**
 * Read once per environment. On the server that pins the prerendered markup to
 * build time; on the client it reads visit time. useSyncExternalStore is what
 * makes the two safe to differ — React re-renders instead of flagging a
 * hydration mismatch, so a month passing between deploy and visit is invisible.
 */
export function getNow(): number {
  if (cachedNow === null) cachedNow = Date.now();
  return cachedNow;
}

export function subscribeToClock(): () => void {
  return () => {};
}
