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
  const [viewMode, setViewMode] = useState<"bar" | "grid">("bar");
  const [searchQuery, setSearchQuery] = useState("");

  const stagesList = useMemo(() => {
    return stageDistribution.stages || stageDistribution.groups || [];
  }, [stageDistribution]);

  const filteredStages = useMemo(() => {
    if (!searchQuery.trim()) return stagesList;
    const q = searchQuery.toLowerCase();
    return stagesList.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        (s.label && s.label.toLowerCase().includes(q)) ||
        s.order?.toString().includes(q)
    );
  }, [stagesList, searchQuery]);

  // Phase statistics summary
  const statsSummary = useMemo(() => {
    let belumMulai = 0;
    let proposal = 0; // 1-5
    let penelitian = 0; // 6-12
    let sidangAkhir = 0; // 13-17

    stagesList.forEach((st) => {
      if (st.order === 0) belumMulai += st.count;
      else if (st.order <= 5) proposal += st.count;
      else if (st.order <= 12) penelitian += st.count;
      else sidangAkhir += st.count;
    });

    return { belumMulai, proposal, penelitian, sidangAkhir };
  }, [stagesList]);

  // Max count to scale bar widths dynamically
  const maxCount = useMemo(() => {
    return Math.max(...stagesList.map((s) => s.count), 1);
  }, [stagesList]);

  const getStageTheme = (order: number) => {
    if (order === 0) {
      return {
        badgeBg: "bg-gray-100 text-gray-700 border-gray-200",
        barBg: "from-gray-400 to-gray-500",
        pillBg: "bg-gray-50 text-gray-600 border-gray-200",
        indicator: "bg-gray-400",
        phaseName: "Belum Mulai",
      };
    }
    if (order <= 5) {
      return {
        badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
        barBg: "from-blue-500 to-indigo-600",
        pillBg: "bg-blue-50/60 text-blue-700 border-blue-100",
        indicator: "bg-blue-500",
        phaseName: "Tahap Proposal",
      };
    }
    if (order <= 12) {
      return {
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
        barBg: "from-amber-500 to-orange-500",
        pillBg: "bg-amber-50/60 text-amber-700 border-amber-100",
        indicator: "bg-amber-500",
        phaseName: "Tahap Penelitian",
      };
    }
    return {
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      barBg: "from-emerald-500 to-teal-600",
      pillBg: "bg-emerald-50/60 text-emerald-700 border-emerald-100",
      indicator: "bg-emerald-500",
      phaseName: "Tahap Akhir",
    };
  };

  return (
    <div className="space-y-6 mb-6">
      {/* ─── Top Row: Donut Charts for Registration & Payment ─── */}
      <div className="grid grid-cols-2 gap-4 max-[1100px]:grid-cols-1">
        {/* Chart 1: Status Verifikasi Registrasi */}
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

        {/* Chart 2: Status Pembayaran Biaya */}
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

      {/* ─── Main Section: Sebaran Tahap Skripsi (17 Tahapan Master DB) ─── */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs">
        {/* Header Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-5 mb-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h3 className="font-extrabold text-gray-900 text-base tracking-tight">
                Sebaran Tahap Skripsi (17 Tahapan DB)
              </h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
                {stageDistribution.totalStudents} Mahasiswa Total
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Data real-time distribusi progres bimbingan per tahapan resmi dari database.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama tahap..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-gray-50 border border-gray-200 rounded-lg py-1.5 pl-8 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 stroke-current stroke-2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200/60">
              <button
                type="button"
                onClick={() => setViewMode("bar")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === "bar"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 stroke-current stroke-2">
                  <path d="M3 3v18h18M7 16h3M7 11h7M7 6h11" strokeLinecap="round" />
                </svg>
                Grafik Batang
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 stroke-current stroke-2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
                Grid Kartu
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Stage Render */}
        {filteredStages.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400 font-medium">
            Tidak ada tahapan yang sesuai dengan pencarian &quot;{searchQuery}&quot;.
          </div>
        ) : viewMode === "bar" ? (
          /* ─── Mode 1: Grafik Batang Horizontal (2 Kolom Desktop) ─── */
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-[1024px]:grid-cols-1">
            {filteredStages.map((stage) => {
              const theme = getStageTheme(stage.order);
              const barWidth =
                stageDistribution.totalStudents > 0
                  ? Math.max((stage.count / maxCount) * 100, stage.count > 0 ? 8 : 2)
                  : 2;

              return (
                <div
                  key={stage.order}
                  className="group relative bg-gray-50/50 hover:bg-blue-50/30 border border-gray-100 hover:border-blue-200/80 rounded-xl p-3.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2.5 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Order Badge */}
                      <span
                        className={`inline-flex items-center justify-center shrink-0 w-7 h-7 rounded-lg text-xs font-black border ${theme.badgeBg}`}
                      >
                        {stage.order === 0 ? "0" : stage.order}
                      </span>

                      {/* Stage Name from DB */}
                      <span
                        className="text-xs font-bold text-gray-800 leading-snug truncate"
                        title={stage.name}
                      >
                        {stage.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {stage.durationDays ? (
                        <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200/80 px-1.5 py-0.5 rounded">
                          {stage.durationDays} Hari
                        </span>
                      ) : null}
                      <span
                        className={`text-xs font-extrabold ${
                          stage.count > 0 ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {stage.count} Mhs ({stage.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="relative w-full h-2.5 bg-gray-200/70 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.barBg} transition-all duration-500 ease-out`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ─── Mode 2: Grid Kartu Interactive ─── */
          <div className="grid grid-cols-3 max-[1200px]:grid-cols-2 max-[640px]:grid-cols-1 gap-3.5">
            {filteredStages.map((stage) => {
              const theme = getStageTheme(stage.order);
              const barWidth =
                stageDistribution.totalStudents > 0
                  ? Math.max((stage.count / maxCount) * 100, stage.count > 0 ? 10 : 3)
                  : 3;

              return (
                <div
                  key={stage.order}
                  className="bg-white border border-gray-200/90 hover:border-blue-400/80 hover:shadow-md rounded-xl p-4 transition-all duration-200 flex flex-col justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black border ${theme.badgeBg}`}
                      >
                        {stage.order === 0 ? "0" : `T${stage.order}`}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                        {theme.phaseName}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 h-8">
                      {stage.name}
                    </h4>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                      <span className="text-gray-500">
                        {stage.durationDays ? `Target: ${stage.durationDays} Hari` : "Status Awal"}
                      </span>
                      <span className="text-gray-900 font-extrabold">
                        {stage.count} Mhs ({stage.percentage.toFixed(1)}%)
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${theme.barBg} transition-all duration-500`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Summary Pills */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 flex-wrap gap-3">
          <div className="flex items-center gap-2 font-medium flex-wrap">
            <span className="text-gray-400 font-semibold">Legenda Fasa:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              Belum Mulai: {statsSummary.belumMulai} mhs
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Proposal (1-5): {statsSummary.proposal} mhs
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-100">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Penelitian (6-12): {statsSummary.penelitian} mhs
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Akhir & Sidang (13-17): {statsSummary.sidangAkhir} mhs
            </span>
          </div>

          <div className="text-[11px] font-semibold text-gray-500">
            Total 17 Tahapan Master DB
          </div>
        </div>
      </div>
    </div>
  );
}
