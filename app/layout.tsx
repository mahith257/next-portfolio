import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { isIndexable, siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";

// Distinct variable names: globals.css maps these into Tailwind's --font-sans /
// --font-mono / --font-display. Reusing "--font-sans" here collides with the
// @theme definition and makes it self-referential, which resolves to
// guaranteed-invalid and silently falls the whole site back to Times.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// The editorial voice of the design: every headline on the site is set in this.
// "opsz" is requested so font-optical-sizing can pick a high-contrast cut at
// display sizes and a sturdier one at heading sizes.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Sai Mahith Reddy Bekkem | Senior Full Stack Engineer",
  description: siteDescription,
  keywords: [
    "Full Stack Engineer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Developer",
    "Sai Mahith Reddy Bekkem",
    "Mahith",
  ],
  authors: [{ name: "Sai Mahith Reddy Bekkem" }],
  openGraph: {
    title: "Sai Mahith Reddy Bekkem | Senior Full Stack Engineer",
    description: siteDescription,
    url: "/",
    siteName: "Sai Mahith Reddy Bekkem",
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Mahith Reddy Bekkem | Senior Full Stack Engineer",
    description: siteDescription,
  },
  robots: {
    index: isIndexable,
    follow: isIndexable,
  },
};

// Tints the mobile browser chrome to match the page background per mode.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#141619" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} antialiased`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
