"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  return (
    <section className="flex min-h-[100dvh] items-center justify-center px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl"
      >
        <motion.p
          variants={item}
          className="mb-4 font-mono text-base text-ktm-600 dark:text-ktm-400"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          {personalInfo.name.split(" ").map((word, i) => (
            <span
              key={i}
              className={
                word === "Mahith"
                  ? "text-ktm-600 dark:text-ktm-400"
                  : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-xl text-muted-foreground sm:text-2xl lg:text-3xl"
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          I architect and scale high-performance React & Next.js applications
          with a focus on elegant UI, optimized rendering, and exceptional user
          experiences.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 gap-2 px-6 text-base"
            )}
          >
            <FileText className="h-5 w-5" />
            View Resume
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 gap-2 px-6 text-base"
            )}
          >
            <ArrowDown className="h-5 w-5" />
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
