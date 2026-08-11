// ponytail: Server Component — pure presentation with static mock data
import React from 'react';
import Link from 'next/link';
import { StatCard } from './AdminStatCards'; // Reuse the StatCard from before

export function ManajemenDosenTabs() {
  const cards = [
    {
      title: "Semua dosen terdaftar",
      value: "12",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-600">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-blue-500 text-white", // Override standard iconBg if needed, but StatCard expects string classes
      subStats: [],
      extra: (
        <div className="absolute right-2 bottom-2 text-blue-100 opacity-50">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </div>
      )
    },
    {
      title: "83.3% dari total dosen",
      value: "10",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-green-600">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-green-500 text-white",
      subStats: [],
      extra: (
        <div className="absolute right-2 bottom-2 text-green-100 opacity-50">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    },
    {
      title: "16.7% dari total dosen",
      value: "2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-orange-600">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-orange-500 text-white",
      subStats: [],
      extra: (
        <div className="absolute right-2 bottom-2 text-orange-100 opacity-50">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    },
    {
      title: "Keseluruhan bimbingan yang ditangani",
      value: "28",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-purple-600">
          <path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-purple-500 text-white",
      subStats: [],
      extra: (
        <div className="absolute right-2 bottom-2 text-purple-100 opacity-50">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 10L12 5 2 10l10 5 10-5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
  ];

  const lecturers = [
    { id: 1, name: "Dosen SIBITA", nidn: "NIDN 1234567890", email: "lecturer@sibita.com", phone: "0812-3456-7890", prodi: "Teknik Informatika", jml: 2, status: "Aktif", avatar: "bg-pink-500" },
    { id: 2, name: "Ayu Lestari, M.Kom", nidn: "NIDN 0987654321", email: "ayu.lestari@sibita.com", phone: "0813-2222-3333", prodi: "Sistem Informasi", jml: 5, status: "Aktif", avatar: "bg-purple-600" },
    { id: 3, name: "Budi Santoso, S.T., M.T.", nidn: "NIDN 1122334455", email: "budi.santoso@sibita.com", phone: "0814-4444-5555", prodi: "Teknik Informatika", jml: 4, status: "Aktif", avatar: "bg-orange-500" },
    { id: 4, name: "Citra Wulandari, M.Si", nidn: "NIDN 5566778899", email: "citra.wulandari@sibita.com", phone: "0815-6666-7777", prodi: "Teknologi Informasi", jml: 3, status: "Aktif", avatar: "bg-blue-600" },
    { id: 5, name: "Dedi Kurniawan, M.Kom", nidn: "NIDN 6677889900", email: "dedi.kurniawan@sibita.com", phone: "0816-8888-9999", prodi: "Sistem Informasi", jml: 0, status: "Nonaktif", avatar: "bg-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-start mb-6 max-[600px]:flex-col max-[600px]:gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-neutral-text mb-1 font-display">Manajemen Dosen</h1>
          <p className="text-[13px] text-neutral-muted font-medium">Daftarkan dosen dan kelola pencocokan mahasiswa bimbingan.</p>
        </div>
        
        <Link href="?modal=tambah" className="flex items-center gap-2 bg-blue-600 border border-blue-600 rounded-lg px-4 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-blue-700 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tambah Dosen
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 mb-8">
        {/* We use custom card layout because the design requested is slightly different from StatCard (value on top, different icon styles) */}
        {/* Total Dosen */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">12</div>
              <div className="text-[13px] font-bold text-gray-800">Total Dosen</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">Semua dosen terdaftar</div>
          <div className="absolute -right-2 -bottom-2 text-blue-50 opacity-50 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </div>
        </div>

        {/* Dosen Aktif */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#10b981] text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">10</div>
              <div className="text-[13px] font-bold text-gray-800">Dosen Aktif</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">83.3% dari total dosen</div>
          <div className="absolute right-1 bottom-1 text-green-50 opacity-60 pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Dosen Nonaktif */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">2</div>
              <div className="text-[13px] font-bold text-gray-800">Dosen Nonaktif</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">16.7% dari total dosen</div>
          <div className="absolute right-1 bottom-1 text-orange-50 opacity-60 pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Total Bimbingan */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">28</div>
              <div className="text-[13px] font-bold text-gray-800">Total Bimbingan</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-6">Keseluruhan bimbingan yang ditangani</div>
          <div className="absolute right-0 bottom-0 text-purple-50 opacity-60 pointer-events-none">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 10L12 5 2 10l10 5 10-5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 flex-wrap gap-4">
          <h3 className="font-bold text-gray-900 text-sm">Semua Dosen</h3>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input 
                type="text" 
                placeholder="Cari dosen, email, prodi..." 
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 w-64 bg-gray-50/50"
              />
            </div>
            
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:border-blue-500 bg-white">
                <option>Semua Status</option>
                <option>Aktif</option>
                <option>Nonaktif</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase text-gray-500 font-bold border-b border-gray-100 tracking-wider">
                <th className="py-3 px-5 whitespace-nowrap">DOSEN</th>
                <th className="py-3 px-5 whitespace-nowrap">EMAIL</th>
                <th className="py-3 px-5 whitespace-nowrap">NO. HP</th>
                <th className="py-3 px-5 whitespace-nowrap">PRODI</th>
                <th className="py-3 px-5 whitespace-nowrap text-center">JML BIMBINGAN</th>
                <th className="py-3 px-5 whitespace-nowrap">STATUS</th>
                <th className="py-3 px-5 whitespace-nowrap text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {lecturers.map((lecturer) => (
                <tr key={lecturer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${lecturer.avatar} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                        {lecturer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[13px]">{lecturer.name}</div>
                        <div className="text-[11px] text-gray-500">{lecturer.nidn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[13px] text-gray-600">{lecturer.email}</td>
                  <td className="py-4 px-5 text-[13px] text-gray-600 font-medium">{lecturer.phone}</td>
                  <td className="py-4 px-5 text-[13px] text-gray-600">{lecturer.prodi}</td>
                  <td className="py-4 px-5 text-center">
                    <span className={`font-bold text-[14px] ${lecturer.jml > 0 ? 'text-blue-600' : 'text-blue-600'}`}>
                      {lecturer.jml}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                      lecturer.status === 'Aktif' ? 'bg-green-100/50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {lecturer.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex justify-center gap-2">
                      <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <Link href="?modal=edit" className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
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
        
        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100 text-xs">
          <div className="text-gray-500 font-medium">Menampilkan 1 - 5 dari 12 data</div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-blue-600 bg-white text-blue-600 font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-gray-600 font-medium hover:bg-gray-50">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-gray-600 font-medium hover:bg-gray-50">3</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
