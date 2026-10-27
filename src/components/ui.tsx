import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/site";

/** Rounded white panel that every page section sits on. */
export function Panel({ children, className = "", ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`panel overflow-hidden px-4 py-16 md:px-10 md:py-24 ${className}`} {...rest}>
      {children}
    </section>
  );
}

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`meta text-muted ${className}`}>{children}</p>;
}

export function Chip({ children, className = "", dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <span className={`pill meta px-3 py-1.5 ${dark ? "bg-ink text-paper" : "bg-paper/90 text-ink ring-1 ring-ink/10"} ${className}`}>
      {children}
    </span>
  );
}

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/** Circle with a chevron, used on cards and next to CTAs. */
export function ArrowCircle({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
        dark ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-ink/15"
      } ${className}`}
    >
      <Arrow />
    </span>
  );
}

/** Black pill CTA followed by a detached arrow circle (as in the reference). */
export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "light" | "text";
  className?: string;
}) {
  if (variant === "text")
    return (
      <Link href={href} className={`pill meta group bg-paper px-5 py-3 ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper ${className}`}>
        {children}
      </Link>
    );
  return (
    <Link href={href} data-magnetic className={`group inline-flex items-center gap-1 ${className}`}>
      <span
        className={`pill meta h-11 px-6 transition-colors duration-500 ${
          variant === "solid" ? "bg-ink text-paper group-hover:bg-clay" : "bg-paper text-ink group-hover:bg-ink group-hover:text-paper"
        }`}
      >
        {children}
      </span>
      <ArrowCircle className="h-11 w-11" />
    </Link>
  );
}

/** Small round image set inline in big headlines. */
export function Bubble({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span className={`relative inline-block h-[0.8em] w-[0.8em] shrink-0 overflow-hidden rounded-full align-middle ring-4 ring-paper ${className}`}>
      <Image src={src} alt="" fill sizes="96px" className="object-cover" />
    </span>
  );
}

/** Lazy image with clip-path reveal + scale. */
export function RevealImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  from = "bottom",
  parallax,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  from?: "bottom" | "center";
  parallax?: number;
}) {
  return (
    <div data-reveal-img={from} className={`relative overflow-hidden rounded-3xl bg-travertine ${className}`}>
      <div className={parallax ? "absolute inset-[-10%_0]" : "absolute inset-0"} data-parallax={parallax}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

/** Page header panel: small kicker, huge centred headline, optional bubbles + intro. */
export function PageHero({
  kicker,
  title,
  intro,
  bubbles = [],
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
  bubbles?: string[];
}) {
  return (
    <section className="panel relative px-4 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
      <Kicker className="mb-6">{kicker}</Kicker>
      <h1 data-split className="display max-w-6xl text-5xl md:text-8xl lg:text-[7.5rem]">
        {title}
      </h1>
      {intro && (
        <p data-fade className="mt-10 max-w-xl text-lg leading-snug text-ink/70 md:ml-auto md:mr-[8%]">
          {intro}
        </p>
      )}
      {bubbles.map((b, i) => (
        <span
          key={b}
          aria-hidden
          className={`absolute hidden h-16 w-16 overflow-hidden rounded-full ring-4 ring-paper md:block ${
            ["right-[12%] top-14", "right-[4%] top-40 h-20 w-20", "bottom-16 left-[30%] h-14 w-14"][i]
          }`}
        >
          <Image src={b} alt="" fill sizes="80px" className="object-cover" />
        </span>
      ))}
    </section>
  );
}

/** Closing CTA: image card + headline panel. */
export function CtaBlock({
  title = (
    <>
      Have a project <em>in mind?</em>
    </>
  ),
}: {
  title?: React.ReactNode;
}) {
  return (
    <section className="grid gap-2 md:grid-cols-12 md:gap-3" aria-label="Book a consultation">
      <div className="panel flex flex-col justify-between gap-12 px-4 py-14 md:col-span-7 md:px-10 md:py-16">
        <Kicker>Next step</Kicker>
        <h2 data-split className="display text-5xl md:text-7xl">{title}</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Button href="/book">Book a consultation</Button>
          <p className="max-w-xs text-sm text-muted">Every project starts with a conversation with Chidinma — on a call, at the studio or on site.</p>
        </div>
      </div>
      <div className="relative min-h-72 overflow-hidden rounded-[2rem] md:col-span-5 md:rounded-[2.5rem]">
        <Image src={img("photo-1464366400600-7168b8af9bc3", 1200)} alt="" fill sizes="40vw" className="object-cover" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          <Chip>Virtual · Free</Chip>
          <Chip>Studio meeting</Chip>
          <Chip>Site visit</Chip>
        </div>
      </div>
    </section>
  );
}

/** Simple floor plan drawing; lines draw on scroll. */
export function FloorPlan({ className = "" }: { className?: string }) {
  return (
    <svg data-draw viewBox="0 0 600 400" fill="none" stroke="currentColor" strokeWidth="1" className={className} role="img" aria-label="Ground floor plan">
      <rect x="20" y="20" width="560" height="360" strokeWidth="2.5" />
      <rect x="200" y="120" width="200" height="160" />
      <line x1="200" y1="20" x2="200" y2="120" strokeWidth="1.6" />
      <line x1="400" y1="20" x2="400" y2="120" strokeWidth="1.6" />
      <line x1="200" y1="280" x2="200" y2="380" strokeWidth="1.6" />
      <line x1="400" y1="280" x2="400" y2="380" strokeWidth="1.6" />
      <line x1="20" y1="200" x2="200" y2="200" strokeWidth="1.6" />
      <line x1="400" y1="200" x2="580" y2="200" strokeWidth="1.6" />
      <path d="M240 280 A 40 40 0 0 1 280 240" />
      <path d="M60 200 A 40 40 0 0 0 100 160" />
      <path d="M540 200 A 40 40 0 0 1 500 160" />
      <circle cx="300" cy="200" r="40" />
      <line x1="260" y1="200" x2="340" y2="200" />
      <line x1="300" y1="160" x2="300" y2="240" />
      <polyline points="430,300 460,300 460,330 490,330 490,360 520,360" />
    </svg>
  );
}
