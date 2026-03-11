"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { SectionHeading } from "@/components/section-heading";
import { personalInfo, skills } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading>About Me</SectionHeading>
        <div className="mt-10 grid gap-12 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {personalInfo.bio}
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-lg border bg-card p-5">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-ktm-600 dark:text-ktm-400" />
              <div>
                <p className="text-base font-medium">
                  {personalInfo.education.school}
                </p>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {personalInfo.education.degree}
                </p>
                <p className="text-sm text-muted-foreground">
                  {personalInfo.education.period}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="space-y-5">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ktm-600 dark:text-ktm-400 sm:text-sm">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
