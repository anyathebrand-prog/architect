// Global studio details. Edit here to update across the whole site.
export const site = {
  name: "ONWA STUDIO",
  shortName: "ONWA",
  monogram: "O",
  url: "https://onwastudio.com",
  tagline: "Architecture for gatherings",
  description:
    "ONWA STUDIO is a Lagos architecture and design studio specialising in event and experiential design — pavilions, galas, launches and the buildings that host them. Founded and led by Principal Architect Chidinma Anya.",
  founder: {
    name: "Chidinma Anya",
    title: "Founder & Principal Architect",
  },
  email: "hello@onwastudio.com",
  phone: "07073463305",
  phoneDisplay: "+234 707 346 3305",
  whatsapp: "https://wa.link/fb3u2y",
  whatsappMessage: "Hi, I'd like to discuss a project with ONWA STUDIO",
  address: ["14 Bourdillon Road", "Ikoyi, Lagos", "Nigeria"],
  hours: [
    { days: "Mon – Fri", time: "09:00 – 18:00" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
  ],
  stats: [
    { value: 12, suffix: "", label: "Years of practice" },
    { value: 140, suffix: "+", label: "Projects completed" },
    { value: 86000, suffix: "", label: "Sqm designed" },
    { value: 9, suffix: "", label: "Cities across 4 countries" },
  ],
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
  { href: "/services", label: "Services" },
  { href: "/journal", label: "Journal" },
  { href: "/recognition", label: "Recognition" },
  { href: "/contact", label: "Contact" },
];

/** Unsplash helper — swap for your own CDN/CMS images later. */
export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
