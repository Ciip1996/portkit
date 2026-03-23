import type { Metadata } from "next";
import UnlockForm from "@/components/ui/unlock-form";

export const metadata: Metadata = {
  title: "Unlock — Full Portfolio",
  robots: { index: false, follow: false },
};

export default function FullUnlockPage() {
  return <UnlockForm redirectTo="/full" />;
}
