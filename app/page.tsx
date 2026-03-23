import VariantPageContent from "@/components/layout/variant-page-content";
import { ContentOverrideProvider } from "@/components/providers/content-provider";
import { getGeneralSections } from "@/lib/variants-server";
import { fetchContentOverrides } from "@/lib/fetch-content-overrides";

/** Revalidate page content every 60 seconds (ISR). */
export const revalidate = 60;

export default async function Home() {
  const [sections, overrides] = await Promise.all([
    getGeneralSections(),
    fetchContentOverrides("en"),
  ]);

  return (
    <ContentOverrideProvider overrides={overrides}>
      <VariantPageContent sections={sections} />
    </ContentOverrideProvider>
  );
}
