"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

export function Contact() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  const pullSignal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  return (
    <section id="contact" className="py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading index="04 / CONTACT">Send a signal.</SectionHeading>
        <motion.div
          className="mt-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities. Feel free to reach out!
          </p>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <Mail className="h-5 w-5" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="transition-colors hover:text-foreground"
              >
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <Phone className="h-5 w-5" />
              <span>{personalInfo.phone}</span>
            </div>
          </div>

          <motion.a
            href={`mailto:${personalInfo.email}`}
            data-cursor="EMAIL"
            onMouseMove={pullSignal}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            style={{ x: springX, y: springY }}
            className={cn(
              buttonVariants({ size: "lg" }),
              "signal-button h-12 gap-2 rounded-full px-6 text-base"
            )}
          >
            <Mail className="h-5 w-5" />
            Send a signal
          </motion.a>

          <div className="flex justify-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-lg" }),
                "text-ktm-600 hover:text-ktm-500 dark:text-ktm-400 dark:hover:text-ktm-400/80"
              )}
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-lg" }),
                "text-ktm-600 hover:text-ktm-500 dark:text-ktm-400 dark:hover:text-ktm-400/80"
              )}
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
