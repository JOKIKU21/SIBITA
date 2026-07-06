import type { Metadata } from "next";
import ReferensiClient from "../../../../components/dashboard/ReferensiClient";

export const metadata: Metadata = {
  title: "Referensi Buku & Jurnal | SIBITA",
};

export default function ReferensiPage() {
  return <ReferensiClient />;
}
