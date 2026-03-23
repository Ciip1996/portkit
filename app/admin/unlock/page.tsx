import type { Metadata } from "next";
import UnlockForm from "@/components/ui/unlock-form";

export const metadata: Metadata = {
  title: "Unlock — Admin",
  robots: { index: false, follow: false },
};

export default function AdminUnlockPage() {
  return <UnlockForm redirectTo="/admin" />;
}
