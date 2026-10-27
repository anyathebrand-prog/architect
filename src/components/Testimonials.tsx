"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as const;

/** Centre card in focus, neighbours peeking in faded on either side. */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const at = (k: number) => testimonials[(k + n) % n];

  return (
    <div>
      <div className="mb-12 flex justify-center gap-2">
        <button onClick={() => setI((v) => v - 1)} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper">‹</button>
        <button onClick={() => setI((v) => v + 1)} aria-label="Next testimonial" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-clay">›</button>
      </div>
      <div className="relative grid items-stretch md:grid-cols-[1fr_minmax(0,36rem)_1fr]">
        <Side t={at(i - 1)} align="right" />
        <div className="relative z-10 min-h-80" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.7, ease }}
              className="flex h-full flex-col justify-between gap-10 rounded-3xl bg-paper p-6 shadow-xl shadow-ink/5 ring-1 ring-ink/10 md:p-8"
            >
              <blockquote className="text-lg leading-snug md:text-xl">“{at(i).quote}”</blockquote>
              <figcaption className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={at(i).avatar} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block font-medium">{at(i).name}</span>
                    <span className="block text-sm text-muted">{at(i).role}</span>
                  </span>
                </span>
                <span aria-hidden className="text-5xl leading-none text-clay">”</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <Side t={at(i + 1)} align="left" />
      </div>
    </div>
  );
}

function Side({ t, align }: { t: (typeof testimonials)[number]; align: "left" | "right" }) {
  return (
    <div aria-hidden className={`rule-t rule-b relative hidden overflow-hidden py-8 text-sm leading-snug text-ink/50 md:my-8 md:block ${align === "right" ? "pr-6 text-right" : "pl-6"}`}>
      <p className={align === "right" ? "-ml-20" : "-mr-20"}>“{t.quote}”</p>
      <p className="meta mt-6 text-ink/60">{t.name}</p>
    </div>
  );
}
