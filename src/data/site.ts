// Global studio details. Edit here to update across the whole site.
export const site = {
  name: "ONWA STUDIO",
  shortName: "ONWA",
  monogram: "O",
  // Used for share previews, sitemap and canonical links. Change when the custom domain is live.
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://onwastudio.vercel.app",
  tagline: "Architecture for gatherings",
  description:
    "ONWA STUDIO is an event and experience design studio in Lagos, creating spaces that bring ideas to life — from weddings and concepts to exhibitions and brand activations. Led by Chidinma Anya.",
  founder: {
    name: "Chidinma Anya",
    title: "Founder & Team Lead",
  },
  email: "hello@onwastudio.com",
  phone: "07073463305",
  phoneDisplay: "+234 707 346 3305",
  whatsapp: "https://wa.link/fb3u2y",
  whatsappMessage: "Hi, I'd like to discuss a project with ONWA STUDIO",
  city: "Lagos, Nigeria", // no physical studio yet: only the city is shown
  hours: [
    { days: "Mon – Fri", time: "09:00 – 18:00" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/onwa.studio" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
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
