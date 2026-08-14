"use client";

import { useState, useEffect } from "react";
import {
  useAdminStudents,
  useAdminLecturers,
  useAssignAdvisor,
  useUpdateStudentStatus,
  useAdminStudentsSummary,
  useAdminStudentDetail,
  useUpdateStudent,
  useDeleteStudent,
} from "@/hooks/useAdmin";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { StudentItem } from "@/services/admin";

const AVATAR_COLORS = [
  "from-[#818CF8] to-[#6366F1]",
  "from-[#34D399] to-[#059669]",
  "from-[#FB923C] to-[#EA580C]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#60A5FA] to-[#2563EB]",
  "from-[#A78BFA] to-[#7C3AED]",
];

function getAvatarColor(name: string) {
  const sum = (name || "").split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

// ─── Stat Card Icons ───
function PersonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PauseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="4" width="4" height="16" rx="1.5" />
      <rect x="14" y="4" width="4" height="16" rx="1.5" />
    </svg>
  );
}

function GraduationCapIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

// ─── Action Icons ───
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

// ─── Mahasiswa Stat Cards ───
function MahasiswaStatCards() {
  const { data, isLoading } = useAdminStudentsSummary();

  const cards = [
    {
      icon: <PersonIcon className="w-5 h-5 text-[#2563EB]" />,
      watermark: <PersonIcon className="w-20 h-20 text-[#3B82F6]" />,
      value: data?.totalMahasiswa ?? 0,
      label: "Total Mahasiswa",
      subtitle: "Semua mahasiswa terdaftar",
      iconBg: "bg-[#EFF6FF]",
    },
    {
      icon: <CheckIcon className="w-5 h-5 text-[#10B981]" />,
      watermark: <CheckIcon className="w-20 h-20 text-[#10B981]" />,
      value: data?.mahasiswaAktif ?? 0,
      label: "Mahasiswa Aktif",
      subtitle: "Sedang dalam proses bimbingan",
      iconBg: "bg-[#ECFDF5]",
    },
    {
      icon: <PauseIcon className="w-5 h-5 text-[#F97316]" />,
      watermark: <PauseIcon className="w-20 h-20 text-[#F97316]" />,
      value: data?.menungguBimbingan ?? 0,
      label: "Menunggu Bimbingan",
      subtitle: "Menunggu dosen atau input awal",
      iconBg: "bg-[#FFF7ED]",
    },
    {
      icon: <GraduationCapIcon className="w-5 h-5 text-[#8B5CF6]" />,
      watermark: <GraduationCapIcon className="w-20 h-20 text-[#8B5CF6]" />,
      value: data?.selesaiBimbingan ?? 0,
      label: "Selesai Bimbingan",
      subtitle: "Telah menyelesaikan bimbingan",
      iconBg: "bg-[#F5F3FF]",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative bg-white border border-neutral-border rounded-3.5 p-5 overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(43,59,175,0.07)]"
        >
          {/* Subtle watermark background icon on the bottom-right */}
          <div className="absolute -bottom-4 -right-4 opacity-[0.06] pointer-events-none select-none">
            {card.watermark}
          </div>

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`w-11 h-11 rounded-3 ${card.iconBg} flex items-center justify-center shrink-0`}>
              {isLoading ? (
                <div className="w-5 h-5 rounded bg-neutral-200 animate-pulse" />
              ) : (
                card.icon
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {isLoading ? (
                <>
                  <div className="h-7 bg-neutral-bg rounded w-12 mb-1 animate-pulse" />
                  <div className="h-3.5 bg-neutral-bg rounded w-24 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="text-[26px] font-extrabold font-display text-neutral-text leading-tight">
                    {card.value}
                  </div>
                  <div className="text-[13px] font-bold text-neutral-text mt-0.5">
                    {card.label}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Subtitle */}
          {!isLoading && (
            <div className="text-[12px] text-neutral-muted mt-3">
              {card.subtitle}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Status Bimbingan Badge Helper ───
function GuidanceStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Berlangsung":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB]">
          Berlangsung
        </span>
      );
    case "Menunggu":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFF7ED] text-[#EA580C]">
          Menunggu
        </span>
      );
    case "Selesai":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#16A34A]">
          Selesai
        </span>
      );
    case "Terlambat":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF2F2] text-[#DC2626]">
          Terlambat
        </span>
      );
    case "Belum Mulai":
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#475569]">
          Belum Mulai
        </span>
      );
  }
}

// ─── Progress Bar Helper ───
function ProgressBar({ percent, status }: { percent: number; status: string }) {
  let barColor = "bg-[#2563EB]";
  if (status === "Menunggu") barColor = "bg-[#F97316]";
  else if (status === "Selesai") barColor = "bg-[#10B981]";
  else if (status === "Terlambat") barColor = "bg-[#EF4444]";
  else if (status === "Belum Mulai" || percent === 0) barColor = "bg-neutral-300";

  return (
    <div className="flex items-center gap-3 w-32">
      <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[12px] font-bold text-neutral-text shrink-0 w-8 text-right">
        {percent}%
      </span>
    </div>
  );
}

// ─── Detail Mahasiswa Modal ───
function DetailMahasiswaModal({
  studentId,
  onClose,
}: {
  studentId: string;
  onClose: () => void;
}) {
  const { data, isLoading } = useAdminStudentDetail(studentId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const student = data?.student;
  const profile = student?.studentProfile;
  const progress = data?.progress;
  const stages = data?.stages || [];
  const notes = profile?.notes || [];

  const currentStageOrder = progress?.currentStageOrder || 0;
  const avatarColor = student ? getAvatarColor(student.name) : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        className="relative bg-white rounded-3.5 shadow-2xl w-full max-w-[620px] max-h-[90vh] overflow-y-auto"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-border">
          <div>
            <h3 className="font-display text-[17px] font-extrabold text-neutral-text">
              Detail Mahasiswa
            </h3>
            <p className="text-[12.5px] text-neutral-muted mt-0.5">
              Informasi lengkap dan riwayat progres bimbingan tugas akhir.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-muted hover:bg-neutral-bg hover:text-neutral-text transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-14 h-14 rounded-full bg-neutral-200" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-neutral-200 rounded w-1/2" />
                <div className="h-3 bg-neutral-200 rounded w-1/3" />
              </div>
            </div>
            <div className="h-24 bg-neutral-100 rounded-3 animate-pulse" />
          </div>
        ) : !student ? (
          <div className="p-8 text-center text-neutral-muted text-sm">
            Mahasiswa tidak ditemukan.
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Profile Card */}
            <div className="flex items-center gap-4 bg-[#F8FAFC] border border-neutral-border p-4 rounded-3">
              <div
                className={`w-14 h-14 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-[18px] font-extrabold text-white shrink-0 shadow-sm`}
              >
                {student.name ? student.name.charAt(0) : "?"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display font-extrabold text-[16px] text-neutral-text truncate">
                    {student.name}
                  </h4>
                  <span
                    className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      profile?.status === "active"
                        ? "bg-[#ECFDF5] text-[#16A34A]"
                        : profile?.status === "ended"
                        ? "bg-[#F5F3FF] text-[#7C3AED]"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    {profile?.status === "active" ? "Aktif" : profile?.status === "ended" ? "Selesai" : "Nonaktif"}
                  </span>
                </div>
                <div className="text-[12.5px] text-neutral-muted mt-0.5">
                  NIM: <span className="font-semibold text-neutral-text">{profile?.nim || "-"}</span> · Prodi:{" "}
                  <span className="font-semibold text-neutral-text">{profile?.studyProgram || "-"}</span>
                </div>
                <div className="text-[12px] text-neutral-muted mt-0.5">
                  Email: {student.email} {student.phoneNumber && `· HP: ${student.phoneNumber}`}
                </div>
              </div>
            </div>

            {/* Dosen Pembimbing & Bimbingan Status */}
            <div className="grid grid-cols-2 gap-4 max-[500px]:grid-cols-1">
              <div className="bg-white border border-neutral-border p-4 rounded-3">
                <div className="text-[11.5px] font-bold text-neutral-muted uppercase tracking-wider">
                  Dosen Pembimbing
                </div>
                <div className="font-bold text-[14px] text-neutral-text mt-1.5">
                  {profile?.advisor?.name || (
                    <span className="text-neutral-muted font-normal italic">Belum ditentukan</span>
                  )}
                </div>
                {profile?.advisor?.email && (
                  <div className="text-[12px] text-neutral-muted mt-0.5">
                    {profile.advisor.email}
                  </div>
                )}
              </div>

              <div className="bg-white border border-neutral-border p-4 rounded-3">
                <div className="text-[11.5px] font-bold text-neutral-muted uppercase tracking-wider">
                  Tahap Saat Ini
                </div>
                <div className="font-bold text-[14px] text-neutral-text mt-1.5">
                  Tahap {currentStageOrder}
                </div>
                <div className="text-[12px] text-neutral-muted mt-0.5 truncate">
                  {stages.find((s) => s.order === currentStageOrder)?.name || "Belum Memulai"}
                </div>
              </div>
            </div>

            {/* Stages Checklist */}
            <div>
              <h5 className="font-display font-bold text-[14px] text-neutral-text mb-3">
                Progres 17 Tahapan Bimbingan
              </h5>
              <div className="border border-neutral-border rounded-3 divide-y divide-neutral-border max-h-64 overflow-y-auto">
                {stages.map((st) => {
                  const note = notes.find((n) => n.stageOrder === st.order);
                  const isCompleted = note?.status === "approved" || (progress?.status === "completed");
                  const isCurrent = currentStageOrder === st.order;

                  return (
                    <div
                      key={st.order}
                      className={`flex items-center justify-between p-3 text-[12.5px] ${
                        isCurrent ? "bg-[#EFF6FF]/60" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                            isCompleted
                              ? "bg-[#10B981] text-white"
                              : isCurrent
                              ? "bg-[#2563EB] text-white"
                              : "bg-neutral-100 text-neutral-400"
                          }`}
                        >
                          {isCompleted ? "✓" : st.order}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-semibold truncate ${isCurrent ? "text-[#2563EB]" : "text-neutral-text"}`}>
                            Tahap {st.order}: {st.name}
                          </div>
                          <div className="text-[11px] text-neutral-muted">
                            Durasi: {st.durationDays} hari
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 ml-3">
                        {isCompleted ? (
                          <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                            Selesai
                          </span>
                        ) : isCurrent ? (
                          <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                            Aktif
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-neutral-400">
                            Belum
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <Button type="button" variant="brand" size="sm" onClick={onClose}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Edit Mahasiswa Modal ───
function EditMahasiswaModal({
  student,
  lecturers,
  onClose,
}: {
  student: StudentItem;
  lecturers: Array<{ id: string; name: string }>;
  onClose: () => void;
}) {
  const updateStudent = useUpdateStudent();
  const [form, setForm] = useState({
    name: student.name || "",
    email: student.email || "",
    nim: student.nim || "",
    studyProgram: student.studyProgram || "",
    campus: student.campus || "",
    phoneNumber: student.phoneNumber || "",
    advisorId: student.advisorId || "",
    status: student.status || "active",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Nama mahasiswa wajib diisi.");
      return;
    }
    setError("");

    try {
      await updateStudent.mutateAsync({
        studentId: student.id,
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          nim: form.nim.trim() || null,
          studyProgram: form.studyProgram.trim() || null,
          campus: form.campus.trim() || null,
          phoneNumber: form.phoneNumber.trim() || null,
          advisorId: form.advisorId || null,
          status: form.status as "active" | "nonactive" | "ended",
        },
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Gagal memperbarui data mahasiswa.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        className="relative bg-white rounded-3.5 shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-border">
          <div>
            <h3 className="font-display text-[17px] font-extrabold text-neutral-text">
              Edit Data Mahasiswa
            </h3>
            <p className="text-[12.5px] text-neutral-muted mt-0.5">
              Ubah informasi data profil dan pembimbing mahasiswa.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-muted hover:bg-neutral-bg hover:text-neutral-text transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-danger/8 border border-danger/20 text-danger text-[12.5px] font-semibold px-3.5 py-2.5 rounded-2.5">
              {error}
            </div>
          )}

          <Input
            label="Nama Lengkap"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            variant="bordered"
            required
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            variant="bordered"
            required
          />

          <div className="grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
            <Input
              label="NIM"
              value={form.nim}
              onChange={(e) => setForm({ ...form, nim: e.target.value })}
              variant="bordered"
              placeholder="Contoh: 22537144011"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-bold text-neutral-text">
                Program Studi
              </label>
              <input
                type="text"
                value={form.studyProgram}
                onChange={(e) => setForm({ ...form, studyProgram: e.target.value })}
                placeholder="Contoh: Teknologi Informasi"
                className="w-full bg-white border border-neutral-border rounded-2.5 py-2.5 px-3.5 text-[13.5px] outline-none font-sans focus:border-brand transition-colors text-neutral-text font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
            <Input
              label="No. HP"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              variant="bordered"
              placeholder="0812-3456-7890"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-bold text-neutral-text">
                Status Akun
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full bg-white border border-neutral-border rounded-2.5 py-2.5 px-3.5 text-[13.5px] outline-none font-sans focus:border-brand transition-colors text-neutral-text font-medium cursor-pointer"
              >
                <option value="active">Aktif</option>
                <option value="nonactive">Nonaktif</option>
                <option value="ended">Selesai</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-bold text-neutral-text">
              Dosen Pembimbing
            </label>
            <select
              value={form.advisorId}
              onChange={(e) => setForm({ ...form, advisorId: e.target.value })}
              className="w-full bg-white border border-neutral-border rounded-2.5 py-2.5 px-3.5 text-[13.5px] outline-none font-sans focus:border-brand transition-colors text-neutral-text font-medium cursor-pointer"
            >
              <option value="">Belum Ditentukan</option>
              {lecturers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-border">
            <Button
              type="button"
              variant="outline-neutral"
              size="sm"
              onClick={onClose}
              disabled={updateStudent.isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="brand"
              size="sm"
              isLoading={updateStudent.isPending}
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Mahasiswa Confirmation Modal ───
function DeleteMahasiswaModal({
  student,
  onClose,
}: {
  student: StudentItem;
  onClose: () => void;
}) {
  const deleteStudent = useDeleteStudent();
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDelete = async () => {
    try {
      await deleteStudent.mutateAsync(student.id);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Gagal menghapus mahasiswa.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        className="relative bg-white rounded-3.5 shadow-2xl w-full max-w-[420px] p-6 text-center"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto mb-4">
          <TrashIcon />
        </div>

        <h3 className="font-display font-extrabold text-[17px] text-neutral-text mb-2">
          Hapus Mahasiswa?
        </h3>

        <p className="text-[13px] text-neutral-muted leading-relaxed mb-4">
          Apakah Anda yakin ingin menghapus data mahasiswa{" "}
          <strong className="text-neutral-text">{student.name}</strong> (NIM: {student.nim || "-"})?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        {error && (
          <div className="bg-danger/8 border border-danger/20 text-danger text-[12.5px] font-semibold px-3 py-2 rounded-2.5 mb-4 text-left">
            {error}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline-neutral"
            size="sm"
            onClick={onClose}
            disabled={deleteStudent.isPending}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={deleteStudent.isPending}
          >
            Ya, Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Manajemen Mahasiswa Component ───
export function ManajemenMahasiswaList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [prodiFilter, setProdiFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected student for modals
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<StudentItem | null>(null);

  const {
    data: studentsData,
    isLoading: isStudentsLoading,
    error: studentsError,
    refetch: refetchStudents,
  } = useAdminStudents(debouncedSearch, prodiFilter, statusFilter);

  const { data: lecturersData } = useAdminLecturers();
  const assignAdvisor = useAssignAdvisor();

  const students = studentsData?.students || [];
  const lecturers = lecturersData?.lecturers || [];

  const handleAssignAdvisor = (studentId: string, advisorId: string) => {
    if (!advisorId) return;
    assignAdvisor.mutate({ studentId, advisorId });
  };

  // Collect unique study programs for filter dropdown
  const uniqueProdis = Array.from(
    new Set(students.map((s) => s.studyProgram).filter(Boolean))
  ) as string[];

  // Fallback defaults if list is empty
  const prodiOptions = Array.from(
    new Set(["Teknologi Informasi", "Teknik Informatika", "Sistem Informasi", ...uniqueProdis])
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Top Filter & Search Bar */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-4 flex flex-wrap gap-4 items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Program Studi Filter */}
          <div className="relative">
            <select
              value={prodiFilter}
              onChange={(e) => setProdiFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-neutral-border rounded-2.5 py-2 px-3.5 text-[13px] outline-none font-sans focus:border-brand transition-colors cursor-pointer font-semibold text-neutral-text appearance-none pr-8"
            >
              <option value="All">Semua Program Studi</option>
              {prodiOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-muted">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-neutral-border rounded-2.5 py-2 px-3.5 text-[13px] outline-none font-sans focus:border-brand transition-colors cursor-pointer font-semibold text-neutral-text appearance-none pr-8"
            >
              <option value="All">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="nonactive">Nonaktif</option>
              <option value="ended">Selesai</option>
              <option value="Berlangsung">Berlangsung</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Belum Mulai">Belum Mulai</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-muted">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-72 max-[600px]:max-w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-muted">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari mahasiswa, NIM, prodi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-neutral-border rounded-2.5 py-2 pl-9 pr-4 text-[13px] outline-none font-sans focus:border-brand transition-colors text-neutral-text placeholder-neutral-muted font-semibold"
          />
        </div>
      </div>

      {/* Stat Cards */}
      <MahasiswaStatCards />

      {/* Table Container */}
      <div className="bg-white border border-neutral-border rounded-3.5 shadow-xs overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
            Daftar Mahasiswa
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[920px]">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-[#F8FAFC]/70">
                <th className="py-3.5 px-6 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Mahasiswa
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Prodi
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Dosen Pembimbing
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Tahap Saat Ini
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Status Bimbingan
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Progres Bimbingan
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-neutral-muted uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {isStudentsLoading ? (
                [1, 2, 3, 4].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3.5 bg-neutral-200 rounded w-28" />
                          <div className="h-2.5 bg-neutral-100 rounded w-20" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4"><div className="h-3.5 bg-neutral-200 rounded w-24" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-28" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-20" /></td>
                    <td className="py-4 px-4"><div className="h-6 bg-neutral-200 rounded w-20" /></td>
                    <td className="py-4 px-4"><div className="h-2 bg-neutral-200 rounded w-24" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-12" /></td>
                    <td className="py-4 px-4"><div className="h-7 bg-neutral-200 rounded w-20 mx-auto" /></td>
                  </tr>
                ))
              ) : studentsError ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <p className="text-danger text-[13.5px] font-bold mb-2">
                      Gagal mengambil data mahasiswa.
                    </p>
                    <button
                      type="button"
                      onClick={() => refetchStudents()}
                      className="bg-danger text-white border-none text-[12px] font-bold py-1.5 px-4 rounded-2 cursor-pointer hover:bg-danger-dark"
                    >
                      Coba Lagi
                    </button>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[13.5px] text-neutral-muted font-medium">
                    {search ? "Tidak ditemukan mahasiswa yang cocok dengan pencarian." : "Tidak ada data mahasiswa."}
                  </td>
                </tr>
              ) : (
                students.map((m) => {
                  const avatarColor = getAvatarColor(m.name);
                  const percent = m.progressPercentage ?? 0;

                  return (
                    <tr
                      key={m.id}
                      className="hover:bg-[#F8FAFC]/50 transition-colors duration-150"
                    >
                      {/* 1. MAHASISWA */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0 shadow-xs`}
                          >
                            {m.name ? m.name.charAt(0) : "?"}
                          </div>
                          <div>
                            <div className="text-[13.5px] font-bold text-neutral-text leading-snug">
                              {m.name || "-"}
                            </div>
                            <div className="text-[11.5px] text-neutral-muted mt-0.5">
                              {m.nim ? `NIM ${m.nim}` : "NIM -"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. PRODI */}
                      <td className="py-4 px-4 text-[13px] text-neutral-text font-medium">
                        {m.studyProgram || "-"}
                      </td>

                      {/* 3. DOSEN PEMBIMBING */}
                      <td className="py-4 px-4 text-[13px]">
                        {m.advisorName ? (
                          <span className="font-bold text-neutral-text">
                            {m.advisorName}
                          </span>
                        ) : (
                          <div className="flex flex-col gap-1 max-w-44">
                            <span className="text-neutral-muted text-[11.5px] italic">
                              Belum ditentukan
                            </span>
                            <div className="relative">
                              <select
                                onChange={(e) => handleAssignAdvisor(m.id, e.target.value)}
                                defaultValue=""
                                disabled={assignAdvisor.isPending}
                                className="w-full bg-[#F8FAFC] border border-neutral-border rounded-2 py-1 px-2.5 text-[11.5px] text-neutral-text outline-none focus:border-brand cursor-pointer disabled:opacity-50 appearance-none pr-6"
                              >
                                <option value="" disabled>
                                  Pilih Pembimbing...
                                </option>
                                {lecturers.map((l) => (
                                  <option key={l.id} value={l.id}>
                                    {l.name}
                                  </option>
                                ))}
                              </select>
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-muted">
                                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* 4. TAHAP SAAT INI */}
                      <td className="py-4 px-4">
                        <div className="text-[13px] font-bold text-neutral-text">
                          Tahap {m.currentStageOrder ?? 0}
                        </div>
                        <div className="text-[11.5px] text-neutral-muted mt-0.5 max-w-52 line-clamp-1">
                          {m.currentStageName || "Belum Memulai"}
                        </div>
                      </td>

                      {/* 5. STATUS BIMBINGAN */}
                      <td className="py-4 px-4">
                        <GuidanceStatusBadge status={m.guidanceStatus || "Belum Mulai"} />
                      </td>

                      {/* 6. PROGRES BIMBINGAN */}
                      <td className="py-4 px-4">
                        <ProgressBar percent={percent} status={m.guidanceStatus || "Belum Mulai"} />
                      </td>

                      {/* 7. STATUS */}
                      <td className="py-4 px-4">
                        <span
                          className={`text-[12.5px] font-bold ${
                            m.status === "active"
                              ? "text-[#16A34A]"
                              : m.status === "ended"
                              ? "text-[#7C3AED]"
                              : "text-neutral-muted"
                          }`}
                        >
                          {m.status === "active"
                            ? "Aktif"
                            : m.status === "ended"
                            ? "Selesai"
                            : "Nonaktif"}
                        </span>
                      </td>

                      {/* 8. AKSI */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* View Detail */}
                          <button
                            type="button"
                            onClick={() => setViewingStudentId(m.id)}
                            title="Lihat Detail"
                            className="w-8 h-8 rounded-2 border border-neutral-border text-neutral-muted hover:text-brand hover:border-brand hover:bg-brand-bg transition-colors flex items-center justify-center cursor-pointer"
                          >
                            <EyeIcon />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => setEditingStudent(m)}
                            title="Edit Mahasiswa"
                            className="w-8 h-8 rounded-2 border border-neutral-border text-neutral-muted hover:text-brand hover:border-brand hover:bg-brand-bg transition-colors flex items-center justify-center cursor-pointer"
                          >
                            <PencilIcon />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeletingStudent(m)}
                            title="Hapus Mahasiswa"
                            className="w-8 h-8 rounded-2 border border-neutral-border text-[#EF4444] hover:text-[#DC2626] hover:border-danger hover:bg-danger/8 transition-colors flex items-center justify-center cursor-pointer"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Legend */}
        <div className="px-6 py-4 border-t border-neutral-border bg-white flex items-center gap-5 flex-wrap text-[12px] text-neutral-muted font-medium">
          <span className="font-bold text-neutral-text">Keterangan Status Bimbingan:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
            Berlangsung
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
            Menunggu
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            Selesai
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            Terlambat
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
            Belum Mulai
          </span>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingStudentId && (
        <DetailMahasiswaModal
          studentId={viewingStudentId}
          onClose={() => setViewingStudentId(null)}
        />
      )}

      {/* Edit Modal */}
      {editingStudent && (
        <EditMahasiswaModal
          student={editingStudent}
          lecturers={lecturers}
          onClose={() => setEditingStudent(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingStudent && (
        <DeleteMahasiswaModal
          student={deletingStudent}
          onClose={() => setDeletingStudent(null)}
        />
      )}

      {/* Animation Style */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
