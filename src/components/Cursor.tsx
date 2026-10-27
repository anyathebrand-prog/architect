"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Small dot that grows into a labelled disc over [data-cursor="View" | "Drag" | …].
 * Fine pointers only.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    document.documentElement.classList.add("has-cursor");
    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = e.target as Element;
      const t = target.closest?.<HTMLElement>("[data-cursor]");
      if (t) {
        setState("label");
        setLabel(t.dataset.cursor!);
      } else {
        setState(target.closest?.("a,button,input,select,textarea,label") ? "link" : "");
      }
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const size = state === "label" ? "h-20 w-20 bg-paper text-ink shadow-lg" : state === "link" ? "h-8 w-8 bg-clay/25" : "h-2.5 w-2.5 bg-ink";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[95] hidden">
      <div className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full transition-all duration-500 ease-[var(--ease-stone)] ${size}`}>
        <span className={`meta transition-transform duration-500 ${state === "label" ? "scale-100" : "scale-0"}`}>
          {label === "Drag" ? "‹ Drag ›" : label}
        </span>
      </div>
    </div>
  );
}
