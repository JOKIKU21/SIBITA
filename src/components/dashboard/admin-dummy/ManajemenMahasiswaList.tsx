// ponytail: Server Component — pure presentation with static mock data
import React from 'react';

export function ManajemenMahasiswaList() {
  const students = [
    { 
      id: 1, 
      name: "Dodi Ex", 
      nim: "NIM -", 
      prodi: "-", 
      dosen: "Belum ditentukan", 
      tahap: "Tahap 0", 
      tahapDesc: "Belum Memulai", 
      status: "Belum Mulai", 
      statusColor: "bg-gray-100 text-gray-600",
      progress: 0, 
      progressColor: "bg-gray-200",
      accountStatus: "Aktif",
      avatarBg: "bg-purple-600"
    },
    { 
      id: 2, 
      name: "Dylan", 
      nim: "NIM 22537144011", 
      prodi: "Teknologi Informasi", 
      dosen: "Dosen SIBITA", 
      tahap: "Tahap 1", 
      tahapDesc: "Diskusi Konsep dan Judul Penelitian", 
      status: "Berlangsung", 
      statusColor: "bg-blue-50 text-blue-600",
      progress: 18, 
      progressColor: "bg-blue-600",
      accountStatus: "Aktif",
      avatarBg: "bg-purple-600"
    },
    { 
      id: 3, 
      name: "Mahasiswa SIBITA", 
      nim: "NIM 10115001", 
      prodi: "Teknik Informatika", 
      dosen: "Dosen SIBITA", 
      tahap: "Tahap 3", 
      tahapDesc: "Konsultasi Dosen Pembimbing (ke-1)", 
      status: "Menunggu", 
      statusColor: "bg-orange-50 text-orange-500",
      progress: 41, 
      progressColor: "bg-orange-500",
      accountStatus: "Aktif",
      avatarBg: "bg-blue-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-[22px] font-extrabold text-neutral-text mb-1 font-display">Manajemen Mahasiswa</h1>
        <p className="text-[13px] text-neutral-muted font-medium">Kelola status dan progres bimbingan tugas akhir mahasiswa.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
        <div className="flex gap-4 max-[600px]:flex-col max-[600px]:w-full">
          <div className="relative">
            <select className="appearance-none w-56 pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 bg-gray-50/50 hover:bg-white transition-colors max-[600px]:w-full">
              <option>Semua Program Studi</option>
              <option>Teknik Informatika</option>
              <option>Sistem Informasi</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          <div className="relative">
            <select className="appearance-none w-48 pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 bg-gray-50/50 hover:bg-white transition-colors max-[600px]:w-full">
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        <div className="relative max-[600px]:w-full">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input 
            type="text" 
            placeholder="Cari mahasiswa, NIM, prodi..." 
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 w-80 max-[600px]:w-full bg-gray-50/50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 mb-8">
        
        {/* Total Mahasiswa */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">45</div>
              <div className="text-[13px] font-bold text-gray-800">Total Mahasiswa</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">Semua mahasiswa terdaftar</div>
          <div className="absolute right-0 bottom-0 text-blue-50 opacity-80 pointer-events-none transform translate-x-2 translate-y-2">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </div>
        </div>

        {/* Mahasiswa Aktif */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#10b981] text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">15</div>
              <div className="text-[13px] font-bold text-gray-800">Mahasiswa Aktif</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">Sedang dalam proses bimbingan</div>
          <div className="absolute right-0 bottom-0 text-green-50 opacity-80 pointer-events-none transform translate-x-2 translate-y-2">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Menunggu Bimbingan */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-400 text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">8</div>
              <div className="text-[13px] font-bold text-gray-800">Menunggu Bimbingan</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">Menunggu dosen atau input awal</div>
          <div className="absolute right-0 bottom-0 text-orange-50 opacity-80 pointer-events-none transform translate-x-2 translate-y-2">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M10 15V9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 15V9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Selesai Bimbingan */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">22</div>
              <div className="text-[13px] font-bold text-gray-800">Selesai Bimbingan</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">Telah menyelesaikan bimbingan</div>
          <div className="absolute right-0 bottom-0 text-purple-50 opacity-80 pointer-events-none transform translate-x-2 translate-y-2">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 10L12 5 2 10l10 5 10-5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-[14px]">Daftar Mahasiswa</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase text-gray-500 font-bold border-b border-gray-100 tracking-wider">
                <th className="py-3 px-5 whitespace-nowrap">MAHASISWA</th>
                <th className="py-3 px-5 whitespace-nowrap">PRODI</th>
                <th className="py-3 px-5 whitespace-nowrap">DOSEN PEMBIMBING</th>
                <th className="py-3 px-5 whitespace-nowrap">TAHAP SAAT INI</th>
                <th className="py-3 px-5 whitespace-nowrap text-center">STATUS BIMBINGAN</th>
                <th className="py-3 px-5 whitespace-nowrap">PROGRES BIMBINGAN</th>
                <th className="py-3 px-5 whitespace-nowrap">STATUS</th>
                <th className="py-3 px-5 whitespace-nowrap text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Mahasiswa */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${student.avatarBg} text-white flex items-center justify-center font-bold text-[13px] shrink-0`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[13px]">{student.name}</div>
                        <div className="text-[11px] text-gray-500">{student.nim}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Prodi */}
                  <td className="py-4 px-5 text-[13px] text-gray-600 font-medium">
                    {student.prodi}
                  </td>
                  
                  {/* Dosen Pembimbing */}
                  <td className="py-4 px-5">
                    {student.dosen === "Belum ditentukan" ? (
                      <div>
                        <div className="text-[12px] italic text-gray-400 mb-1.5">{student.dosen}</div>
                        <div className="relative inline-block w-40">
                          <select className="appearance-none w-full px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 focus:outline-none focus:border-blue-500 bg-white">
                            <option>Pilih Pembimbing...</option>
                            <option>Dosen SIBITA</option>
                          </select>
                          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="font-bold text-gray-900 text-[13px]">{student.dosen}</div>
                    )}
                  </td>
                  
                  {/* Tahap Saat Ini */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-gray-900 text-[13px]">{student.tahap}</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">{student.tahapDesc}</div>
                  </td>
                  
                  {/* Status Bimbingan */}
                  <td className="py-4 px-5 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${student.statusColor}`}>
                      {student.status}
                    </span>
                  </td>
                  
                  {/* Progres Bimbingan */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[80px]">
                        <div 
                          className={`h-full rounded-full ${student.progressColor}`} 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[12px] font-bold text-gray-600 w-8">{student.progress}%</span>
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="py-4 px-5">
                    <span className="inline-flex px-2 py-0.5 bg-green-100/50 text-green-600 rounded text-[11px] font-bold">
                      {student.accountStatus}
                    </span>
                  </td>
                  
                  {/* Aksi */}
                  <td className="py-4 px-5">
                    <div className="flex justify-center gap-2">
                      <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded border border-red-100 flex items-center justify-center text-red-500 bg-red-50/50 hover:bg-red-100 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center flex-wrap gap-4 text-[12px] font-medium text-gray-500 px-2 pb-6">
        <span>Keterangan Status Bimbingan:</span>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>Berlangsung</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>Menunggu</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>Selesai</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>Terlambat</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>Belum Mulai</div>
      </div>

    </div>
  );
}
