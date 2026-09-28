"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { experiences } from "@/lib/data";

export function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02 / EXPERIENCE">Where I&apos;ve built.</SectionHeading>
        <div className="relative mt-14 pl-8 sm:pl-12">
          <div aria-hidden="true" className="absolute bottom-0 left-[0.42rem] top-3 w-px bg-border sm:left-[0.65rem]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[0.42rem] top-3 w-px origin-top bg-ktm-500 sm:left-[0.65rem]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: "easeOut" }}
            style={{ height: "calc(100% - 0.75rem)" }}
          />

          <div className="space-y-14">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.company}-${experience.role}`}
                className="relative"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.08 }}
              >
                <span aria-hidden="true" className="absolute left-[calc(-1.58rem-7.5px)] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-ktm-500 bg-background shadow-[0_0_0_5px_var(--background)] sm:left-[calc(-2.35rem-7.5px)]">
                  <span className={`h-1.5 w-1.5 rounded-full bg-ktm-500 ${index === 0 ? "animate-pulse" : ""}`} />
                </span>

                <div className="grid gap-7 border-b border-border pb-14 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ktm-600 dark:text-ktm-400">
                        {String(experiences.length - index).padStart(2, "0")} / {experience.period}
                      </p>
                      {index === 0 && <span className="rounded-full border border-ktm-500/50 bg-ktm-500/10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ktm-600 dark:text-ktm-400">Current signal</span>}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-4xl">
                      {experience.role} <span className="text-muted-foreground">at</span> {experience.company}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground sm:text-base">
                      <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-ktm-600 dark:text-ktm-400" /> Product engineering</span>
                      {experience.location && <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-ktm-600 dark:text-ktm-400" /> {experience.location}</span>}
                    </div>
                    <ul className="mt-7 grid gap-4">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="relative max-w-3xl pl-5 text-base leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.68rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-ktm-500">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <aside className="self-start border-l border-ktm-500/40 pl-4 lg:mt-10">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ktm-600 dark:text-ktm-400">Impact signal</p>
                    <p className="mt-3 text-lg leading-snug text-foreground">{experience.impact}</p>
                    <ArrowUpRight className="mt-4 h-4 w-4 text-ktm-600 dark:text-ktm-400" />
                  </aside>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
