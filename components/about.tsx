"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { personalInfo, skills } from "@/lib/data";

const constellation = [
  { label: "React", left: "8%", top: "18%", size: "large" },
  { label: "Next.js", left: "52%", top: "8%", size: "medium" },
  { label: "Data UI", left: "70%", top: "34%", size: "large" },
  { label: "Systems", left: "25%", top: "48%", size: "medium" },
  { label: "Performance", left: "53%", top: "67%", size: "large" },
  { label: "DX", left: "8%", top: "82%", size: "small" },
] as const;

const capabilityNotes: Record<string, { description: string; signal: string }> = {
  Languages: {
    description: "The practical language layer for maintainable interfaces, tooling, and shared product vocabulary.",
    signal: "Build foundations",
  },
  Technologies: {
    description: "Component architecture and data flows that keep complex product surfaces fast and understandable.",
    signal: "Design product systems",
  },
  "UI Libraries & Styling": {
    description: "Reusable visual primitives with enough flexibility to stay expressive instead of template-like.",
    signal: "Make interfaces cohesive",
  },
  Testing: {
    description: "Confidence at the component boundary—where changing an interaction should stay safe and deliberate.",
    signal: "Protect quality",
  },
  Tools: {
    description: "The operational layer: shipping, observing, and improving the experience after release.",
    signal: "Operate in production",
  },
};

export function About() {
  const [activeCategory, setActiveCategory] = useState(skills[1].category);
  const reduceMotion = useReducedMotion();
  const activeGroup = skills.find((group) => group.category === activeCategory) ?? skills[0];
  const note = capabilityNotes[activeGroup.category];

  return (
    <section id="about" className="py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01 / ABOUT">A systems thinker.</SectionHeading>
        <div className="mt-12 grid gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl">{personalInfo.bio}</p>
            <div className="mt-8 border-l border-ktm-500/45 pl-5">
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-ktm-600 dark:text-ktm-400" />
                <div>
                  <p className="font-medium">{personalInfo.education.school}</p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">{personalInfo.education.degree}</p>
                  <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ktm-600 dark:text-ktm-400">{personalInfo.education.period}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
            className="constellation-shell"
          >
            <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Capability categories">
              {skills.map((group) => {
                const active = group.category === activeCategory;
                return (
                  <button
                    key={group.category}
                    type="button"
                    onClick={() => setActiveCategory(group.category)}
                    className={`rounded-full border px-3 py-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-all ${active ? "border-ktm-500 bg-ktm-500 text-white shadow-[0_0_24px_color-mix(in_oklch,var(--color-ktm-500)_35%,transparent)]" : "border-border bg-background/50 text-muted-foreground hover:border-ktm-500/50 hover:text-foreground"}`}
                    aria-pressed={active}
                  >
                    {group.category}
                  </button>
                );
              })}
            </div>

            <div className="constellation-field relative min-h-[22rem] overflow-hidden border-y border-border py-5 sm:min-h-[25rem]">
              <svg aria-hidden="true" className="constellation-lines absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M13 22 L56 12 L74 38 L30 52 L57 70 L12 84" />
                <path d="M56 12 L57 70" className="constellation-line-muted" />
                <path d="M30 52 L74 38" className="constellation-line-muted" />
              </svg>
              {constellation.map((node, index) => (
                <motion.span
                  key={node.label}
                  className={`constellation-node constellation-node-${node.size}`}
                  style={{ left: node.left, top: node.top }}
                  animate={activeCategory === "Technologies" && !reduceMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  transition={{ duration: 1.8, delay: index * 0.12, repeat: activeCategory === "Technologies" ? Infinity : 0 }}
                >
                  {node.label}
                </motion.span>
              ))}

            </div>

            <div className="mt-5 border-l border-ktm-500/45 pl-4" aria-live="polite">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ktm-600 dark:text-ktm-400">{note.signal}</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeGroup.category}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground"
                >
                  {note.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeGroup.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">{skill}</span>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              Select a capability group <ArrowUpRight className="h-3.5 w-3.5 text-ktm-600 dark:text-ktm-400" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
