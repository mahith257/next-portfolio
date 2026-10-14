"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  index?: string;
  align?: "left" | "center";
}

/**
 * Below sm the index sits above the title: side by side, the index wraps onto
 * two lines and squeezes the title into a narrow column on small phones.
 */
export function SectionHeading({ children, index, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
        centered ? "items-center sm:justify-center" : "items-start",
      )}
    >
      {index && (
        <span className="shrink-0 font-mono text-[0.65rem] font-medium tracking-[0.18em] text-acid-600 dark:text-acid-400">
          {index}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl">{children}</h2>
      {!centered && <span aria-hidden="true" className="hidden h-px flex-1 bg-border sm:block" />}
    </motion.div>
  );
}
