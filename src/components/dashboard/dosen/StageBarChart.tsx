"use client";

// ponytail: pure CSS/Tailwind bar chart — no chart library needed
import { useState } from "react";

interface BarData {
  label: string;
  aktif: number;
  mendekatTenggat: number;
  terlambat: number;
}

export function StageBarChart({ data }: { data: Record<string, { aktif: number; mendekatTenggat: number; terlambat: number }> }) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const bars: BarData[] = Object.entries(data)
    .sort(([a], [b]) => {
      const numA = parseInt(a.replace("Tahap ", ""));
      const numB = parseInt(b.replace("Tahap ", ""));
      return numA - numB;
    })
    .map(([label, counts]) => ({ label, ...counts }));

  const maxTotal = Math.max(...bars.map((b) => b.aktif + b.mendekatTenggat + b.terlambat), 1);

  return (
    <div className="bg-white border border-neutral-border rounded-3.5 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Statistik Tahapan Mahasiswa</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-[11.5px] text-neutral-muted font-medium">Aktif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-[11.5px] text-neutral-muted font-medium">Mendekati Tenggat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-danger" />
            <span className="text-[11.5px] text-neutral-muted font-medium">Terlambat</span>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-2.5 h-48">
        {bars.map((bar) => {
          const total = bar.aktif + bar.mendekatTenggat + bar.terlambat;
          const heightPercent = (total / maxTotal) * 100;
          const isHovered = hoveredBar === bar.label;

          return (
            <div
              key={bar.label}
              className="flex-1 flex flex-col items-center gap-1.5 relative"
              onMouseEnter={() => setHoveredBar(bar.label)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {/* Tooltip */}
              {isHovered ? (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-neutral-text text-white text-[11px] font-medium py-2 px-3 rounded-2 whitespace-nowrap z-10 shadow-lg">
                  <div className="font-bold mb-1">{bar.label}</div>
                  <div>Aktif: {bar.aktif}</div>
                  {bar.mendekatTenggat > 0 ? <div>Mendekati Tenggat: {bar.mendekatTenggat}</div> : null}
                  {bar.terlambat > 0 ? <div>Terlambat: {bar.terlambat}</div> : null}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-text rotate-45" />
                </div>
              ) : null}

              {/* Stacked bar */}
              <div
                className="w-full rounded-t-1.5 flex flex-col-reverse overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ height: `${heightPercent}%`, minHeight: total > 0 ? "8px" : "0" }}
              >
                {bar.aktif > 0 ? (
                  <div
                    className="w-full bg-success transition-opacity duration-150"
                    style={{ height: `${(bar.aktif / total) * 100}%` }}
                  />
                ) : null}
                {bar.mendekatTenggat > 0 ? (
                  <div
                    className="w-full bg-warning transition-opacity duration-150"
                    style={{ height: `${(bar.mendekatTenggat / total) * 100}%` }}
                  />
                ) : null}
                {bar.terlambat > 0 ? (
                  <div
                    className="w-full bg-danger transition-opacity duration-150"
                    style={{ height: `${(bar.terlambat / total) * 100}%` }}
                  />
                ) : null}
              </div>

              <span className="text-[10px] text-neutral-muted font-medium">{bar.label.replace("Tahap ", "T")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
