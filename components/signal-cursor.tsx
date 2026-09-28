"use client";

import { useEffect, useRef, useState } from "react";

export function SignalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      cursorRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
    };
    const pointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      setLabel(target?.dataset.cursor ?? "");
    };

    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerover", pointerOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerover", pointerOver);
    };
  }, []);

  return (
    <div ref={cursorRef} aria-hidden="true" className={`signal-cursor ${label ? "signal-cursor-active" : ""}`}>
      <span>{label}</span>
    </div>
  );
}
