import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How ONWA STUDIO collects and uses personal data, in line with the Nigeria Data Protection Act 2023.",
};

// Template notice — have it reviewed by your legal adviser / DPO before launch.
export default function PrivacyPage() {
  return (
    <article className="panel px-4 py-16 md:px-10 md:py-24">
      <p className="meta mb-8">Legal</p>
      <h1 className="display text-6xl md:text-8xl">Privacy <em>notice</em></h1>
      <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed [&_h2]:display [&_h2]:mt-12 [&_h2]:text-3xl">
        <p>This notice explains how {site.name} (“we”) handles personal data submitted through this website, in line with the Nigeria Data Protection Act 2023 (NDPA).</p>
        <h2>What we collect</h2>
        <p>When you book a consultation or send an enquiry: your name, email, phone number, company (optional), project details, budget range, timeline and any files you choose to upload.</p>
        <h2>Why we collect it</h2>
        <p>Only to respond to your enquiry, arrange and prepare for your consultation, and send related confirmations and reminders. Our lawful basis is your consent and steps taken at your request before entering a contract. We do not use it for marketing unless you separately opt in, and we never sell it.</p>
        <h2>Who sees it</h2>
        <p>The studio team, and service providers who process data on our behalf (email delivery and scheduling) under appropriate safeguards. Some providers may store data outside Nigeria; where they do, we rely on adequacy or contractual safeguards as required by the NDPA.</p>
        <h2>How long we keep it</h2>
        <p>Enquiries that don&apos;t become projects are deleted within 12 months. Client project records are kept as required by law and professional regulation.</p>
        <h2>Your rights</h2>
        <p>You may request access to, correction or deletion of your data, withdraw consent at any time, object to processing, or request portability. You may also complain to the Nigeria Data Protection Commission (NDPC).</p>
        <h2>Contact</h2>
        <p>Email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> or write to us at {site.address.join(", ")}.</p>
      </div>
    </article>
  );
}
