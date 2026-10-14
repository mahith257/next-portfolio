"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ImpactList } from "@/components/impact-list";
import { cn } from "@/lib/utils";
import { experiences, personalInfo } from "@/lib/data";

const words = ["Full-stack", "engineer,", "frontend", "at", "heart."];
/** Words from this index on carry the accent: the "frontend-first" half of the claim. */
const ACCENT_FROM = 2;

// Mirrors the LinkedIn headline so both profiles tell the same story.
// Grouped like LinkedIn's "|" sections. Every group carries its own leading
// bar, so wherever the strip wraps each line still starts cleanly.
const proof = [
  ["React", "Next.js", "TypeScript"],
  ["Design systems", "Micro-frontends", "Performance"],
  ["5+ yrs"],
];

// Derived from the data so the hero can't drift from the Experience section.
const currentRole = experiences.find((experience) => /present/i.test(experience.period));

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-16 pt-28 sm:pb-20">
      {/* lg–xl: copy and chart side by side so the right half isn't empty.
          From xl the chart moves to the sticky rail and this collapses back. */}
      <div className="w-full lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-center lg:gap-12 xl:block">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-7 flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-acid-600 dark:text-acid-400"
          >
            <span className="h-px w-10 bg-current" />
            {personalInfo.positioning}
          </motion.div>

          <div className="overflow-hidden">
            {/* The name is the page's <h1> (below) — it's what people search for.
                The tagline keeps the display styling as a plain paragraph. */}
            <p className="max-w-4xl font-display text-[clamp(2.9rem,5.6vw,5.4rem)] leading-[0.9] tracking-[-0.035em]">
              {words.map((word, index) => (
                <span className="mr-[0.16em] inline-block overflow-hidden" key={word}>
                  <motion.span
                    className={cn("inline-block", index >= ACCENT_FROM && "text-acid-600 dark:text-acid-400")}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0.15 : 0.8,
                      delay: reduceMotion ? 0 : 0.18 + index * 0.11,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.72 }}
            className="mt-8 max-w-xl"
          >
            <h1 className="font-display text-xl leading-tight tracking-[-0.02em] sm:text-2xl">
              {personalInfo.name}
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build fast, well-crafted React and Next.js interfaces, and I&apos;m comfortable going
              down the stack to the APIs and data layers behind them. 5+ years shipping product
              {currentRole ? `, currently ${currentRole.role} at ${currentRole.company}` : ""}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.84 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#experience"
              className={cn(buttonVariants({ size: "lg" }), "paper-button h-12 gap-2 rounded-full px-6 text-base")}
            >
              See my experience <ArrowDownRight className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 gap-2 rounded-full bg-background/50 px-6 text-base backdrop-blur-sm",
              )}
            >
              <FileText className="h-4 w-4" /> Resume
            </a>
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Selected projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.95 }}
            aria-label="At a glance"
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {proof.map((group) => (
              <li
                key={group.join()}
                className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-l-2 border-acid-500/70 pl-2.5 leading-none"
              >
                {/* The dot trails its item, so a long group that wraps on a
                    phone ends a line with "·" rather than starting one. */}
                {group.map((item, index) => (
                  <span key={item} className="flex items-center gap-2.5 whitespace-nowrap">
                    {item}
                    {index < group.length - 1 && (
                      <span aria-hidden="true" className="text-acid-600 dark:text-acid-400">·</span>
                    )}
                  </span>
                ))}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Below xl the rail does not exist. The hero only ever shows the static
            impact reading, so it gets a flow-layout list instead of the
            absolutely-positioned morphing chart, which cramps in a short box. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.95 }}
          className="mt-11 max-w-xl lg:mt-0 xl:hidden"
        >
          <ImpactList />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.15 }}
        className="absolute bottom-7 right-6 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-acid-600 dark:hover:text-acid-400 sm:bottom-10 sm:right-10"
      >
        Scroll to explore <span className="animate-bounce text-base">↓</span>
      </motion.a>
    </section>
  );
}
