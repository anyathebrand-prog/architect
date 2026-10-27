"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Bubble, Button } from "./ui";
import { img, site } from "@/data/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { yPercent: 110 });
      gsap.set(".hero-fade", { opacity: 0, y: 16 });
      gsap.set(".hero-bubble", { scale: 0 });
      const play = () =>
        gsap.timeline()
          .to(".hero-line", { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.12 })
          .to(".hero-bubble", { scale: 1, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.5)
          .to(".hero-fade", { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.08 }, 0.6);
      if (window.__loaderDone) play();
      else window.addEventListener("loader:done", play, { once: true });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="panel px-4 pb-16 pt-14 md:px-10 md:pb-24 md:pt-24">
      <p className="hero-fade meta mb-6 flex items-center gap-2 text-muted md:ml-[8%]">
        <span className="h-2 w-2 rounded-full bg-clay" /> {site.stats[1].value}+ projects delivered · Lagos, since 2014
      </p>
      <h1 className="display text-[11.5vw] md:text-[6.4vw] xl:text-[6.8rem]" aria-label="Designing gatherings and building places people remember, with ONWA.">
        <span className="line-mask md:text-right" aria-hidden>
          <span className="hero-line line-inner">
            <Bubble src={img("photo-1519167758481-83f550bb49b3", 200)} className="hero-bubble mr-3" />
            Designing <em>gatherings</em> &amp;
          </span>
        </span>
        <span className="line-mask" aria-hidden>
          <span className="hero-line line-inner">
            building places <em>people</em>
            <Bubble src={img("photo-1600585154340-be6161a56a0c", 200)} className="hero-bubble mx-3" />
          </span>
        </span>
        <span className="line-mask md:pl-[12%]" aria-hidden>
          <span className="hero-line line-inner">
            <em>remember</em>, with Onwa
            <Bubble src={img("photo-1464366400600-7168b8af9bc3", 200)} className="hero-bubble ml-3" />
          </span>
        </span>
      </h1>
      <div className="mt-12 grid gap-8 md:grid-cols-12">
        <p className="hero-fade text-lg leading-snug text-muted md:col-span-5 md:col-start-6">
          <span className="text-ink">About us.</span> An architecture and design studio specialising in event and experiential
          design — pavilions, galas, launches, and the buildings that host them. Founded and led by Principal Architect{" "}
          <span className="text-ink">{site.founder.name}</span>.
        </p>
        <div className="hero-fade md:col-span-5 md:col-start-6">
          <Button href="/book">Book a consultation</Button>
        </div>
      </div>
    </section>
  );
}
