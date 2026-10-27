import { img } from "./site";

export type Service = {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  projects: string[]; // project slugs
};

export const services: Service[] = [
  {
    slug: "event-experiential",
    title: "Event & Experiential Design",
    description:
      "Pavilions, galas, launches and installations. Temporary architecture built with the rigour of permanent work — and planned for what happens after.",
    deliverables: ["Spatial concept & guest journey", "Structures & scenography", "Build, install & strike"],
    projects: ["the-clay-pavilion", "linen-gala", "harvest-supper", "atrium-launch"],
  },
  {
    slug: "architecture",
    title: "Architecture",
    description:
      "New buildings, from private homes to hotels and event venues, designed from the site outward — climate, light and material first.",
    deliverables: ["Feasibility & site analysis", "Concept to tender drawings", "Planning approvals"],
    projects: ["ikoyi-courtyard-house", "harmattan-hotel"],
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    description:
      "Complete interiors: plan, joinery, lighting, furniture and finishes, drawn as one continuous idea.",
    deliverables: ["Layouts & joinery design", "Material & FF&E schedules", "Bespoke furniture"],
    projects: ["earth-residence-interiors", "marina-workplace"],
  },
  {
    slug: "renovation",
    title: "Renovation",
    description:
      "Giving existing buildings a second life. We keep what is good, remove what isn't, and add only what is needed.",
    deliverables: ["Condition survey", "Strip-out & retention strategy", "Reconfiguration design"],
    projects: ["atelier-renovation"],
  },
  {
    slug: "consultation",
    title: "Consultation",
    description:
      "A focused session with the principal architect to test a site, a budget or an idea before you commit.",
    deliverables: ["Site or plan review", "Budget sense-check", "Written next steps"],
    projects: [],
  },
  {
    slug: "project-management",
    title: "Project Management",
    description:
      "We stay on site through construction, managing contractors, cost and quality so the building matches the drawings.",
    deliverables: ["Contractor procurement", "Site inspections", "Cost & programme reporting"],
    projects: ["harmattan-hotel"],
  },
  {
    slug: "masterplanning",
    title: "Masterplanning",
    description:
      "Neighbourhoods and estates planned around shade, water, movement and public life.",
    deliverables: ["Urban analysis", "Masterplan & phasing", "Design codes"],
    projects: ["lagoon-quarter"],
  },
];

export const process = [
  {
    title: "Brief",
    duration: "1–2 weeks",
    text: "We listen. Site visit, conversations about how you live, work or host, and an honest look at budget and timeline.",
    deliverables: ["Written brief", "Site analysis", "Fee proposal"],
  },
  {
    title: "Concept",
    duration: "3–5 weeks",
    text: "Chidinma develops two or three spatial ideas by hand and in model. We choose one direction together.",
    deliverables: ["Concept sketches & models", "Massing studies", "Mood & material board"],
  },
  {
    title: "Design Development",
    duration: "6–12 weeks",
    text: "The idea becomes a building: plans, sections, details, structure and services coordinated with our consultants.",
    deliverables: ["Full drawing set", "3D visualisations", "Cost plan & approvals"],
  },
  {
    title: "Construction",
    duration: "Project dependent",
    text: "We tender, appoint the right contractor and stay on site weekly to protect quality and budget.",
    deliverables: ["Tender package", "Weekly site reports", "Change & cost control"],
  },
  {
    title: "Handover",
    duration: "2–4 weeks",
    text: "Snagging, styling and a walk-through. You receive the keys, the manuals and a building that works.",
    deliverables: ["Snag list & sign-off", "As-built drawings", "12-month aftercare"],
  },
];

export type Post = {
  slug: string;
  title: string;
  category: "Design Thoughts" | "Site Visit" | "Project Update" | "Article";
  date: string; // ISO
  excerpt: string;
  cover: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "building-for-the-harmattan",
    title: "Building for the Harmattan",
    category: "Design Thoughts",
    date: "2026-09-12",
    excerpt: "Why thick walls, deep shade and fewer machines make better buildings in West Africa.",
    cover: img("photo-1431576901776-e539bd916ba2", 1200),
    readTime: "6 min",
    body: [
      "Every December the dust arrives and the air turns dry and cool at night. Most buildings ignore it. We design for it.",
      "Mass is the oldest climate technology we have. A thick earth or concrete wall absorbs the day's heat and releases it slowly overnight, flattening the temperature swing that makes a room uncomfortable.",
      "Shade comes next. An overhang drawn correctly for the sun's path can do the work of a tonne of cooling equipment.",
      "None of this is new. What is new is taking it seriously as architecture rather than an afterthought.",
    ],
  },
  {
    slug: "site-visit-harmattan-hotel",
    title: "Site Visit: The Walls Go Up",
    category: "Site Visit",
    date: "2026-08-03",
    excerpt: "Laterite blocks, lime mortar and the first rooms of the Harmattan Hotel take shape in Abuja.",
    cover: img("photo-1541888946425-d81bb19240f5", 1200),
    readTime: "4 min",
    body: [
      "Six months in, the ground floor walls of the Harmattan Hotel are complete. The laterite blocks are fired thirty kilometres from site.",
      "We visit every week. Today was about the junction between wall and slab — the detail that decides whether the building looks crisp or tired in ten years.",
    ],
  },
  {
    slug: "temporary-architecture-permanent-ideas",
    title: "Temporary Architecture, Permanent Ideas",
    category: "Article",
    date: "2026-06-20",
    excerpt: "Event design deserves the same rigour as a building. Here's how we approach it.",
    cover: img("photo-1519167758481-83f550bb49b3", 1200),
    readTime: "8 min",
    body: [
      "An event lasts a night. The memory lasts years. That asymmetry is why we treat every pavilion and gala as architecture.",
      "We plan for the strike before we plan the build: where every material goes after the guests leave.",
    ],
  },
  {
    slug: "lagoon-quarter-update",
    title: "Lagoon Quarter: Masterplan Approved",
    category: "Project Update",
    date: "2026-04-15",
    excerpt: "Phase one of our waterfront neighbourhood in Epe receives planning approval.",
    cover: img("photo-1487958449943-2429e8be8625", 1200),
    readTime: "3 min",
    body: [
      "We're proud to share that the Lagoon Quarter masterplan has been approved. Phase one includes 120 homes, a market hall and a public waterfront.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const recognition = [
  { year: 2026, title: "Shortlist — Experience Design of the Year", org: "World Architecture Festival", kind: "Award" },
  { year: 2025, title: "The Clay Pavilion — Best Temporary Structure", org: "African Architecture Awards", kind: "Award" },
  { year: 2025, title: "“The Architect Building for the Heat”", org: "Wallpaper*", kind: "Press" },
  { year: 2024, title: "40 Under 40 — Africa", org: "ArchiAfrika", kind: "Award" },
  { year: 2024, title: "Ikoyi Courtyard House feature", org: "Dezeen", kind: "Press" },
  { year: 2023, title: "Interior of the Year — Residential", org: "Design Week Lagos", kind: "Award" },
  { year: 2023, title: "“Earth, Linen, Light” — 12-page portfolio", org: "Architectural Digest Middle East", kind: "Publication" },
  { year: 2022, title: "Emerging Practice Commendation", org: "Nigerian Institute of Architects", kind: "Award" },
];

export const consultationTypes = [
  {
    id: "virtual",
    title: "Virtual Call",
    duration: "30 min",
    fee: "Free",
    description: "A first conversation over video. Tell us about your site, brief and timing — we'll tell you honestly how we can help.",
  },
  {
    id: "studio",
    title: "Studio Meeting",
    duration: "60 min",
    fee: "₦50,000",
    description: "Meet Chidinma at the Ikoyi studio. Bring drawings and photos; see models, samples and past work in person.",
  },
  {
    id: "site",
    title: "Site Visit",
    duration: "90 min",
    fee: "₦150,000",
    description: "We come to your site in Lagos to assess orientation, constraints and potential. Fee credited against appointment.",
  },
] as const;

export type ConsultationId = (typeof consultationTypes)[number]["id"];

export const testimonials = [
  {
    quote: "ONWA turned our daughter's wedding into something guests still talk about. Chidinma was on site every day of the build — nothing was left to chance.",
    name: "Adaeze O.",
    role: "Private client, Lagos",
    avatar: img("photo-1531123897727-8f129e1688ce", 200),
  },
  {
    quote: "The Clay Pavilion held three thousand people over five nights and then returned to the ground. It redefined what we thought an event structure could be.",
    name: "Tunde B.",
    role: "Director, Art Week Lagos",
    avatar: img("photo-1506794778202-cad84cf45f1d", 200),
  },
  {
    quote: "Our hotel stays cool without fighting the climate. The studio understood our guests, our budget and our timeline from the very first meeting.",
    name: "Halima S.",
    role: "Savannah Hospitality Group",
    avatar: img("photo-1573496359142-b8d87734a5a2", 200),
  },
  {
    quote: "A launch that changed while you stood in it. Our team has never had a response like it — and the build came in on budget.",
    name: "Kofi A.",
    role: "Brand Director",
    avatar: img("photo-1500648767791-00dcc994a43e", 200),
  },
];
