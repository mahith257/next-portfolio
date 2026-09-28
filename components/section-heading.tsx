"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  children: React.ReactNode;
  index?: string;
}

export function SectionHeading({ children, index }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center gap-4"
    >
      {index && <span className="font-mono text-[0.65rem] font-medium tracking-[0.18em] text-ktm-600 dark:text-ktm-400">{index}</span>}
      <h2 className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{children}</h2>
      <span className="h-px flex-1 bg-border" />
    </motion.div>
  );
}
