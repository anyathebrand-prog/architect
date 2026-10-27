# ONWA STUDIO

Website for ONWA STUDIO, a Lagos architecture and experiential design studio led by Principal Architect Chidinma Anya.

Next.js (App Router) · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Framer Motion

```bash
npm install
npm run dev        # http://localhost:3000
```

## Editing content

All content lives in `src/data/`. Each file is plain typed data, so it can later be moved into a CMS.

| File | Contents |
| --- | --- |
| `site.ts` | Studio name, contact details, phone, WhatsApp, address, hours, socials, homepage stats |
| `projects.ts` | Projects: add an object to the array and the grid, filters, detail page and sitemap all update |
| `content.ts` | Services, process steps, journal posts, recognition, consultation types and fees |

Images are Unsplash placeholders loaded through the `img()` helper. Swap in your own URLs, or put files in `/public` and use paths like `/images/foo.jpg`.

## Animation hooks

Pages are server components. To animate an element, add a data attribute and `MotionProvider` handles the rest:

`data-split` (line reveal) · `data-fade` · `data-reveal-img` (clip wipe and scale) · `data-count` · `data-parallax` · `data-draw` (SVG stroke) · `data-magnetic` · `data-cursor="view"`

When `prefers-reduced-motion` is set, all of these are switched off.

## Bookings & email

`/api/booking` checks the submission, then emails the booking to the studio (with any uploads attached) and a confirmation to the client. Email goes through a Gmail account when `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set (no domain needed), or through [Resend](https://resend.com) when `RESEND_API_KEY` is set. If Cal.com is configured, the booking is also created there. Copy `.env.example` to `.env.local` and fill in the keys. Without keys, emails are logged to the console.

The privacy notice at `/privacy` is a template written with the NDP Act 2023 in mind. Have it reviewed before launch.
