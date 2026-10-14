import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { AnimatedBackground } from "@/components/animated-background";
import { InkCursor } from "@/components/ink-cursor";
import { ChartRail } from "@/components/chart-rail";
import { personJsonLd } from "@/lib/site";

/**
 * The chart rail only exists from xl up: below that the content columns
 * (Experience in particular runs a 1fr + 13rem split) would be squeezed into an
 * unreadable measure. Under xl the chart is rendered inline in the hero instead.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static data from lib/data.ts; "<" is escaped so no string can close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <AnimatedBackground />
      <InkCursor />
      <Navbar />
      <main>
        <div className="mx-auto w-full max-w-[104rem] px-6 xl:grid xl:grid-cols-[minmax(0,1fr)_21rem] xl:gap-12 xl:px-10">
          <div className="min-w-0">
            <Hero />
            <About />
            <Experience />
            <Projects />
          </div>

          <aside className="relative hidden xl:block" aria-label="Career chart">
            <div className="sticky top-[6.5rem] flex h-[calc(100dvh-8.5rem)] flex-col justify-center py-4">
              <ChartRail className="flex min-h-0 flex-1 flex-col" />
            </div>
          </aside>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
