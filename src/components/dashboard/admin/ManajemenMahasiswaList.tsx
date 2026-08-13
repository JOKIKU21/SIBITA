"use client";

import { useState } from "react";
import { useAdminStudents, useAdminLecturers, useAssignAdvisor, useUpdateStudentStatus, useAdminStudentsSummary } from "@/hooks/useAdmin";
import { useDebounce } from "@/hooks/useDebounce";

const AVATAR_COLORS = [
  "from-[#818CF8] to-[#6366F1]",
  "from-[#34D399] to-[#059669]",
  "from-[#FB923C] to-[#EA580C]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#60A5FA] to-[#2563EB]",
  "from-[#A78BFA] to-[#7C3AED]",
];

function getAvatarColor(name: string) {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

// ─── Stat Card Icons ───
function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

// ─── Mahasiswa Stat Cards ───
function MahasiswaStatCards() {
  const { data, isLoading } = useAdminStudentsSummary();

  const cards = [
    {
      icon: <PersonIcon />,
      value: data?.totalMahasiswa ?? 0,
      label: "Total Mahasiswa",
      subtitle: "Semua mahasiswa terdaftar",
      iconBg: "bg-[#3B82F6]",
    },
    {
      icon: <CheckCircleIcon />,
      value: data?.mahasiswaAktif ?? 0,
      label: "Mahasiswa Aktif",
      subtitle: "Sedang dalam proses bimbingan",
      iconBg: "bg-[#22C55E]",
    },
    {
      icon: <PauseIcon />,
      value: data?.menungguBimbingan ?? 0,
      label: "Menunggu Bimbingan",
      subtitle: "Menunggu dosen atau input awal",
      iconBg: "bg-[#F97316]",
    },
    {
      icon: <GraduationCapIcon />,
      value: data?.selesaiBimbingan ?? 0,
      label: "Selesai Bimbingan",
      subtitle: "Telah menyelesaikan bimbingan",
      iconBg: "bg-[#8B5CF6]",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative bg-white border border-neutral-border rounded-3.5 px-5 py-4.5 overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(43,59,175,0.07)]"
        >
          {/* Decorative bottom-right accent */}
          <div className={`absolute -bottom-3 -right-3 w-14 h-14 rounded-full ${card.iconBg} opacity-[0.07]`} />

          <div className="flex items-start gap-3.5">
            {/* Icon */}
            <div className={`w-11 h-11 rounded-3 ${card.iconBg} flex items-center justify-center text-white shrink-0`}>
              {isLoading ? (
                <div className="w-5 h-5 rounded bg-white/30 animate-pulse" />
              ) : (
                card.icon
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {isLoading ? (
                <>
                  <div className="h-7 bg-neutral-bg rounded w-12 mb-1 animate-pulse" />
                  <div className="h-3.5 bg-neutral-bg rounded w-20 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="text-[22px] font-extrabold font-display text-neutral-text leading-tight">
                    {card.value}
                  </div>
                  <div className="text-[12.5px] font-semibold text-neutral-text mt-0.5">
                    {card.label}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Subtitle */}
          {!isLoading && (
            <div className="text-[11.5px] text-neutral-muted mt-2.5">
              {card.subtitle}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ManajemenMahasiswaList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: studentsData, isLoading: isStudentsLoading, error: studentsError, refetch: refetchStudents } = useAdminStudents(debouncedSearch);
  const { data: lecturersData, isLoading: isLecturersLoading } = useAdminLecturers();

  const assignAdvisor = useAssignAdvisor();
  const updateStatus = useUpdateStudentStatus();

  const [prodiFilter, setProdiFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const students = studentsData?.students || [];
  const lecturers = lecturersData?.lecturers || [];

  const handleAssignAdvisor = (studentId: string, advisorId: string) => {
    if (!advisorId) return;
    assignAdvisor.mutate({ studentId, advisorId });
  };

  const handleUpdateStatus = (studentId: string, status: "active" | "nonactive" | "ended") => {
    updateStatus.mutate({ studentId, status });
  };

  // Filtering logic
  const filteredMahasiswa = students.filter((m) => {
    const matchesProdi = prodiFilter === "All" || m.studyProgram === prodiFilter;
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesProdi && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <MahasiswaStatCards />
      {/* Filters & Search */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-wrap gap-4 items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Prodi Filter */}
          <div className="flex flex-col gap-1">
            <select
              value={prodiFilter}
              onChange={(e) => setProdiFilter(e.target.value)}
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.5 py-2.5 px-4 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer font-semibold text-neutral-text"
            >
              <option value="All">Semua Program Studi</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.5 py-2.5 px-4 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer font-semibold text-neutral-text"
            >
              <option value="All">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="nonactive">Nonaktif</option>
              <option value="ended">Selesai</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-70 max-[600px]:max-w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-muted">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari mahasiswa, NIM, prodi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-bg border border-neutral-border rounded-2.5 py-2.5 pl-9 pr-4 text-[13.5px] outline-none font-sans focus:border-brand-light transition-[border-color] duration-200 text-neutral-text placeholder-neutral-muted font-semibold"
          />
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden shadow-sm">
        <div className="px-6 pt-5 pb-4">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Mahasiswa</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen Pembimbing</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Progres Bimbingan</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Kontak</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {isStudentsLoading ? (
                [1, 2, 3, 4, 5].map((n) => (
                  <tr key={n} className="border-b border-neutral-border animate-pulse">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-bg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <div className="h-3.5 bg-neutral-bg rounded w-3/4" />
                          <div className="h-2.5 bg-neutral-bg rounded w-1/2" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-28" /></td>
                    <td className="py-3.5 px-4"><div className="h-8 bg-neutral-bg rounded w-40" /></td>
                    <td className="py-3.5 px-4"><div className="h-1.5 bg-neutral-bg rounded w-24" /></td>
                    <td className="py-3.5 px-4"><div className="space-y-1.5"><div className="h-3 bg-neutral-bg rounded w-32" /><div className="h-3 bg-neutral-bg rounded w-24" /></div></td>
                    <td className="py-3.5 px-4"><div className="h-6 bg-neutral-bg rounded w-16" /></td>
                  </tr>
                ))
              ) : studentsError ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-danger text-[13.5px] font-bold mb-2">Gagal mengambil data mahasiswa.</p>
                    <button
                      type="button"
                      onClick={() => refetchStudents()}
                      className="bg-danger text-white border-none text-[12px] font-bold py-1.5 px-4 rounded-2 cursor-pointer hover:bg-danger-dark"
                    >
                      Coba Lagi
                    </button>
                  </td>
                </tr>
              ) : filteredMahasiswa.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[13.5px] text-neutral-muted font-medium">
                    {search ? "Tidak ditemukan mahasiswa yang cocok dengan kata kunci." : "Tidak ada data mahasiswa yang cocok dengan kriteria filter Anda."}
                  </td>
                </tr>
              ) : (
                filteredMahasiswa.map((m) => {
                  const percent = Math.round(m.progressPercentage || 0);
                  const avatarColor = getAvatarColor(m.name);
                  return (
                    <tr
                      key={m.id}
                      className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150"
                    >
                      {/* Mahasiswa Info */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}
                          >
                            {m.name ? m.name.charAt(0) : "?"}
                          </div>
                          <div>
                            <div className="text-[13.5px] font-bold text-neutral-text">{m.name || "-"}</div>
                            <div className="text-[11.5px] text-neutral-muted">NIM {m.nim || "-"}</div>
                          </div>
                        </div>
                      </td>

                      {/* Prodi */}
                      <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">
                        {m.studyProgram || "-"}
                      </td>

                      {/* Dosen Pembimbing */}
                      <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">
                        <div className="flex flex-col gap-1.5 max-w-48">
                          {m.advisorName ? (
                            <span className="font-bold text-neutral-text truncate">{m.advisorName}</span>
                          ) : (
                            <>
                              <span className="text-neutral-muted truncate italic">Belum ditentukan</span>
                              <select
                                onChange={(e) => handleAssignAdvisor(m.id, e.target.value)}
                                defaultValue=""
                                disabled={assignAdvisor.isPending}
                                className="bg-neutral-bg border border-neutral-border rounded p-1 text-[11px] text-neutral-text outline-none focus:border-brand cursor-pointer max-w-full disabled:opacity-50"
                              >
                                <option value="" disabled>Pilih Pembimbing...</option>
                                {lecturers.map((l) => (
                                  <option key={l.id} value={l.id}>
                                    {l.name} ({l.activeAdviseeCount} mhs)
                                  </option>
                                ))}
                              </select>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Progres Bimbingan */}
                      <td className="py-3.5 px-4 min-w-45">
                        <div className="flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 rounded-full bg-neutral-bg overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-[11.5px] font-bold text-brand shrink-0">
                            {percent}%
                          </span>
                        </div>
                      </td>

                      {/* Kontak */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-0.5 text-[12.5px]">
                          <span className="text-neutral-text font-medium">{m.email || "-"}</span>
                          <span className="text-neutral-muted">{m.phoneNumber || "-"}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <select
                          value={m.status}
                          disabled={updateStatus.isPending}
                          onChange={(e) => handleUpdateStatus(m.id, e.target.value as "active" | "nonactive" | "ended")}
                          className={`inline-flex items-center text-[12px] font-bold py-1 px-2.5 rounded-full border-none outline-none cursor-pointer disabled:opacity-50 ${
                            m.status === "active"
                              ? "bg-success-bg text-success"
                              : m.status === "ended"
                              ? "bg-brand-bg text-brand"
                              : "bg-neutral-bg text-neutral-muted"
                          }`}
                        >
                          <option value="active">Aktif</option>
                          <option value="nonactive">Nonaktif</option>
                          <option value="ended">Selesai</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
