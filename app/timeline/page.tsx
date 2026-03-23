import type { Metadata } from "next";
import TimelinePageContent from "@/components/layout/timeline-page-content";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A complete chronological timeline of Ivan Pacheco's career, education, exchange programs, awards, and certifications — from 2016 to present.",
  alternates: {
    canonical: `${SITE_URL}/timeline`,
  },
  openGraph: {
    title: "Timeline — Ivan Pacheco",
    description:
      "Full career and academic timeline of Ivan Pacheco — Software Engineer.",
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
