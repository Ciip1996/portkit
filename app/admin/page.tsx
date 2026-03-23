import { Suspense } from "react";
import type { Metadata } from "next";
import AdminContent from "./admin-content";

export const metadata: Metadata = {
  title: "Admin — Portfolio Variants",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  );
}
