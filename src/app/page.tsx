import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import Testimonials from "@/components/Testimonials";
import { FeatureCard, ServiceCard } from "@/components/cards";
import { Button, Kicker, Panel, RevealImage } from "@/components/ui";
import { getProject, projects } from "@/data/projects";
import { consultationTypes, posts, services } from "@/data/content";
import { img, site } from "@/data/site";

// Positions for the scattered service cards around the big "Services" word (desktop)
const scatter = [
  "lg:left-0 lg:top-0 lg:w-[22%]",
  "lg:left-[57%] lg:top-[-2%] lg:w-[21%]",
  "lg:left-0 lg:top-[50%] lg:w-[22%]",
  "lg:left-[24%] lg:top-[50%] lg:w-[22%]",
  "lg:right-0 lg:top-[55%] lg:w-[22%]",
];

export default function Home() {
  const featured = projects.filter((p) => p.featured).concat(projects.filter((p) => !p.featured));
  const cardImages = ["harvest-supper", "ikoyi-courtyard-house", "the-clay-pavilion", "atelier-renovation", "harmattan-hotel"].map((s) => getProject(s)!.cover);
  const shown = services.slice(0, 5);
  const [big, ...tall] = [getProject("linen-gala")!, getProject("harvest-supper")!, getProject("harmattan-hotel")!];

  return (
    <>
      <Hero />

      {/* Featured carousel */}
      <section className="panel bg-panel px-2 py-6 md:px-4 md:py-8" aria-labelledby="featured">
        <div className="mb-5 flex items-center justify-between px-2">
          <h2 id="featured" className="meta">Featured work — {projects.length} projects</h2>
          <Button href="/projects" variant="text">All projects</Button>
        </div>
        <ProjectCarousel projects={featured} />
      </section>

      {/* Services scattered around the word */}
      <Panel aria-labelledby="services">
        <div className="relative lg:h-[46rem]">
          <h2
            id="services"
            data-split
            className="display mb-10 text-center text-7xl tracking-[-0.06em] md:text-9xl lg:absolute lg:inset-x-0 lg:top-[30%] lg:mb-0 lg:text-[11rem]"
          >
            Ser<em>vices</em>
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:block">
            {shown.map((s, i) => (
              <ServiceCard
                key={s.slug}
                title={s.title}
                text={s.description}
                href={`/services#${s.slug}`}
                image={cardImages[i]}
                tone={i % 2 ? "outline" : "fill"}
                className={`lg:absolute ${scatter[i]} ${i === 0 ? "ring-2 ring-clay/40" : ""}`}
              />
            ))}
          </div>
        </div>
      </Panel>

      {/* Feature cards */}
      <section className="grid gap-2 md:grid-cols-12 md:gap-3" aria-label="Selected projects">
        <FeatureCard project={big} chips className="aspect-[4/5] md:col-span-6 md:aspect-auto md:min-h-[38rem]" sizes="50vw" />
        {tall.map((p) => (
          <FeatureCard key={p.slug} project={p} className="aspect-[4/5] md:col-span-3 md:aspect-auto" sizes="25vw" />
        ))}
      </section>

      {/* Founder */}
      <Panel className="grid gap-10 md:grid-cols-12" aria-labelledby="founder">
        <div className="flex flex-col justify-between gap-10 md:col-span-7">
          <div>
            <Kicker>Meet the Creative Director</Kicker>
            <h2 id="founder" data-split className="display mt-4 text-5xl md:text-7xl">
              Every project, <em>personally led</em> by {site.founder.name}.
            </h2>
          </div>
          <blockquote className="max-w-lg text-xl leading-snug text-ink/70">
            “I lead every project myself — from the first sketch on site to the day we hand over the keys. That&apos;s the promise of a small studio.”
          </blockquote>
          <dl className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end rounded-2xl bg-panel p-4">
                <dt className="meta mt-2 text-muted">{s.label}</dt>
                <dd className="display text-4xl">
                  <span data-count={s.value}>{s.value.toLocaleString("en-GB")}</span>
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative md:col-span-5">
          <RevealImage src={img("photo-1531123897727-8f129e1688ce", 1200)} alt={`Portrait of ${site.founder.name}`} className="aspect-[4/5]" sizes="40vw" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-paper/90 p-3 backdrop-blur">
            <span>
              <span className="block font-medium">{site.founder.name}</span>
              <span className="block text-sm text-muted">{site.founder.title}</span>
            </span>
            <Link href="/studio" aria-label="About the studio" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">→</Link>
          </div>
        </div>
      </Panel>

      {/* Testimonials */}
      <Panel aria-labelledby="feedback">
        <h2 id="feedback" data-split className="display mx-auto max-w-3xl text-center text-5xl md:text-7xl">
          Recent <em>feedback</em> from our clients
        </h2>
        <div className="mt-10">
          <Testimonials />
        </div>
      </Panel>

      {/* Journal */}
      <Panel aria-labelledby="journal">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="journal" data-split className="display text-5xl md:text-7xl">From the <em>journal</em></h2>
          <Button href="/journal" variant="text" className="hidden md:inline-flex">All articles</Button>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link href={`/journal/${p.slug}`} className="group block rounded-3xl bg-panel p-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={p.cover} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-stone)] group-hover:scale-[1.05]" />
                  <span className="pill meta absolute left-3 top-3 bg-paper/90 px-3 py-1.5 text-[0.6rem]">{p.category}</span>
                </div>
                <div className="flex items-end justify-between gap-4 p-3 pt-4">
                  <h3 className="text-xl font-display leading-tight">{p.title}</h3>
                  <span className="meta shrink-0 text-muted">{p.readTime}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Book */}
      <Panel className="bg-panel" aria-labelledby="book-h">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="book-h" data-split className="display text-5xl md:col-span-8 md:text-8xl">
            Let&apos;s build something <em>that lasts.</em>
          </h2>
          <p className="text-muted md:col-span-4">Every consultation is with {site.founder.name}. Pick a format to see available times.</p>
        </div>
        <ul className="mt-12 grid gap-2 md:grid-cols-3 md:gap-3">
          {consultationTypes.map((c, i) => (
            <li key={c.id}>
              <Link
                href={`/book?type=${c.id}`}
                className={`group flex h-full min-h-72 flex-col justify-between gap-8 rounded-3xl p-6 transition-colors duration-500 ${
                  i === 0 ? "bg-ink text-paper hover:bg-earth" : "bg-paper hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`pill meta px-3 py-1.5 ring-1 ${i === 0 ? "ring-paper/25" : "ring-ink/15"}`}>{c.duration}</span>
                  <span className={`meta ${c.fee === "Free" ? "text-clay" : ""}`}>{c.fee}</span>
                </div>
                <div>
                  <h3 className="display text-4xl">{c.title}</h3>
                  <p className={`mt-3 text-sm leading-snug ${i === 0 ? "text-paper/70" : "text-muted"}`}>{c.description}</p>
                </div>
                <span className={`pill meta justify-between px-5 py-3 ${i === 0 ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
                  Choose a time <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
