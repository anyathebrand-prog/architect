"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STONE = "expo.out";
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Wraps words of [data-split] in line masks, grouped by rendered line. */
function splitLines(el: HTMLElement) {
  if (el.dataset.splitDone) return el.querySelectorAll<HTMLElement>(".line-inner");
  const nodes = Array.from(el.childNodes);
  const words: HTMLElement[] = [];
  el.innerHTML = "";
  nodes.forEach((node) => {
    // Preserve inline elements (<em>, <br>) as whole units
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent!.split(/(\s+)/).forEach((t) => {
        if (!t) return;
        if (/^\s+$/.test(t)) return el.appendChild(document.createTextNode(" "));
        const s = document.createElement("span");
        s.style.display = "inline-block";
        s.textContent = t;
        el.appendChild(s);
        words.push(s);
      });
    } else if ((node as HTMLElement).tagName === "BR") {
      el.appendChild(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const s = node as HTMLElement;
      s.style.display = "inline-block";
      el.appendChild(s);
      words.push(s);
    }
  });
  const lines: HTMLElement[][] = [];
  let top: number | null = null;
  words.forEach((w) => {
    if (top === null || Math.abs(w.offsetTop - top) > 4) {
      lines.push([]);
      top = w.offsetTop;
    }
    lines[lines.length - 1].push(w);
  });
  el.innerHTML = "";
  lines.forEach((line) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    line.forEach((w, i) => {
      inner.appendChild(w);
      if (i < line.length - 1) inner.appendChild(document.createTextNode(" "));
    });
    mask.appendChild(inner);
    el.appendChild(mask);
  });
  el.dataset.splitDone = "1";
  return el.querySelectorAll<HTMLElement>(".line-inner");
}

function initAnimations(root: HTMLElement) {
  const ctx = gsap.context(() => {
    const st = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

    root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      const lines = splitLines(el);
      gsap.from(lines, { yPercent: 110, duration: 1.3, ease: STONE, stagger: 0.09, scrollTrigger: st(el) });
    });

    root.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
      gsap.from(el, { y: 20, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: st(el) });
    });

    // Images: clip wipe + scale 1.2 -> 1
    root.querySelectorAll<HTMLElement>("[data-reveal-img]").forEach((el) => {
      const from = el.dataset.revealImg === "center" ? "inset(50% 0% 50% 0%)" : "inset(100% 0% 0% 0%)";
      const media = el.querySelector("img");
      const tl = gsap.timeline({ scrollTrigger: st(el, "top 90%") });
      tl.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" });
      if (media) tl.fromTo(media, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: STONE }, 0);
    });

    // Stat counters
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: st(el),
        onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("en-GB")),
      });
    });

    // Slow parallax
    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const amt = Number(el.dataset.parallax || 12);
      gsap.fromTo(el, { yPercent: -amt }, {
        yPercent: amt,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // SVG line drawing
    root.querySelectorAll<SVGGeometryElement>("[data-draw] path, [data-draw] line, [data-draw] rect, [data-draw] circle, [data-draw] polyline").forEach((p) => {
      const len = p.getTotalLength?.() ?? 1000;
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: p.closest("[data-draw]")!, start: "top 80%", end: "bottom 40%", scrub: 1 },
      });
    });

    // Magnetic CTAs
    root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power4.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power4.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
    });
  }, root);
  return ctx;
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({ duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useIso(() => {
    lenis?.scrollTo(0, { immediate: true });
    if (reducedMotion()) return;
    const ctx = initAnimations(document.body);
    // Recalculate once fonts and images settle
    const r = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(r);
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
