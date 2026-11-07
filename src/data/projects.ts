import { img } from "./site";

export const categories = [
  "Experiential",
  "Hospitality",
  "Residential",
  "Commercial",
  "Interiors",
  "Masterplanning",
] as const;

export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: number;
  category: Category;
  type: string;
  area: number;
  status: "Completed" | "On site" | "In design";
  client: string;
  collaborators: string[];
  cover: string;
  summary: string;
  story: string[];
  gallery: string[];
  materials: { name: string; note: string; swatch: string }[];
  /** Optional plan image shown in the Drawings panel instead of the generic line drawing */
  plan?: string;
  /** Optional design-process images (moodboard, 3D model…) with short captions */
  process?: { src: string; caption: string }[];
  featured?: boolean;
};

// Dummy data. Each entry is a self-contained record so it can move to a CMS
// (Sanity, Contentful, Notion, a JSON file) without touching the templates.
export const projects: Project[] = [
  {
    slug: "harvest-supper",
    title: "The Olive Reverie",
    location: "Ibadan, Oyo",
    year: 2026,
    category: "Experiential",
    type: "Open-air dinner",
    area: 900,
    status: "Completed",
    client: "Private (family celebration)",
    collaborators: ["Lumen Lighting Co.", "Weave Collective"],
    cover: "/projects/harvest-supper/cover.jpg",
    summary: "A reception for three hundred beneath a canopy of olive and ivory, held inside a hall of glowing arches.",
    story: [
      "The Olive Reverie is a contemporary wedding environment that brings together romantic elegance, rich textures and warm atmospheric lighting. Inspired by the natural sophistication of olive green and the softness of ivory, the design creates an intimate yet grand setting for an unforgettable celebration.",
      "At the heart of the space is a sculptural stage framed by cascading ivory drapery and lush floral arrangements, creating a captivating focal point. Overhead, layered fabric installations intertwine with clusters of woven pendant lights, adding depth, warmth and visual drama to the ceiling. Tall arched openings, dressed in soft sheer curtains, introduce a sense of architectural rhythm, while olive-green wall treatments establish a rich and cohesive backdrop.",
    ],
    gallery: [
      "/projects/harvest-supper/hall.jpg",
      "/projects/harvest-supper/botanical.jpg",
    ],
    materials: [
      { name: "Olive velvet", note: "Draped canopy & walls", swatch: "#6B6B3A" },
      { name: "Ivory silk", note: "Ceiling swags & arch sheers", swatch: "#EFE6D2" },
      { name: "Backlit onyx", note: "Eclipse discs", swatch: "#D9C3A5" },
      { name: "Cream marble", note: "Polished floor", swatch: "#E8DCC6" },
      { name: "Olive felt", note: "Aisle runner & stage", swatch: "#8A8A4E" },
      { name: "Walnut", note: "Crossback chairs", swatch: "#7A5233" },
      { name: "Blush bouclé", note: "Lounge seating", swatch: "#C9A9A6" },
    ],
    plan: "/projects/harvest-supper/plan.jpg",
    process: [
      { src: "/projects/harvest-supper/moodboard.jpg", caption: "Moodboard — olive green & cream" },
      { src: "/projects/harvest-supper/model.jpg", caption: "3D model — two-point perspective" },
    ],
    featured: true,
  },
  {
    slug: "atrium-launch",
    title: "Nebular Hall",
    location: "Victoria Island, Lagos",
    year: 2026,
    category: "Experiential",
    type: "Wedding & gala concept",
    area: 1600,
    status: "Completed",
    client: "Confidential consumer brand",
    collaborators: ["Ade Structures", "Lumen Lighting Co."],
    cover: "/projects/nebular-hall/cover.jpg",
    summary: "A sophisticated, high-end event concept designed for grand celebrations, luxury weddings, and galas.",
    story: [
      "Rooted in radial symmetry and continuous motion, the design transforms a spacious venue into an immersive, circular amphitheater centered entirely around the celebration's focal point.",
      "The floor plan moves completely away from traditional linear seating, opting instead for a concentric arrangement that creates an inclusive, 360-degree guest experience.",
      "Dozens of glowing, spherical pendant lights of varying sizes are suspended at staggered heights. They mimic a dreamy galaxy of low-hanging moons and stars, casting a warm, romantic, and diffused amber glow over the entire venue.",
    ],
    gallery: ["/projects/nebular-hall/view-1.jpg", "/projects/nebular-hall/view-2.jpg"],
    materials: [
      { name: "Glass globe pendants", note: "Suspended at staggered heights", swatch: "#F2DDB0" },
      { name: "Ivory chiffon", note: "Ceiling swags & sheers", swatch: "#EFE6D6" },
      { name: "Walnut", note: "Stages, tables & balustrade", swatch: "#6E4A30" },
      { name: "Cream bouclé", note: "Curved lounge seating", swatch: "#EDE6DA" },
      { name: "Sand carpet", note: "Floor finish", swatch: "#D8C3A0" },
    ],
    plan: "/projects/nebular-hall/plan.jpg",
    process: [{ src: "/projects/nebular-hall/model.jpg", caption: "3D model — concentric layout" }],
  },
  {
    slug: "the-clay-pavilion",
    title: "Nature Themed Living Room",
    location: "Lekki, Lagos",
    year: 2025,
    category: "Interiors",
    type: "Residential living room",
    area: 1200,
    status: "Completed",
    client: "Private (Art Week Lagos)",
    collaborators: ["Ade Structures", "Lumen Lighting Co."],
    cover: "/projects/nature-living-room/cover.jpg",
    summary: "A temporary pavilion of rammed earth and linen for a city-wide art week.",
    story: [
      "The brief asked for a space that could host three thousand guests over five nights, then disappear without trace. We answered with earth: compressed blocks from the site itself, stacked dry and returned to the ground after the event.",
      "Linen canopies filter the harmattan light by day and glow from within at night. The plan is a sequence of thresholds — compression, release, gathering — so that arrival itself becomes the first act of the evening.",
    ],
    gallery: [
      "/projects/nature-living-room/view-2.jpg",
      img("photo-1505373877841-8d25f7d46678"),
      "/projects/nature-living-room/view-3.jpg",
    ],
    materials: [
      { name: "Rammed laterite", note: "Excavated on site", swatch: "#B5654A" },
      { name: "Raw linen", note: "Hand-hemmed canopy", swatch: "#E8DFD3" },
      { name: "Iroko", note: "Reclaimed timber frame", swatch: "#6B4A35" },
    ],
    featured: true,
  },
  {
    slug: "ikoyi-courtyard-house",
    title: "Ikoyi Courtyard House",
    location: "Ikoyi, Lagos",
    year: 2024,
    category: "Residential",
    type: "Private residence",
    area: 640,
    status: "Completed",
    client: "Private",
    collaborators: ["Ade Structures", "Greenline MEP"],
    cover: img("photo-1600585154340-be6161a56a0c"),
    summary: "A family home arranged around a planted courtyard that breathes in the heat.",
    story: [
      "The house turns its back to the street and opens entirely to a central courtyard. Deep concrete overhangs shade every façade; cross-ventilation does the work an air-conditioner would elsewhere.",
      "Travertine floors run continuously from inside to out, dissolving the line between room and garden.",
    ],
    gallery: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1600566753190-17f0baa2a6c3"),
      img("photo-1600210492486-724fe5c67fb0"),
    ],
    materials: [
      { name: "Board-marked concrete", note: "Local aggregate", swatch: "#9C948A" },
      { name: "Travertine", note: "Honed, unfilled", swatch: "#D6C7B0" },
      { name: "Terracotta screen", note: "Hand-pressed", swatch: "#B5654A" },
    ],
  },
  {
    slug: "harmattan-hotel",
    title: "Harmattan Hotel",
    location: "Abuja",
    year: 2024,
    category: "Hospitality",
    type: "Boutique hotel, 42 keys",
    area: 5400,
    status: "On site",
    client: "Savannah Hospitality Group",
    collaborators: ["Ade Structures", "Studio Ọkàn Landscape"],
    cover: img("photo-1566073771259-6a8506099945"),
    summary: "A low, heavy hotel of earth tones designed to stay cool through the dry season.",
    story: [
      "Forty-two rooms arranged in a stepped terrace, each with its own shaded loggia. Thick walls hold the night's cool well into the afternoon.",
      "The lobby is a double-height void cut through the building — part reception, part event hall — that can host weddings of five hundred.",
    ],
    gallery: [
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1555041469-a586c61ea9bc"),
    ],
    materials: [
      { name: "Lime render", note: "Breathable, hand-applied", swatch: "#E8DFD3" },
      { name: "Laterite brick", note: "Fired locally", swatch: "#A3573D" },
      { name: "Bronze", note: "Patinated fittings", swatch: "#5C4330" },
    ],
    featured: true,
  },
  {
    slug: "marina-workplace",
    title: "Marina Workplace",
    location: "Victoria Island, Lagos",
    year: 2023,
    category: "Commercial",
    type: "Headquarters fit-out",
    area: 2800,
    status: "Completed",
    client: "Confidential financial firm",
    collaborators: ["Greenline MEP"],
    cover: img("photo-1497366216548-37526070297c"),
    summary: "Four floors of workplace built around a stair that doubles as an auditorium.",
    story: [
      "We removed a slab to create a stepped forum at the heart of the building. Town halls, launches and client events now happen in the middle of daily work.",
      "A restrained palette — oak, concrete, clay — lets the city and the lagoon become the colour.",
    ],
    gallery: [
      img("photo-1524758631624-e2822e304c36"),
      img("photo-1486406146926-c627a92ad1ab"),
      img("photo-1497366216548-37526070297c"),
    ],
    materials: [
      { name: "White oak", note: "FSC certified", swatch: "#C8AE8A" },
      { name: "Polished concrete", note: "Existing slab, ground", swatch: "#8F8880" },
      { name: "Clay plaster", note: "Acoustic finish", swatch: "#B5654A" },
    ],
  },
  {
    slug: "linen-gala",
    title: "The Linen Gala",
    location: "Eko Atlantic, Lagos",
    year: 2023,
    category: "Experiential",
    type: "Gala & installation",
    area: 2200,
    status: "Completed",
    client: "Lagos Fashion Foundation",
    collaborators: ["Lumen Lighting Co.", "Weave Collective"],
    cover: img("photo-1464366400600-7168b8af9bc3"),
    summary: "Nine hundred metres of hand-dyed linen suspended over a single banquet table.",
    story: [
      "One table, one hundred metres long, seating four hundred. Above it, a field of linen dyed with indigo and camwood by a cooperative in Abeokuta.",
      "After the night, the cloth was cut and returned to the makers as finished goods.",
    ],
    gallery: [
      img("photo-1519167758481-83f550bb49b3"),
      img("photo-1505373877841-8d25f7d46678"),
      img("photo-1513694203232-719a280e022c"),
    ],
    materials: [
      { name: "Hand-dyed linen", note: "Indigo & camwood", swatch: "#3B4A5C" },
      { name: "Sapele", note: "Banquet table", swatch: "#6B3F2A" },
      { name: "Brass", note: "Candle fittings", swatch: "#B08D57" },
    ],
    featured: true,
  },
  {
    slug: "earth-residence-interiors",
    title: "Earth Residence Interiors",
    location: "Accra, Ghana",
    year: 2022,
    category: "Interiors",
    type: "Residential interior",
    area: 420,
    status: "Completed",
    client: "Private",
    collaborators: ["Weave Collective"],
    cover: img("photo-1618221195710-dd6b41faaea6"),
    summary: "A complete interior in clay, stone and wool for a collector's apartment.",
    story: [
      "Every room is a study in a single material. Furniture was drawn by the studio and built by craftspeople in Kumasi.",
    ],
    gallery: [
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1555041469-a586c61ea9bc"),
      img("photo-1600566753190-17f0baa2a6c3"),
    ],
    materials: [
      { name: "Clay plaster", note: "Hand-troweled", swatch: "#C08A6A" },
      { name: "Travertine", note: "Vein-cut", swatch: "#D6C7B0" },
      { name: "Wool bouclé", note: "Undyed", swatch: "#EDE6DA" },
    ],
  },
  {
    slug: "lagoon-quarter",
    title: "Lagoon Quarter",
    location: "Epe, Lagos",
    year: 2026,
    category: "Masterplanning",
    type: "Mixed-use masterplan",
    area: 48000,
    status: "In design",
    client: "Lagoon Quarter Development Ltd.",
    collaborators: ["Ade Structures", "Studio Ọkàn Landscape", "UrbanFrame"],
    cover: img("photo-1431576901776-e539bd916ba2"),
    summary: "A walkable waterfront neighbourhood planned around shade, water and public life.",
    story: [
      "Streets are oriented to the prevailing breeze. Every home is within three minutes of shade, water and a public room.",
    ],
    gallery: [
      img("photo-1487958449943-2429e8be8625"),
      img("photo-1511818966892-d7d671e672a2"),
      img("photo-1486406146926-c627a92ad1ab"),
    ],
    materials: [
      { name: "Laterite", note: "Paving & walls", swatch: "#A3573D" },
      { name: "Concrete", note: "Low-carbon mix", swatch: "#9C948A" },
      { name: "Native planting", note: "Shade canopy", swatch: "#5D6B47" },
    ],
  },
  {
    slug: "atelier-renovation",
    title: "Yaba Atelier",
    location: "Yaba, Lagos",
    year: 2022,
    category: "Commercial",
    type: "Renovation, design store",
    area: 380,
    status: "Completed",
    client: "Atelier Ìrísí",
    collaborators: ["Greenline MEP"],
    cover: img("photo-1511818966892-d7d671e672a2"),
    summary: "A 1960s warehouse stripped back into a store, gallery and runway.",
    story: [
      "We kept everything we could: the steel trusses, the scarred floor, the clerestory. New insertions are clay and timber, easily removed.",
    ],
    gallery: [
      img("photo-1487958449943-2429e8be8625"),
      img("photo-1524758631624-e2822e304c36"),
      img("photo-1513694203232-719a280e022c"),
    ],
    materials: [
      { name: "Existing steel", note: "Wire-brushed", swatch: "#4A4440" },
      { name: "Terracotta tile", note: "Hand-made", swatch: "#B5654A" },
      { name: "Plywood", note: "Display joinery", swatch: "#D2B48C" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
