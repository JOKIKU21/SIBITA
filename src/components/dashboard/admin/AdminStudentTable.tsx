"use client";

import Link from "next/link";
import type { StudentProgressItem } from "@/services/admin";

interface AdminStudentTableProps {
  students: StudentProgressItem[];
}

const avatarColors = [
  "bg-purple-600",
  "bg-blue-600",
  "bg-teal-500",
  "bg-orange-500",
  "bg-rose-500",
];

function getStatusLabel(status: string): string {
  switch (status) {
    case "completed":
      return "Selesai";
    case "in_progress":
      return "Berlangsung";
    case "pending":
      return "Menunggu";
    default:
      return "";
  }
}

export function AdminStudentTable({ students }: AdminStudentTableProps) {
  const renderStages = (
    stages: StudentProgressItem["stages"],
    currentStageOrder: number
  ) => {
    if (!stages || stages.length === 0) {
      return (
        <div className="flex flex-col items-center">
          <div className="flex gap-1.5 mb-1 opacity-40">
            {Array.from({ length: 17 }, (_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] text-gray-500 font-medium"
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-gray-400">
            Belum ada tahap yang dimulai
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full relative">
        <div className="flex gap-1.5 mb-1 w-full flex-wrap">
          {Array.from({ length: 17 }, (_, i) => {
            const step = i + 1;
            const stage = stages.find((s) => s.order === step);
            let bgClass = "bg-gray-100 text-gray-400";
            let tooltipText = "";

            if (stage) {
              if (stage.status === "completed") {
                bgClass = "bg-green-500 text-white";
                tooltipText = "Selesai";
              } else if (stage.status === "in_progress") {
                bgClass = "bg-orange-500 text-white";
                tooltipText = "Berlangsung";
              } else if (stage.status === "pending") {
                bgClass = "bg-amber-400 text-white";
                tooltipText = "Menunggu";
              }
            }

            return (
              <div
                key={i}
                className="relative group cursor-pointer flex flex-col items-center"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${bgClass}`}
                >
                  {step}
                </div>

                {/* Custom Tooltip on Hover */}
                {tooltipText && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-sm">
                    {tooltipText}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">
          Statistik Mahasiswa
        </h3>
        <Link
          href="/dashboard/admin/manajemen-mahasiswa"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          Lihat Semua Mahasiswa <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {students.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-sm">
          Belum ada data mahasiswa.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase text-gray-500 font-bold border-b border-gray-100">
                <th className="py-3 px-5 whitespace-nowrap">Mahasiswa</th>
                <th className="py-3 px-5 whitespace-nowrap">Prodi</th>
                <th className="py-3 px-5 whitespace-nowrap">
                  Dosen Pembimbing
                </th>
                <th className="py-3 px-5 whitespace-nowrap text-center">
                  Progres Bimbingan
                </th>
                <th className="py-3 px-5 whitespace-nowrap min-w-[350px]">
                  Status Bimbingan Per Tahapan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {students.map((student, idx) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${avatarColors[idx % avatarColors.length]} text-white flex items-center justify-center font-bold text-sm shrink-0`}
                      >
                        {student.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[13px]">
                          {student.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          NIM {student.nim || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-[12px] font-medium text-gray-700 max-w-[100px] leading-tight">
                      {student.studyProgram || "-"}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-[13px] font-bold text-gray-800">
                      {student.advisorName || (
                        <span className="text-gray-400 font-normal">
                          Belum ditentukan
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3 w-32">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${student.progressPercentage}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs font-bold w-9 text-right text-gray-700">
                        {student.progressPercentage}%
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 pb-6">
                    {renderStages(
                      student.stages,
                      student.currentStageOrder
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
