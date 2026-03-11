"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { SectionHeading } from "@/components/section-heading";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading>Where I&apos;ve Worked</SectionHeading>
        <motion.div className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Tabs
            defaultValue="0"
            orientation="vertical"
            className="flex flex-col gap-8 md:flex-row"
          >
            <TabsList className="flex h-auto w-full flex-col gap-2 overflow-hidden bg-transparent p-0 md:w-52 md:shrink-0 md:items-stretch">
              {experiences.map((exp, i) => (
                <TabsTrigger
                  key={i}
                  value={String(i)}
                  className="shrink-0 justify-start whitespace-nowrap rounded-lg px-4 py-3 text-left text-base text-muted-foreground after:hidden hover:bg-muted hover:text-foreground data-active:bg-ktm-500 data-active:text-white data-active:shadow-md dark:hover:bg-muted dark:data-active:bg-ktm-500 dark:data-active:text-white"
                >
                  {exp.company}
                  {i === 0 && " (Current)"}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-w-0 flex-1">
              {experiences.map((exp, i) => (
                <TabsContent key={i} value={String(i)} className="mt-0">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {exp.role}{" "}
                        <span className="text-ktm-600 dark:text-ktm-400">
                          @ {exp.company}
                        </span>
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-base text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        {exp.period}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                    </div>

                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="relative pl-6 text-base leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-ktm-500"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
