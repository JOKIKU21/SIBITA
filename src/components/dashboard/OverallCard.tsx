"use client";

import { useProgress } from "@/components/providers/ProgressProvider";

export function OverallCard() {
  const { completedStages, stages, isLoading } = useProgress();

  const total = stages.length || 1;
  const completed = completedStages.size;
  const percent = Math.min(100, Math.max(0, Math.round((completed / total) * 100)));

  return (
    <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-7 shadow-xs">
      <div className="flex items-center gap-5">
        <div className="w-13.5 h-13.5 rounded-3.5 bg-white/14 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-6.5 h-6.5">
            <path
              d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-[17px] font-extrabold text-white mb-1">
            Progres Keseluruhan
          </h3>
          <p className="text-[13.5px] text-white/78 font-semibold">
            {isLoading ? "Memuat progres..." : `${completed} dari ${stages.length} tahap selesai`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-72 shrink-0">
        <div className="flex items-center justify-between text-white text-xs font-bold">
          <span className="text-white/80 font-semibold">Capaian Progress</span>
          <span className="font-display text-sm font-extrabold text-white">{percent}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 p-0.5 overflow-hidden backdrop-blur-xs">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}


