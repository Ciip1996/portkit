import type { Metadata } from "next";
import UnlockForm from "@/components/ui/unlock-form";

export const metadata: Metadata = {
  title: "Unlock — Portfolio",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ variant: string }>;
}

export default async function VariantUnlockPage({ params }: Props) {
  const { variant } = await params;
  return <UnlockForm redirectTo={`/p/${variant}`} />;
}
