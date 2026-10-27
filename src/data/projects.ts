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
  featured?: boolean;
};

// Dummy data. Each entry is a self-contained record so it can move to a CMS
// (Sanity, Contentful, Notion, a JSON file) without touching the templates.
export const projects: Project[] = [
  {
    slug: "harvest-supper",
    title: "The Harvest Supper",
    location: "Ibadan, Oyo",
    year: 2026,
    category: "Experiential",
    type: "Open-air dinner",
    area: 900,
    status: "Completed",
    client: "Private (family celebration)",
    collaborators: ["Lumen Lighting Co.", "Weave Collective"],
    cover: "/projects/harvest-supper/cover.jpg",
    summary: "A supper for two hundred under a canopy of woven palm, laid across a working farm.",
    story: [
      "Act one is the walk: guests arrive through rows of cassava, lit by low lanterns at knee height, so the table is discovered rather than revealed.",
      "Act two is the table — a single line of reclaimed iroko following the contour of the land, under a palm canopy woven over six weeks by a cooperative from Oyo.",
      "Act three is the strike. Every element was designed to be reused by the farm: the canopy became shade for the nursery, the table its packing bench.",
    ],
    gallery: [
      img("photo-1464366400600-7168b8af9bc3"),
      img("photo-1519167758481-83f550bb49b3"),
      img("photo-1505373877841-8d25f7d46678"),
    ],
    materials: [
      { name: "Woven palm", note: "Hand-woven canopy", swatch: "#C4A574" },
      { name: "Iroko", note: "Reclaimed table", swatch: "#6B4A35" },
      { name: "Laterite", note: "Lantern bases", swatch: "#B5654A" },
    ],
    featured: true,
  },
  {
    slug: "atrium-launch",
    title: "Atrium: A Product Launch",
    location: "Victoria Island, Lagos",
    year: 2025,
    category: "Experiential",
    type: "Brand launch & installation",
    area: 1600,
    status: "Completed",
    client: "Confidential consumer brand",
    collaborators: ["Ade Structures", "Lumen Lighting Co."],
    cover: img("photo-1505373877841-8d25f7d46678"),
    summary: "A three-day launch inside a hall of suspended travertine slabs that slowly lowered over the evening.",
    story: [
      "The brief was a launch people would talk about for a year. We built a room that changed while you stood in it: twelve stone-clad panels descending by a few centimetres every hour until the product was revealed at their centre.",
    ],
    gallery: [
      img("photo-1511818966892-d7d671e672a2"),
      img("photo-1519167758481-83f550bb49b3"),
      img("photo-1487958449943-2429e8be8625"),
    ],
    materials: [
      { name: "Travertine veneer", note: "On lightweight panels", swatch: "#D6C7B0" },
      { name: "Blackened steel", note: "Rigging", swatch: "#2B2724" },
      { name: "Raw linen", note: "Acoustic drapes", swatch: "#E8DFD3" },
    ],
  },
  {
    slug: "the-clay-pavilion",
    title: "The Clay Pavilion",
    location: "Lekki, Lagos",
    year: 2025,
    category: "Experiential",
    type: "Event pavilion",
    area: 1200,
    status: "Completed",
    client: "Private (Art Week Lagos)",
    collaborators: ["Ade Structures", "Lumen Lighting Co."],
    cover: img("photo-1519167758481-83f550bb49b3"),
    summary: "A temporary pavilion of rammed earth and linen for a city-wide art week.",
    story: [
      "The brief asked for a space that could host three thousand guests over five nights, then disappear without trace. We answered with earth: compressed blocks from the site itself, stacked dry and returned to the ground after the event.",
      "Linen canopies filter the harmattan light by day and glow from within at night. The plan is a sequence of thresholds — compression, release, gathering — so that arrival itself becomes the first act of the evening.",
    ],
    gallery: [
      img("photo-1464366400600-7168b8af9bc3"),
      img("photo-1505373877841-8d25f7d46678"),
      img("photo-1511818966892-d7d671e672a2"),
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
