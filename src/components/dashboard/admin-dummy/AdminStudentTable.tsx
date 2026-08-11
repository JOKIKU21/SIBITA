// ponytail: Server Component — static mock data for table
import React from 'react';

export function AdminStudentTable() {
  const students = [
    {
      id: 1,
      name: "Dodi Ex",
      nim: "NIM -",
      prodi: "-",
      dosen: "Belum ditentukan",
      dosenOptions: true,
      progress: 0,
      avatarBg: "bg-purple-600",
      stages: []
    },
    {
      id: 2,
      name: "Dylan",
      nim: "NIM 22537144011",
      prodi: "Teknologi Informasi",
      dosen: "Dosen SIBITA",
      progress: 0,
      avatarBg: "bg-purple-600",
      stages: []
    },
    {
      id: 3,
      name: "Mahasiswa SIBITA",
      nim: "NIM 10115001",
      prodi: "Teknik Informatika",
      dosen: "Dosen SIBITA",
      progress: 18,
      avatarBg: "bg-blue-600",
      stages: [
        { step: 1, status: "completed", label: "Berlangsung" },
        { step: 2, status: "warning", label: "Mendekati Deadline" }
      ]
    },
    {
      id: 4,
      name: "Andi Pratama",
      nim: "NIM 2212345678",
      prodi: "Sistem Informasi",
      dosen: "Dosen SIBITA",
      progress: 65,
      avatarBg: "bg-teal-500",
      stages: [
        { step: 1, status: "completed" },
        { step: 2, status: "completed" },
        { step: 3, status: "completed" },
        { step: 4, status: "completed", label: "Berlangsung" },
        { step: 5, status: "completed" },
        { step: 6, status: "completed" },
        { step: 7, status: "danger", label: "Melewati Batas" }
      ]
    },
    {
      id: 5,
      name: "Sinta Aulia",
      nim: "NIM 2023456789",
      prodi: "Teknologi Informasi",
      dosen: "Dosen SIBITA",
      progress: 100,
      avatarBg: "bg-orange-500",
      stages: Array.from({length: 17}, (_, i) => ({ step: i + 1, status: "completed", label: i === 16 ? "Selesai" : "" }))
    }
  ];

  const renderStages = (stages: any[]) => {
    if (stages.length === 0) {
      return (
        <div className="flex flex-col items-center">
          <div className="flex gap-1.5 mb-1 opacity-40">
            {Array.from({length: 17}, (_, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] text-gray-500 font-medium">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-gray-400">Belum ada tahap yang dimulai</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full relative">
        <div className="flex gap-1.5 mb-1 w-full flex-wrap">
          {Array.from({length: 17}, (_, i) => {
            const step = i + 1;
            const stage = stages.find(s => s.step === step);
            let bgClass = "bg-gray-100 text-gray-400";
            let tooltipText = stage?.label;
            
            if (stage) {
              if (stage.status === "completed") {
                bgClass = "bg-green-500 text-white";
                tooltipText = tooltipText || "Selesai";
              }
              if (stage.status === "warning") bgClass = "bg-orange-500 text-white";
              if (stage.status === "danger") bgClass = "bg-red-500 text-white";
            }
            
            return (
              <div key={i} className="relative group cursor-pointer flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${bgClass}`}>
                  {step}
                </div>
                
                {/* Custom Tooltip on Hover */}
                {tooltipText && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-sm">
                    {tooltipText}
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getProgressColor = (progress: number) => {
    return "bg-green-500";
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Statistik Mahasiswa</h3>
        <a href="#" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
          Lihat Semua Mahasiswa <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] uppercase text-gray-500 font-bold border-b border-gray-100">
              <th className="py-3 px-5 whitespace-nowrap">Mahasiswa</th>
              <th className="py-3 px-5 whitespace-nowrap">Prodi</th>
              <th className="py-3 px-5 whitespace-nowrap">Dosen Pembimbing</th>
              <th className="py-3 px-5 whitespace-nowrap text-center">Progres Bimbingan</th>
              <th className="py-3 px-5 whitespace-nowrap min-w-[350px]">Status Bimbingan Per Tahapan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${student.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-[13px]">{student.name}</div>
                      <div className="text-[11px] text-gray-500">{student.nim}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5">
                  <div className="text-[12px] font-medium text-gray-700 max-w-[100px] leading-tight">{student.prodi}</div>
                </td>
                <td className="py-4 px-5">
                  {student.dosenOptions ? (
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">{student.dosen}</div>
                      <select className="text-[12px] border border-gray-300 rounded p-1 bg-white outline-none w-32 focus:border-blue-500">
                        <option>Pilih Pembimbing...</option>
                      </select>
                    </div>
                  ) : (
                    <div className="text-[13px] font-bold text-gray-800">{student.dosen}</div>
                  )}
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3 w-32">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
                      <div 
                        className={`h-full rounded-full ${getProgressColor(student.progress)}`} 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-bold w-9 text-right text-gray-700">{student.progress}%</div>
                  </div>
                </td>
                <td className="py-4 px-5 pb-6">
                  {renderStages(student.stages)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
