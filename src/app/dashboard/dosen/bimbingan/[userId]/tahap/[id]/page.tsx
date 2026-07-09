// ponytail: Server Component — dosen detail tahapan view
import { notFound } from "next/navigation";
import { STAGES } from "@/lib/stages";
import { DosenStagePageClient } from "@/components/dashboard/dosen/DosenStagePageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Tahapan Mahasiswa | SIBITA",
};

export default async function DosenStagePage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const { userId, id } = await params;

  const stageIndex = STAGES.findIndex((s) => s.slug === id);
  if (stageIndex === -1) notFound();

  const stage = STAGES[stageIndex];
  const { icon: _icon, ...stageWithoutIcon } = stage;

  return <DosenStagePageClient userId={userId} stage={stageWithoutIcon} />;
}
