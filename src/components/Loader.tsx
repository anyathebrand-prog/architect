"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Blueprint loader: a line draws across, folds into the monogram, then lifts away. */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      setDone(true);
      window.__loaderDone = true;
      window.dispatchEvent(new Event("loader:done"));
    };
    const seen = sessionStorage.getItem("onwa-loaded");
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    sessionStorage.setItem("onwa-loaded", "1");

    const el = ref.current!;
    const line = el.querySelector(".ld-line")!;
    const paths = el.querySelectorAll<SVGGeometryElement>(".ld-mono *");
    paths.forEach((p) => {
      const l = p.getTotalLength();
      gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
    });
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "expo.inOut" })
      .to(line, { scaleX: 0, transformOrigin: "right", duration: 0.7, ease: "expo.in" })
      .to(paths, { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut", stagger: 0.12 }, "-=0.3")
      .to(".ld-word", { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }, "-=0.3")
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut", delay: 0.15 });
  }, []);

  if (done) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper text-wine"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="ld-line absolute left-0 right-0 top-1/2 h-px origin-left bg-clay" />
      <div className="flex flex-col items-center gap-6">
        <svg className="ld-mono h-28 w-28" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="5" y="5" width="90" height="90" />
          <circle cx="50" cy="50" r="30" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/onwa-logo.png" alt="" className="ld-word h-14 w-auto translate-y-3 opacity-0" />
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __loaderDone?: boolean;
  }
}
