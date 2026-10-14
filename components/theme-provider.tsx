"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * reducedMotion="user" lets framer-motion drop transform animations for users
 * who ask for less motion. Components must NOT branch their `initial` values
 * on useReducedMotion(): the server always renders the no-preference value, so
 * a client-side branch produces a hydration mismatch on the inline styles.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
