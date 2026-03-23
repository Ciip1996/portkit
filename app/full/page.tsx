import type { Metadata } from "next";
import FullShowcaseContent from "@/components/layout/full-showcase-content";
import { ContentOverrideProvider } from "@/components/providers/content-provider";
import { fetchContentOverrides } from "@/lib/fetch-content-overrides";
import { portfolio } from "@/config/portfolio";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${portfolio.author.displayName} — Full Portfolio`,
  robots: { index: false, follow: false },
};

export default async function FullPage() {
  const overrides = await fetchContentOverrides("en");

  return (
    <ContentOverrideProvider overrides={overrides}>
      <FullShowcaseContent />
    </ContentOverrideProvider>
  );
}
