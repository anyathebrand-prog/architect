import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Old project URLs from before the projects were renamed
  async redirects() {
    const renamed: Record<string, string> = {
      "harvest-supper": "the-olive-reverie",
      "the-clay-pavilion": "nature-themed-living-room",
      "atrium-launch": "nebular-hall",
      "harmattan-hotel": "210-brand-dinner",
      "ikoyi-courtyard-house": "sera-beauty-pop-up-booth",
    };
    return Object.entries(renamed).map(([from, to]) => ({
      source: `/projects/${from}`,
      destination: `/projects/${to}`,
      permanent: true,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
