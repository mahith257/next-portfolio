"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A hairline ring that trails the pointer and fills with acid lime over
 * anything carrying a `data-cursor` label. Deliberately flat — the previous
 * amber version glowed, which belonged to the old signal theme.
 */
export function InkCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  // The ring has no position until the first pointer event; showing it before
  // then parks a half-visible circle in the top-left corner.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cursorRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      setVisible(true);
    };
    const pointerLeave = () => setVisible(false);
    const pointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      const next = target?.dataset.cursor ?? "";

      // "hide" lets a region suppress the ring entirely rather than fighting a
      // second cursor treatment.
      if (next === "hide") {
        cursorRef.current?.style.setProperty("opacity", "0");
        setLabel("");
        return;
      }

      cursorRef.current?.style.setProperty("opacity", "");
      setLabel(next);
    };

    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerover", pointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", pointerLeave);
    return () => {
      document.documentElement.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerover", pointerOver);
    };
  }, []);

  return (
    <div ref={cursorRef} aria-hidden="true" className={`ink-cursor ${label ? "ink-cursor-active" : ""} ${visible ? "" : "ink-cursor-hidden"}`}>
      <span>{label}</span>
    </div>
  );
}
