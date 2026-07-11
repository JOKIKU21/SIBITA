// ponytail: Server Component wrapper for monitoring payments
import { PembayaranManager } from "@/components/dashboard/admin/PembayaranManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemantauan Pembayaran | SIBITA",
};

export default function PembayaranPage() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Pemantauan Pembayaran</h2>
          <p className="text-3.5 text-neutral-muted">Pantau status pembayaran cicilan registrasi mahasiswa secara lengkap.</p>
        </div>

        <PembayaranManager />
      </div>
    </div>
  );
}
