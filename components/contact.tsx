"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading>Get in Touch</SectionHeading>
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

          <a
            href={`mailto:${personalInfo.email}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 gap-2 px-6 text-base"
            )}
          >
            <Mail className="h-5 w-5" />
            Say Hello
          </a>

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
