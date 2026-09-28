import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sai Mahith Reddy Bekkem | Senior Full Stack Engineer",
  description:
    "Senior Full Stack Engineer with 5 years of experience architecting and scaling React and Next.js applications, from performant interfaces to the APIs and data layers behind them.",
  keywords: [
    "Full Stack Engineer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Developer",
    "Sai Mahith Reddy Bekkem",
  ],
  authors: [{ name: "Sai Mahith Reddy Bekkem" }],
  openGraph: {
    title: "Sai Mahith Reddy Bekkem | Senior Full Stack Engineer",
    description:
      "Senior Full Stack Engineer with 5 years of experience architecting and scaling React and Next.js applications, from performant interfaces to the APIs and data layers behind them.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Mahith Reddy Bekkem | Senior Full Stack Engineer",
    description:
      "Senior Full Stack Engineer with 5 years of experience architecting and scaling React and Next.js applications, from performant interfaces to the APIs and data layers behind them.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
