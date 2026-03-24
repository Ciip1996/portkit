import type { Metadata } from "next";
import TimelinePageContent from "@/components/layout/timeline-page-content";
import { SITE_URL } from "@/lib/constants";
import { portfolio } from "@/config/portfolio";

const { author } = portfolio;

export const metadata: Metadata = {
  title: "Timeline",
  description: `A complete chronological timeline of ${author.displayName}'s career, education, exchange programs, awards, and certifications.`,
  alternates: {
    canonical: `${SITE_URL}/timeline`,
  },
  openGraph: {
    title: `Timeline — ${author.displayName}`,
    description: `Full career and academic timeline of ${author.displayName} — ${author.jobTitle}.`,
    url: `${SITE_URL}/timeline`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Timeline",
      item: `${SITE_URL}/timeline`,
    },
  ],
};

export default function TimelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TimelinePageContent />
    </>
  );
}
