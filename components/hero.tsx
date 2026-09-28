"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

const words = ["Frontend", "systems", "in", "motion."];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden px-6 pb-12 pt-28 sm:items-center sm:pb-16 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-7 flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ktm-600 dark:text-ktm-400"
          >
            <span className="h-px w-10 bg-current" />
            Full-stack engineer — frontend specialist
          </motion.div>

          <div className="overflow-hidden">
            <h1 className="max-w-4xl text-[clamp(3.3rem,9.4vw,8.8rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
              {words.map((word, index) => (
                <span className="mr-[0.16em] inline-block overflow-hidden" key={word}>
                  <motion.span
                    className={cn("inline-block", index === 3 && "text-ktm-600 dark:text-ktm-400")}
                    initial={{ y: reduceMotion ? 0 : "110%" }}
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
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.72 }}
            className="mt-10 max-w-xl"
          >
            <p className="text-xl leading-relaxed text-foreground/85 sm:text-2xl">{personalInfo.name}</p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              I design and ship React and Next.js experiences — and the APIs, data layers, and infrastructure behind them — where performance, data, and interaction work as one system.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.84 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#projects" className={cn(buttonVariants({ size: "lg" }), "signal-button h-12 gap-2 rounded-full px-6 text-base")}>
              Explore selected work <ArrowDownRight className="h-4 w-4" />
            </a>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 gap-2 rounded-full bg-background/50 px-6 text-base backdrop-blur-sm")}>
              <FileText className="h-4 w-4" /> Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.9 }}
          className="hidden w-48 lg:block"
        >
          <div className="border-l border-ktm-500/40 pl-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
            <p className="text-ktm-600 dark:text-ktm-400">System online</p>
            <p className="mt-3">01 / Design systems</p>
            <p className="mt-2">02 / Product interfaces</p>
            <p className="mt-2">03 / Data experiences</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.15 }}
        className="absolute bottom-7 right-6 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-ktm-600 dark:hover:text-ktm-400 sm:bottom-10 sm:right-10"
      >
        Scroll to explore <span className="animate-bounce text-base">↓</span>
      </motion.a>
    </section>
  );
}
