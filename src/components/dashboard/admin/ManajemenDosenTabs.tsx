"use client";

// ponytail: component for manajemen dosen
import { DOSEN_LIST } from "@/lib/admin-data";

export function ManajemenDosenTabs() {
  return <DaftarDosenTab />;
}

// ─── Tab 1: Daftar Dosen ───
function DaftarDosenTab() {
  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Dosen</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
              <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">No. HP</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Jml Bimbingan</th>
            </tr>
          </thead>
          <tbody>
            {DOSEN_LIST.map((d) => (
              <tr key={d.nip} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-linear-to-br ${d.avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                      {d.nama.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-bold text-neutral-text">{d.nama}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{d.email}</td>
                <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{d.phone}</td>
                <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">{d.prodi}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="text-[13px] font-bold text-brand">{d.totalBimbingan}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
