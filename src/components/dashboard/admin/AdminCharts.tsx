"use client";

import type {
  StageDistribution,
  RegistrationStatusData,
  PaymentStatusData,
} from "@/services/admin";

interface AdminChartsProps {
  stageDistribution: StageDistribution;
  registrationStatus: RegistrationStatusData;
  paymentStatus: PaymentStatusData;
}

const barColorMap: Record<string, string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  gray: "bg-gray-400",
};

export function AdminCharts({
  stageDistribution,
  registrationStatus,
  paymentStatus,
}: AdminChartsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 max-[1100px]:grid-cols-1">
      {/* Chart 1: Sebaran Mahasiswa per Tahap */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">
              Sebaran Tahap Skripsi
            </h3>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {stageDistribution.totalStudents} Mahasiswa
            </span>
          </div>

          <div className="space-y-3.5 my-2">
            {stageDistribution.groups.map((group, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700">{group.label}</span>
                  <span className="font-bold text-gray-900">
                    {group.count} ({group.percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColorMap[group.color] || "bg-blue-500"}`}
                    style={{ width: `${group.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Progres merata</span>
          <span className="font-semibold text-gray-700">17 Tahap Total</span>
        </div>
      </div>

      {/* Chart 2: Status Verifikasi Registrasi */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-sm">
            Status Registrasi Akun
          </h3>

          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36">
              <svg
                viewBox="0 0 36 36"
                className="w-full h-full transform -rotate-90"
              >
                {/* Disetujui (Green) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-emerald-500"
                  strokeWidth="5.5"
                  strokeDasharray={`${registrationStatus.approved.percentage} 100`}
                />
                {/* Menunggu (Amber) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-amber-500"
                  strokeWidth="5.5"
                  strokeDasharray={`${registrationStatus.pending.percentage} 100`}
                  strokeDashoffset={`-${registrationStatus.approved.percentage}`}
                />
                {/* Ditolak (Red) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-rose-500"
                  strokeWidth="5.5"
                  strokeDasharray={`${registrationStatus.rejected.percentage} 100`}
                  strokeDashoffset={`-${registrationStatus.approved.percentage + registrationStatus.pending.percentage}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-extrabold text-gray-900">
                  {registrationStatus.total}
                </div>
                <div className="text-[10px] text-gray-500 font-medium">
                  Registrasi
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-gray-700">Disetujui</span>
              </div>
              <div className="font-bold text-gray-900">
                {registrationStatus.approved.count} (
                {registrationStatus.approved.percentage.toFixed(1)}%)
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-medium text-gray-700">
                  Menunggu Verifikasi
                </span>
              </div>
              <div className="font-bold text-gray-900">
                {registrationStatus.pending.count} (
                {registrationStatus.pending.percentage.toFixed(1)}%)
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="font-medium text-gray-700">Ditolak</span>
              </div>
              <div className="font-bold text-gray-900">
                {registrationStatus.rejected.count} (
                {registrationStatus.rejected.percentage.toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Verifikasi Otomatis/Manual</span>
          <span className="font-semibold text-gray-700">
            {registrationStatus.pending.count} Perlu Review
          </span>
        </div>
      </div>

      {/* Chart 3: Status Pembayaran Biaya */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-sm">
            Status Pembayaran Biaya
          </h3>

          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36">
              <svg
                viewBox="0 0 36 36"
                className="w-full h-full transform -rotate-90"
              >
                {/* Lunas (Green) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-emerald-500"
                  strokeWidth="5.5"
                  strokeDasharray={`${paymentStatus.paid.percentage} 100`}
                />
                {/* Diproses (Blue) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-blue-600"
                  strokeWidth="5.5"
                  strokeDasharray={`${paymentStatus.processing.percentage} 100`}
                  strokeDashoffset={`-${paymentStatus.paid.percentage}`}
                />
                {/* Menunggu (Amber) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-amber-500"
                  strokeWidth="5.5"
                  strokeDasharray={`${paymentStatus.pending.percentage} 100`}
                  strokeDashoffset={`-${paymentStatus.paid.percentage + paymentStatus.processing.percentage}`}
                />
                {/* Ditolak (Red) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-rose-500"
                  strokeWidth="5.5"
                  strokeDasharray={`${paymentStatus.rejected.percentage} 100`}
                  strokeDashoffset={`-${paymentStatus.paid.percentage + paymentStatus.processing.percentage + paymentStatus.pending.percentage}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-extrabold text-gray-900">
                  {paymentStatus.total}
                </div>
                <div className="text-[10px] text-gray-500 font-medium">
                  Pembayaran
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-gray-700">Lunas</span>
              </div>
              <div className="font-bold text-gray-900">
                {paymentStatus.paid.count} (
                {paymentStatus.paid.percentage.toFixed(1)}%)
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="font-medium text-gray-700">
                  Sedang Diproses
                </span>
              </div>
              <div className="font-bold text-gray-900">
                {paymentStatus.processing.count} (
                {paymentStatus.processing.percentage.toFixed(1)}%)
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-medium text-gray-700">
                  Menunggu Cicilan
                </span>
              </div>
              <div className="font-bold text-gray-900">
                {paymentStatus.pending.count} (
                {paymentStatus.pending.percentage.toFixed(1)}%)
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="font-medium text-gray-700">
                  Ditolak / Bermasalah
                </span>
              </div>
              <div className="font-bold text-gray-900">
                {paymentStatus.rejected.count} (
                {paymentStatus.rejected.percentage.toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Opsi Cicilan & Lunas</span>
          <span className="font-semibold text-emerald-600">
            {paymentStatus.paid.percentage.toFixed(1)}% Terbayar
          </span>
        </div>
      </div>
    </div>
  );
}
