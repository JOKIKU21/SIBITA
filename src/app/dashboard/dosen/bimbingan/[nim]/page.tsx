// ponytail: Server Component — detail mahasiswa with feedback forms
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMahasiswaByNim } from "@/lib/dosen-data";
import { STAGES } from "@/lib/stages";
import { DosenFeedbackForm } from "@/components/dashboard/dosen/DosenFeedbackForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Mahasiswa | SIBITA",
};

const STATUS_BADGE = {
  aktif: { cls: "bg-success-bg text-success", label: "Aktif" },
  "mendekati-tenggat": { cls: "bg-warning-bg text-warning", label: "Mendekati Tenggat" },
  terlambat: { cls: "bg-danger-bg text-danger", label: "Terlambat" },
} as const;

export default async function DetailMahasiswaPage({
  params,
}: {
  params: Promise<{ nim: string }>;
}) {
  const { nim } = await params;
  const mhs = getMahasiswaByNim(nim);
  if (!mhs) notFound();

  const badge = STATUS_BADGE[mhs.status];

  // ponytail: show stages up to current + 1 for context
  const visibleStages = STAGES.filter((s) => s.n <= mhs.tahapanAktif + 1);

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Back link */}
        <Link
          href="/dashboard/dosen/bimbingan"
          className="inline-flex items-center gap-1.5 text-neutral-muted text-[13px] font-semibold mb-4.5 transition-colors duration-150 hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Daftar Bimbingan
        </Link>

        {/* Mahasiswa Info Header */}
        <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-14 h-14 rounded-full bg-linear-to-br ${mhs.avatarColor} flex items-center justify-center text-5 font-bold text-white shrink-0`}>
              {mhs.nama.charAt(0)}
            </div>
            <div>
              <div className="text-white text-5 font-extrabold font-display">{mhs.nama}</div>
              <div className="text-white/70 text-[13px] font-medium">NIM {mhs.nim} · {mhs.prodi}</div>
            </div>
            <span className={`ml-auto whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-bold ${badge.cls}`}>
              {badge.label}
            </span>
          </div>
          <div className="text-white/80 text-3.5 leading-normal">
            <span className="text-white/50 text-[12.5px] font-medium">Judul:</span>{" "}
            {mhs.judul}
          </div>
          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6FE3A6] transition-all duration-500"
                style={{ width: `${mhs.progress}%` }}
              />
            </div>
            <span className="text-white text-[13px] font-bold">{mhs.progress}%</span>
          </div>
        </div>

        {/* Tahapan List with Feedback */}
        <div className="mb-4">
          <h3 className="font-display text-[16px] font-extrabold text-neutral-text mb-1">
            Tahapan & Feedback
          </h3>
          <p className="text-[13px] text-neutral-muted mb-5">
            Berikan catatan dan setujui tahapan yang sudah selesai. Catatan Anda akan terlihat oleh mahasiswa.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          {visibleStages.map((stage) => {
            const isCompleted = stage.n < mhs.tahapanAktif;
            const isCurrent = stage.n === mhs.tahapanAktif;

            return (
              <div key={stage.n} className="relative">
                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isCompleted ? "bg-success" : isCurrent ? "bg-brand" : "bg-neutral-border"}`} />
                  <span className={`text-[12px] font-bold ${isCompleted ? "text-success" : isCurrent ? "text-brand" : "text-neutral-muted"}`}>
                    {isCompleted ? "Selesai" : isCurrent ? "Sedang Berlangsung" : "Belum Dimulai"}
                  </span>
                </div>

                <DosenFeedbackForm
                  tahapanNumber={stage.n}
                  tahapanName={stage.name}
                  initialApproved={isCompleted}
                  initialFeedback={isCompleted ? "Tahapan telah diselesaikan dengan baik." : ""}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
