// ponytail: Server Component — lightweight static SVG charts for admin overview
import React from 'react';

export function AdminCharts() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 max-[1100px]:grid-cols-1">
      
      {/* Chart 1: Sebaran Mahasiswa per Tahap */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">Sebaran Tahap Skripsi</h3>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">45 Mahasiswa</span>
          </div>

          <div className="space-y-3.5 my-2">
            {/* Tahap 1 */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">Tahap 1: Konsep & Judul</span>
                <span className="font-bold text-gray-900">12 (26.7%)</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '26.7%' }}></div>
              </div>
            </div>

            {/* Tahap 2-3 */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">Tahap 2-3: Proposal & Konsultasi</span>
                <span className="font-bold text-gray-900">18 (40%)</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            {/* Tahap 4-5 */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">Tahap 4-5: Sempro & Penelitian</span>
                <span className="font-bold text-gray-900">10 (22.2%)</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '22.2%' }}></div>
              </div>
            </div>

            {/* Tahap 6-7 */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-gray-700">Tahap 6-7: Munaqosyah & Lulus</span>
                <span className="font-bold text-gray-900">5 (11.1%)</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '11.1%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Progres merata</span>
          <span className="font-semibold text-gray-700">7 Tahap Total</span>
        </div>
      </div>

      {/* Chart 2: Status Verifikasi Registrasi */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Status Registrasi Akun</h3>
          
          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Disetujui (Green) - 84.4% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-emerald-500" strokeWidth="5.5" strokeDasharray="84.4 100" />
                {/* Menunggu (Amber) - 11.1% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-amber-500" strokeWidth="5.5" strokeDasharray="11.1 100" strokeDashoffset="-84.4" />
                {/* Ditolak (Red) - 4.5% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-rose-500" strokeWidth="5.5" strokeDasharray="4.5 100" strokeDashoffset="-95.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-extrabold text-gray-900">45</div>
                <div className="text-[10px] text-gray-500 font-medium">Registrasi</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="font-medium text-gray-700">Disetujui</span>
              </div>
              <div className="font-bold text-gray-900">38 (84.4%)</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span className="font-medium text-gray-700">Menunggu Verifikasi</span>
              </div>
              <div className="font-bold text-gray-900">5 (11.1%)</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <span className="font-medium text-gray-700">Ditolak</span>
              </div>
              <div className="font-bold text-gray-900">2 (4.5%)</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Verifikasi Otomatis/Manual</span>
          <span className="font-semibold text-gray-700">5 Perlu Review</span>
        </div>
      </div>

      {/* Chart 3: Status Pembayaran Biaya */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Status Pembayaran Biaya</h3>
          
          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Lunas (Green) - 62.2% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-emerald-500" strokeWidth="5.5" strokeDasharray="62.2 100" />
                {/* Diproses (Blue) - 22.2% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-blue-600" strokeWidth="5.5" strokeDasharray="22.2 100" strokeDashoffset="-62.2" />
                {/* Menunggu (Amber) - 11.1% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-amber-500" strokeWidth="5.5" strokeDasharray="11.1 100" strokeDashoffset="-84.4" />
                {/* Ditolak (Red) - 4.5% */}
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-rose-500" strokeWidth="5.5" strokeDasharray="4.5 100" strokeDashoffset="-95.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-extrabold text-gray-900">45</div>
                <div className="text-[10px] text-gray-500 font-medium">Pembayaran</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="font-medium text-gray-700">Lunas</span>
              </div>
              <div className="font-bold text-gray-900">28 (62.2%)</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                <span className="font-medium text-gray-700">Sedang Diproses</span>
              </div>
              <div className="font-bold text-gray-900">10 (22.2%)</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span className="font-medium text-gray-700">Menunggu Cicilan</span>
              </div>
              <div className="font-bold text-gray-900">5 (11.1%)</div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <span className="font-medium text-gray-700">Ditolak / Bermasalah</span>
              </div>
              <div className="font-bold text-gray-900">2 (4.5%)</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Opsi Cicilan & Lunas</span>
          <span className="font-semibold text-emerald-600">62.2% Terbayar</span>
        </div>
      </div>

    </div>
  );
}
