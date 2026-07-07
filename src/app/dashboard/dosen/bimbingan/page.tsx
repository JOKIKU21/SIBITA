// ponytail: Server Component — full bimbingan list
import { BimbinganTable } from "@/components/dashboard/dosen/BimbinganTable";
import { MAHASISWA_BIMBINGAN } from "@/lib/dosen-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bimbingan | SIBITA",
};

export default function BimbinganPage() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Mahasiswa Bimbingan</h2>
          <p className="text-3.5 text-neutral-muted">
            Daftar seluruh mahasiswa yang Anda bimbing pada semester ini.
          </p>
        </div>

        <BimbinganTable mahasiswa={MAHASISWA_BIMBINGAN} showHeader={false} />
      </div>
    </div>
  );
}
