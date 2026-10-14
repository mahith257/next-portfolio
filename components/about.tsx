"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { personalInfo, skills } from "@/lib/data";

/** One-line focus per skill group; a group without one just shows no subtitle. */
const groupFocus: Record<string, string> = {
  Languages: "Build foundations",
  Technologies: "Design product systems",
  "UI Libraries & Styling": "Make interfaces cohesive",
  Testing: "Protect quality",
  Tools: "Operate in production",
};

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-28">
      <div>
        <SectionHeading index="01 / ABOUT">A systems thinker.</SectionHeading>
        <div className="mt-12 grid gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl">{personalInfo.bio}</p>
            <div className="mt-8 border-l border-acid-500/45 pl-5">
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-acid-600 dark:text-acid-400" />
                <div>
                  <p className="font-medium">{personalInfo.education.school}</p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">{personalInfo.education.degree}</p>
                  <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-acid-600 dark:text-acid-400">{personalInfo.education.period}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Every group is listed at once rather than behind tabs, so the full
              stack is scannable without interaction. */}
          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
            className="border-t border-border"
          >
            {skills.map((group) => (
              <div
                key={group.category}
                className="grid gap-3 border-b border-border py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5"
              >
                <dt>
                  <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-acid-600 dark:text-acid-400">
                    {group.category}
                  </p>
                  {groupFocus[group.category] && (
                    <p className="mt-1 text-xs text-muted-foreground">{groupFocus[group.category]}</p>
                  )}
                </dt>
                <dd className="flex flex-wrap content-start items-start gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[0.8125rem] text-foreground/85 transition-colors hover:border-acid-500/60"
                    >
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
