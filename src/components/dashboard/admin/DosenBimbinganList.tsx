// ponytail: Server Component — dosen list with bimbingan count + progress bar

import Link from "next/link";
import type { DosenItem } from "@/lib/admin-data";

export function DosenBimbinganList({ dosenList }: { dosenList: DosenItem[] }) {
  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Dosen & Bimbingan</h3>
        <Link
          href="/dashboard/admin/manajemen-dosen"
          className="text-[13px] text-brand font-semibold hover:underline"
        >
          Kelola →
        </Link>
      </div>

      <div className="px-6 pb-5 flex flex-col gap-4">
        {dosenList.map((dosen) => {
          return (
            <div key={dosen.nip} className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-full bg-linear-to-br ${dosen.avatarColor} flex items-center justify-center text-[14px] font-bold text-white shrink-0`}>
                {dosen.nama.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13.5px] font-bold text-neutral-text">{dosen.nama}</div>
                    <div className="text-[11.5px] text-neutral-muted">{dosen.prodi}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-[13px] font-bold text-neutral-text">{dosen.totalBimbingan} mhs</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
