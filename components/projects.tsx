"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import type { Project } from "@/lib/data";
import { projects } from "@/lib/data";

const layouts = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-12"];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03 / SELECTED WORK">Things I&apos;ve built.</SectionHeading>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A selection of product ideas and interfaces built to make real interactions feel clear, responsive, and satisfying.
        </p>

        <div className="mt-12 grid gap-x-5 gap-y-10 md:grid-cols-12">
          {projects.map((project, index) => (
            <motion.button
              type="button"
              key={project.title}
              onClick={() => setSelectedProject(project)}
              data-cursor="VIEW"
              className={`project-card group relative text-left ${layouts[index]}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : (index % 2) * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden border border-border bg-card">
                <motion.div layoutId={`project-image-${project.title}`} className="absolute inset-0">
                  <Image src={project.image} alt="" fill className="object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 58vw" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/5 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/65 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-background/70 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-ktm-600 dark:group-hover:text-ktm-400">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.outcome}</p>
                </div>
                <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">Open</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 px-5 py-5 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} case study`}
          >
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ktm-600 dark:text-ktm-400">Case study / {selectedProject.title}</p>
                <button type="button" onClick={() => setSelectedProject(null)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-ktm-500 hover:text-foreground" aria-label="Close case study">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.22fr_0.78fr] lg:items-start">
                <motion.div layoutId={`project-image-${selectedProject.title}`} className="relative aspect-[16/10] overflow-hidden border border-border bg-card">
                  <Image src={selectedProject.image} alt={`${selectedProject.title} preview`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 62vw" priority />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.18 }}>
                  <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{selectedProject.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{selectedProject.description}</p>
                  <div className="mt-8 border-l border-ktm-500/45 pl-4">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-ktm-600 dark:text-ktm-400">Result</p>
                    <p className="mt-2 text-xl leading-snug">{selectedProject.outcome}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => <span key={tech} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground">{tech}</span>)}
                  </div>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="signal-button inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">View live project <ArrowUpRight className="h-4 w-4" /></a>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-ktm-500">Source code <Github className="h-4 w-4" /></a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
