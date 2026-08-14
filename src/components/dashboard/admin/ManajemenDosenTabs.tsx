"use client";

import { useState, useEffect } from "react";
import { useAdminLecturers, useAdminLecturersSummary, useCreateLecturer } from "@/hooks/useAdmin";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "@/components/Button";
import Input from "@/components/Input";

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

function PersonCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function PersonXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="17" y1="8" x2="22" y2="13" />
      <line x1="22" y1="8" x2="17" y2="13" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

// ─── Stat Cards ───
function DosenStatCards() {
  const { data, isLoading } = useAdminLecturersSummary();

  const cards = [
    {
      icon: <PersonIcon />,
      value: data?.totalDosen ?? 0,
      label: "Total Dosen",
      subtitle: "Semua dosen terdaftar",
      iconBg: "bg-[#3B82F6]",
      accentColor: "text-[#3B82F6]",
    },
    {
      icon: <PersonCheckIcon />,
      value: data?.dosenAktif ?? 0,
      label: "Dosen Aktif",
      subtitle: data?.totalDosen
        ? `${((data.dosenAktif / data.totalDosen) * 100).toFixed(1)}% dari total dosen`
        : "0% dari total dosen",
      iconBg: "bg-[#22C55E]",
      accentColor: "text-[#22C55E]",
    },
    {
      icon: <PersonXIcon />,
      value: data?.dosenNonaktif ?? 0,
      label: "Dosen Nonaktif",
      subtitle: data?.totalDosen
        ? `${((data.dosenNonaktif / data.totalDosen) * 100).toFixed(1)}% dari total dosen`
        : "0% dari total dosen",
      iconBg: "bg-[#EF4444]",
      accentColor: "text-[#EF4444]",
    },
    {
      icon: <GraduationIcon />,
      value: data?.totalBimbingan ?? 0,
      label: "Total Bimbingan",
      subtitle: "Keseluruhan bimbingan yang ditangani",
      iconBg: "bg-[#8B5CF6]",
      accentColor: "text-[#8B5CF6]",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
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

// ─── Tambah Dosen Modal ───
function TambahDosenModal({ onClose }: { onClose: () => void }) {
  const createLecturer = useCreateLecturer();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Nama lengkap wajib diisi.";
    if (!form.email.trim()) errs.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Format email tidak valid.";
    if (!form.password) errs.password = "Password wajib diisi.";
    else if (form.password.length < 8)
      errs.password = "Password minimal 8 karakter.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createLecturer.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        ...(form.phoneNumber.trim() && { phoneNumber: form.phoneNumber.trim() }),
        ...(form.department.trim() && { department: form.department.trim() }),
      });
      onClose();
    } catch (err: any) {
      setErrors({ _general: err?.message || "Gagal membuat akun dosen." });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3.5 shadow-xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-border">
          <div>
            <h3 className="font-display text-[17px] font-extrabold text-neutral-text">
              Tambah Dosen Baru
            </h3>
            <p className="text-[12.5px] text-neutral-muted mt-0.5">
              Buat akun dosen baru untuk sistem bimbingan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-muted hover:bg-neutral-bg hover:text-neutral-text transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {errors._general && (
            <div className="bg-danger/8 border border-danger/20 text-danger text-[12.5px] font-semibold px-3.5 py-2.5 rounded-2.5">
              {errors._general}
            </div>
          )}

          <Input
            label="Nama Lengkap"
            placeholder="Contoh: Dr. Budi Santoso, M.Kom"
            value={form.name}
            onChange={handleChange("name")}
            error={errors.name}
            variant="bordered"
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="contoh@email.com"
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
            variant="bordered"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={form.password}
            onChange={handleChange("password")}
            error={errors.password}
            variant="bordered"
            required
          />

          <Input
            label="No. HP"
            type="tel"
            placeholder="0812-3456-7890"
            value={form.phoneNumber}
            onChange={handleChange("phoneNumber")}
            error={errors.phoneNumber}
            variant="bordered"
          />

          <Input
            label="Program Studi / Departemen"
            placeholder="Contoh: Teknik Informatika"
            value={form.department}
            onChange={handleChange("department")}
            error={errors.department}
            variant="bordered"
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline-neutral"
              size="sm"
              onClick={onClose}
              disabled={createLecturer.isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="brand"
              size="sm"
              isLoading={createLecturer.isPending}
            >
              Simpan Dosen
            </Button>
          </div>
        </form>
      </div>

      {/* Modal animation keyframe */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function ManajemenDosenTabs() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end -mt-12 mb-4 max-[600px]:mt-0 max-[600px]:mb-4">
        <Button
          variant="brand"
          size="sm"
          onClick={() => setShowModal(true)}
          leftIcon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          }
        >
          Tambah Dosen
        </Button>
      </div>
      <DosenStatCards />
      <DaftarDosenTab />
      {showModal && <TambahDosenModal onClose={() => setShowModal(false)} />}
    </>
  );
}

// ─── Tab 1: Daftar Dosen ───
function DaftarDosenTab() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error, refetch } = useAdminLecturers(debouncedSearch);
  const lecturers = data?.lecturers || [];

  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4 gap-4 flex-wrap max-[600px]:flex-col max-[600px]:items-stretch">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Dosen</h3>

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
            placeholder="Cari dosen, email, prodi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-bg border border-neutral-border rounded-2.5 py-2 pl-9 pr-4 text-[13px] outline-none font-sans focus:border-brand-light transition-[border-color] duration-200 text-neutral-text placeholder-neutral-muted font-semibold"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
              <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">No. HP</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Jml Bimbingan</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map((n) => (
                <tr key={n} className="border-b border-neutral-border animate-pulse">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-bg shrink-0" />
                      <div className="h-4 bg-neutral-bg rounded w-32" />
                    </div>
                  </td>
                  <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-40" /></td>
                  <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-28" /></td>
                  <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-24" /></td>
                  <td className="py-3.5 px-4 text-center"><div className="h-4 bg-neutral-bg rounded w-6 mx-auto" /></td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-danger text-[13.5px] font-bold mb-2">Gagal mengambil data dosen.</p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="bg-danger text-white border-none text-[12px] font-bold py-1.5 px-4 rounded-2 cursor-pointer hover:bg-danger-dark"
                  >
                    Coba Lagi
                  </button>
                </td>
              </tr>
            ) : lecturers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[13.5px] text-neutral-muted font-medium">
                  {search ? "Tidak ditemukan dosen yang cocok dengan kata kunci." : "Belum ada data dosen terdaftar."}
                </td>
              </tr>
            ) : (
              lecturers.map((lecturer) => {
                const avatarColor = getAvatarColor(lecturer.name);
                return (
                  <tr key={lecturer.id} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                          {lecturer.name ? lecturer.name.charAt(0) : "?"}
                        </div>
                        <div>
                          <div className="text-[13.5px] font-bold text-neutral-text">{lecturer.name || "-"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{lecturer.email || "-"}</td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{lecturer.phoneNumber || "-"}</td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">{lecturer.department || "-"}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[13px] font-bold text-brand">{lecturer.activeAdviseeCount}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
