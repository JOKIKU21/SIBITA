// ponytail: Server Component wrapper for manajemen pengguna
import { ManajemenPenggunaTabs } from "@/components/dashboard/superadmin/ManajemenPenggunaTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | SIBITA",
};

export default function ManajemenPenggunaPage() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Manajemen Pengguna</h2>
          <p className="text-3.5 text-neutral-muted">Tambahkan dan kelola akun Admin sistem.</p>
        </div>

        <ManajemenPenggunaTabs />
      </div>
    </div>
  );
}
