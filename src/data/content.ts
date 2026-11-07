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
    projects: ["the-olive-reverie", "nebular-hall", "210-brand-dinner", "sera-beauty-pop-up-booth"],
  },
  {
    slug: "architecture",
    title: "Architecture",
    description:
      "New buildings, from private homes to hotels and event venues, designed from the site outward — climate, light and material first.",
    deliverables: ["Feasibility & site analysis", "Concept to tender drawings", "Planning approvals"],
    projects: ["nebular-hall"],
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    description:
      "Complete interiors: plan, joinery, lighting, furniture and finishes, drawn as one continuous idea.",
    deliverables: ["Layouts & joinery design", "Material & FF&E schedules", "Bespoke furniture"],
    projects: ["nature-themed-living-room", "the-purple-room"],
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
    projects: [],
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

export const posts: Post[] = [];

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
    title: "In-Person Meeting",
    duration: "60 min",
    fee: "₦50,000",
    description: "Meet Chidinma in person in Lagos, at your venue, office or another convenient spot. Bring drawings and photos; see samples and past work.",
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
