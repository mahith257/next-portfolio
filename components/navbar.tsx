"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Empty while the hero is on screen: no section has been reached yet.
  const [activeSection, setActiveSection] = useState("");
  /** Click target awaiting its smooth scroll, shared by the click and scroll paths. */
  const pendingRef = useRef<{ href: string; at: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    /**
     * Active section is derived directly from scroll position rather than from
     * an IntersectionObserver. A narrow rootMargin band makes the reported
     * intersectionRatio depend on section height, so tall sections report
     * unexpected ratios and entries stop crossing the configured thresholds —
     * which left the nav pinned to a stale link. Measuring the last section
     * whose top has passed a reference line is deterministic at any height.
     */
    const computeActive = () => {
      frame = 0;

      const sections = navLinks
        .map((link) => document.querySelector<HTMLElement>(link.href))
        .filter((section): section is HTMLElement => section !== null);

      if (!sections.length) return;

      const referenceY = window.innerHeight * 0.3;

      // A click starts a smooth scroll that still passes through every
      // section. Keep the clicked link lit until its section actually reaches
      // the reference line, otherwise it visibly reverts mid-animation.
      const pending = pendingRef.current;
      if (pending) {
        const target = document.querySelector<HTMLElement>(pending.href);
        // Anchor jumps land the section at the top of the viewport (minus
        // scroll-padding), not on the reference line, so "arrived" means the
        // section sits between the top edge and the line — from either
        // direction — or the page can't scroll any further.
        const atEnd =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        const top = target?.getBoundingClientRect().top ?? 0;
        const arrived = target !== null && ((top > -48 && top <= referenceY) || atEnd);
        const expired = performance.now() - pending.at > 2000;

        if (arrived || expired) {
          pendingRef.current = null;
        } else {
          setActiveSection(pending.href);
          return;
        }
      }

      let next = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= referenceY) next = section.id;
      }

      // The final section can never reach the reference line when the footer
      // below it is short, so pin it once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) next = sections[sections.length - 1].id;

      const href = next ? `#${next}` : "";
      setActiveSection((current) => (current === href ? current : href));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(computeActive);
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      {/* Same container as <main> so the logo lines up with the content column. */}
      <nav className="mx-auto flex h-[4.5rem] w-full max-w-[104rem] items-center justify-between px-6 xl:px-10">
        <a href="#" className="group flex items-center gap-2 font-mono text-sm font-medium tracking-[-0.04em]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-acid-500/50 text-base text-acid-600 transition-transform duration-300 group-hover:rotate-90 dark:text-acid-400">
            @
          </span>
          <span>mahith</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href ? "page" : undefined}
              // Set immediately so the clicked link stays highlighted while the
              // smooth scroll is still animating; the scroll handler then keeps
              // it correct as the page settles.
              onClick={() => {
                pendingRef.current = { href: link.href, at: performance.now() };
                setActiveSection(link.href);
              }}
              className={`rounded-full px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] transition-colors ${activeSection === link.href ? "text-acid-600 dark:text-acid-400" : "text-muted-foreground hover:text-acid-600 dark:hover:text-acid-400"}`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px]">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="p-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={activeSection === link.href ? "page" : undefined}
                    // Same pending lock as the desktop links: without it the
                    // smooth scroll reverts the highlight before it settles.
                    onClick={() => {
                      pendingRef.current = { href: link.href, at: performance.now() };
                      setActiveSection(link.href);
                      setOpen(false);
                    }}
                    className={`text-lg font-medium transition-colors ${activeSection === link.href ? "text-acid-600 dark:text-acid-400" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
