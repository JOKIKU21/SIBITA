"use client";

import { useState, useMemo } from "react";
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

export function AdminCharts({
  stageDistribution,
  registrationStatus,
  paymentStatus,
}: AdminChartsProps) {
  const [hoveredOrder, setHoveredOrder] = useState<number | null>(null);

  const stagesList = useMemo(() => {
    return stageDistribution.stages || stageDistribution.groups || [];
  }, [stageDistribution]);

  // Max value for Y-Axis
  const maxCount = useMemo(() => {
    return Math.max(...stagesList.map((s) => s.count), 1);
  }, [stagesList]);

  // Calculate clean Y-axis ceiling & step ticks
  const { maxY, ticks } = useMemo(() => {
    const ceiling = Math.max(Math.ceil(maxCount * 1.25), 4);
    const step = Math.max(Math.ceil(ceiling / 4), 1);
    const topValue = step * 4;
    const tickArray = [];
    for (let val = topValue; val >= 0; val -= step) {
      tickArray.push(val);
    }
    return { maxY: topValue, ticks: tickArray };
  }, [maxCount]);

  const getBarGradient = (order: number) => {
    if (order === 0) return "from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600";
    if (order <= 5) return "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700";
    if (order <= 12) return "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600";
    return "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700";
  };

  return (
    <div className="space-y-6 mb-6">
      {/* ─── Main Chart: Grafik Batang Vertikal Sebaran 17 Tahapan ─── */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 mb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h3 className="font-extrabold text-gray-900 text-base tracking-tight">
                Sebaran Mahasiswa per Tahapan Skripsi
              </h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
                {stageDistribution.totalStudents} Mahasiswa Total
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Sumbu Vertikal: Jumlah Mahasiswa | Sumbu Horizontal: Tahapan (Arahkan kursor ke batang untuk melihat nama tahap lengkap dari DB)
            </p>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-3.5 text-xs font-medium text-gray-600 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-gray-400" />
              <span className="text-gray-500">Belum Mulai</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
              <span>Tahap 1–5 (Proposal)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
              <span>Tahap 6–12 (Penelitian)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span>Tahap 13–17 (Akhir/Sidang)</span>
            </span>
          </div>
        </div>

        {/* Vertical Bar Chart Graphic */}
        <div className="relative pt-6 pb-4">
          <div className="flex">
            {/* Y-Axis Label Column (Left) */}
            <div className="flex flex-col justify-between items-end pr-3 pb-8 h-64 text-[11px] font-bold text-gray-400 shrink-0 select-none">
              {ticks.map((tick) => (
                <span key={tick} className="leading-none">
                  {tick}
                </span>
              ))}
            </div>

            {/* Main Bars Area */}
            <div className="flex-1 min-w-0 overflow-x-auto scrollbar-thin">
              <div className="relative h-64 min-w-[650px] flex items-end justify-between gap-1.5 px-2 pb-8 border-b-2 border-gray-300">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 pb-8 flex flex-col justify-between pointer-events-none">
                  {ticks.map((tick) => (
                    <div
                      key={tick}
                      className="w-full border-b border-gray-100 border-dashed"
                    />
                  ))}
                </div>

                {/* Bars */}
                {stagesList.map((stage) => {
                  const heightPercent = maxY > 0 ? (stage.count / maxY) * 100 : 0;
                  const isHovered = hoveredOrder === stage.order;
                  const gradient = getBarGradient(stage.order);

                  return (
                    <div
                      key={stage.order}
                      onMouseEnter={() => setHoveredOrder(stage.order)}
                      onMouseLeave={() => setHoveredOrder(null)}
                      className="relative flex-1 flex flex-col items-center justify-end h-full group z-10 cursor-pointer"
                    >
                      {/* Floating Tooltip on Hover */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3.5 py-2.5 rounded-xl text-xs shadow-md z-50 pointer-events-none whitespace-nowrap transition-all duration-150">
                          <div className="font-extrabold text-blue-300 flex items-center gap-1.5 mb-1">
                            <span className="bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                              {stage.order === 0 ? "Tahap 0" : `Tahap ${stage.order}`}
                            </span>
                            <span className="text-white">{stage.name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-200 text-[11.5px]">
                            <span>
                              Jumlah: <strong className="text-white font-extrabold">{stage.count} Mahasiswa</strong>
                            </span>
                            <span className="text-gray-400">({stage.percentage.toFixed(1)}%)</span>
                          </div>
                          {stage.durationDays ? (
                            <div className="text-[10.5px] text-gray-400 mt-1 pt-1 border-t border-gray-700/80">
                              Target Durasi DB: {stage.durationDays} Hari
                            </div>
                          ) : null}

                          {/* Tooltip Triangle Arrow */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      )}

                      {/* Count Badge Above Bar */}
                      <div className="mb-1 text-[11px] font-extrabold text-gray-700 h-4 flex items-center justify-center">
                        {stage.count > 0 ? (
                          <span
                            className={`transition-transform duration-150 ${
                              isHovered ? "scale-125 text-blue-600" : ""
                            }`}
                          >
                            {stage.count}
                          </span>
                        ) : null}
                      </div>

                      {/* Vertical Bar */}
                      <div className="w-full max-w-[36px] bg-gray-100/70 rounded-t-md flex items-end overflow-hidden h-full">
                        <div
                          className={`w-full rounded-t-md bg-gradient-to-t ${gradient} transition-all duration-300 ease-out ${
                            isHovered ? "brightness-110" : ""
                          }`}
                          style={{
                            height: stage.count > 0 ? `${Math.max(heightPercent, 4)}%` : "0%",
                          }}
                        />
                      </div>

                      {/* X-Axis Label Below Bar */}
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                        <span
                          className={`text-[11px] font-bold transition-colors duration-150 ${
                            isHovered
                              ? "text-blue-600 font-black scale-110"
                              : stage.count > 0
                              ? "text-gray-800"
                              : "text-gray-400"
                          }`}
                        >
                          {stage.order === 0 ? "Belum" : `Tahap ${stage.order}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Row: Donut Charts for Registration & Payment ─── */}
      <div className="grid grid-cols-2 gap-4 max-[1100px]:grid-cols-1">
        {/* Chart 2: Status Verifikasi Registrasi */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-gray-900 text-sm">
                Status Registrasi Akun
              </h3>
              <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                Total {registrationStatus.total} Akun
              </span>
            </div>

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
                  <div className="text-xl font-extrabold text-gray-900 leading-none mb-0.5">
                    {registrationStatus.total}
                  </div>
                  <div className="text-[10px] text-gray-500 font-semibold">
                    Registrasi
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-medium text-gray-700">Disetujui</span>
                </div>
                <div className="font-bold text-gray-900">
                  {registrationStatus.approved.count} (
                  {registrationStatus.approved.percentage.toFixed(1)}%)
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
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
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
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
            <span>Verifikasi Berkas Mahasiswa</span>
            <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              {registrationStatus.pending.count} Perlu Review
            </span>
          </div>
        </div>

        {/* Chart 3: Status Pembayaran Biaya */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-gray-900 text-sm">
                Status Pembayaran Biaya
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {paymentStatus.paid.percentage.toFixed(1)}% Terbayar
              </span>
            </div>

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
                  <div className="text-xl font-extrabold text-gray-900 leading-none mb-0.5">
                    {paymentStatus.total}
                  </div>
                  <div className="text-[10px] text-gray-500 font-semibold">
                    Pembayaran
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-medium text-gray-700">Lunas</span>
                </div>
                <div className="font-bold text-gray-900">
                  {paymentStatus.paid.count} (
                  {paymentStatus.paid.percentage.toFixed(1)}%)
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
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
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
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
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
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
              Rp {paymentStatus.paidAmount?.toLocaleString("id-ID") || 0} Terbayar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
