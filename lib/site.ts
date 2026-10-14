import { experiences, personalInfo, skills } from "@/lib/data";

/**
 * The site's public address. Netlify sets URL to the primary domain at build
 * time (also on deploy previews, so canonicals always point at production);
 * NEXT_PUBLIC_SITE_URL overrides it on any other host.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Netlify sets CONTEXT to "production", "deploy-preview" or "branch-deploy".
 * Only production should be indexed; elsewhere (and locally) CONTEXT is unset,
 * which counts as production so `next build` output stays indexable.
 */
export const isIndexable = !process.env.CONTEXT || process.env.CONTEXT === "production";

export const siteDescription =
  "Sai Mahith Reddy Bekkem is a senior full-stack engineer, frontend-first, with 5+ years of experience building fast React and Next.js interfaces and the APIs and data layers behind them.";

const currentRole = experiences.find((experience) => /present/i.test(experience.period));

/** schema.org Person: ties the site to the same person as the linked profiles. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  alternateName: personalInfo.shortName,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.png`,
  jobTitle: personalInfo.title,
  description: siteDescription,
  email: `mailto:${personalInfo.email}`,
  ...(currentRole && {
    worksFor: { "@type": "Organization", name: currentRole.company },
  }),
  alumniOf: { "@type": "CollegeOrUniversity", name: personalInfo.education.school },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  knowsAbout: skills.flatMap((group) => group.skills),
  sameAs: [personalInfo.linkedin, personalInfo.github],
};
