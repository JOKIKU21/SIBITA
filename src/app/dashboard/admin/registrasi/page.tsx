// ponytail: Server Component wrapper for registrasi mahasiswa
import { RegistrasiMahasiswaList } from "@/components/dashboard/admin/RegistrasiMahasiswaList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi Mahasiswa | SIBITA",
};

export default function RegistrasiMahasiswaPage() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Registrasi Mahasiswa</h2>
          <p className="text-3.5 text-neutral-muted">Kelola persetujuan registrasi mahasiswa baru dan bukti pembayaran.</p>
        </div>

        <RegistrasiMahasiswaList />
      </div>
    </div>
  );
}
