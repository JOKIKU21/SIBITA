// ponytail: Server Component wrapper for manajemen mahasiswa
import { ManajemenMahasiswaList } from "@/components/dashboard/admin/ManajemenMahasiswaList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Mahasiswa | SIBITA",
};

export default function ManajemenMahasiswaPage() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Manajemen Mahasiswa</h2>
          <p className="text-3.5 text-neutral-muted">Kelola status dan progres bimbingan tugas akhir mahasiswa.</p>
        </div>

        <ManajemenMahasiswaList />
      </div>
    </div>
  );
}
