import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVariant } from "@/lib/variants-server";
import VariantPageContent from "@/components/layout/variant-page-content";
import { ContentOverrideProvider } from "@/components/providers/content-provider";
import { fetchContentOverrides } from "@/lib/fetch-content-overrides";
import { portfolio } from "@/config/portfolio";

export const revalidate = 60;

interface Props {
  params: Promise<{ variant: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  const config = await getVariant(variant);

  return {
    title: config
      ? `${portfolio.author.displayName} — ${config.label}`
      : "Portfolio — Not Found",
    robots: { index: false, follow: false },
  };
}

export default async function CustomVariantPage({ params }: Props) {
  const { variant } = await params;
  const [config, overrides] = await Promise.all([
    getVariant(variant),
    fetchContentOverrides("en"),
  ]);

  if (!config) notFound();

  return (
    <ContentOverrideProvider overrides={overrides}>
      <VariantPageContent sections={config.sections} />
    </ContentOverrideProvider>
  );
}
