"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
// Static export bakes the server snapshot in at build time; the client snapshot
// replaces it with the visitor's year, so the footer never goes stale between
// deploys. useSyncExternalStore re-renders on mismatch instead of erroring.
const BUILD_YEAR = new Date().getFullYear();

export function CurrentYear() {
  return <>{useSyncExternalStore(subscribe, getYear, () => BUILD_YEAR)}</>;
}
