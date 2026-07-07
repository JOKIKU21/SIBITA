"use client";

// ponytail: 3-tab component for manajemen dosen — single client boundary
import { useState } from "react";
import {
  DOSEN_LIST,
  MAHASISWA_BELUM_BIMBING,
  PENCOCOKAN_TERBARU,
  type PencocokanItem,
} from "@/lib/admin-data";

type Tab = "daftar" | "pencocokan" | "daftarkan";

export function ManajemenDosenTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("daftar");

  const tabs: { key: Tab; label: string }[] = [
    { key: "daftar", label: "Daftar Dosen" },
    { key: "pencocokan", label: "Pencocokan Mahasiswa" },
    { key: "daftarkan", label: "Daftarkan Dosen" },
  ];

  return (
    <>
      {/* Tab buttons */}
      <div className="flex gap-0 mb-6 border-b border-neutral-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`py-2.5 px-5 text-[13.5px] font-bold border-b-2 bg-transparent cursor-pointer transition-colors duration-150 ${
              activeTab === tab.key
                ? "border-brand text-brand"
                : "border-transparent text-neutral-muted hover:text-neutral-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "daftar" ? <DaftarDosenTab /> : null}
      {activeTab === "pencocokan" ? <PencocokanTab /> : null}
      {activeTab === "daftarkan" ? <DaftarkanDosenTab /> : null}
    </>
  );
}

// ─── Tab 1: Daftar Dosen ───
function DaftarDosenTab() {
  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Dosen</h3>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 bg-brand text-white text-[12.5px] font-bold py-2 px-4 rounded-2 border-none cursor-pointer hover:bg-brand-dark transition-colors duration-200"
          onClick={() => alert("Fitur tambah dosen")}
        >
          + Daftarkan Dosen
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
              <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Jml Bimbingan</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DOSEN_LIST.map((d) => (
              <tr key={d.nip} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-linear-to-br ${d.avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                      {d.nama.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-bold text-neutral-text">{d.nama}</div>
                      <div className="text-[11.5px] text-neutral-muted">NIP {d.nip}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{d.email}</td>
                <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">{d.prodi}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="text-[13px] font-bold text-brand">{d.totalBimbingan}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 text-[12px] font-bold ${d.status === "aktif" ? "text-success" : "text-neutral-muted"}`}>
                    <span className={`w-2 h-2 rounded-full ${d.status === "aktif" ? "bg-success" : "bg-neutral-light"}`} />
                    {d.status === "aktif" ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <button
                    type="button"
                    className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-1.5 px-3.5 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                    onClick={() => alert(`Edit dosen: ${d.nama}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab 2: Pencocokan Mahasiswa ───
function PencocokanTab() {
  const [selectedMhs, setSelectedMhs] = useState("");
  const [selectedDosen, setSelectedDosen] = useState("");
  const [matches, setMatches] = useState<PencocokanItem[]>(PENCOCOKAN_TERBARU);
  const [saved, setSaved] = useState(false);

  function handleSimpan() {
    if (!selectedMhs || !selectedDosen) {
      alert("Pilih mahasiswa dan dosen terlebih dahulu.");
      return;
    }
    const mhs = MAHASISWA_BELUM_BIMBING.find((m) => m.nim === selectedMhs);
    const dosen = DOSEN_LIST.find((d) => d.nip === selectedDosen);
    if (!mhs || !dosen) return;

    const newMatch: PencocokanItem = {
      mahasiswaNama: mhs.nama,
      mahasiswaNim: mhs.nim,
      dosenNama: dosen.nama,
      tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      status: "aktif",
    };
    setMatches([newMatch, ...matches]);
    setSelectedMhs("");
    setSelectedDosen("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    setSelectedMhs("");
    setSelectedDosen("");
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Form */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-6">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text mb-5">Cocokkan Mahasiswa ke Dosen Pembimbing</h3>
        <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              Pilih Mahasiswa <span className="text-danger">*</span>
            </label>
            <select
              value={selectedMhs}
              onChange={(e) => setSelectedMhs(e.target.value)}
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer"
            >
              <option value="">— Pilih Mahasiswa —</option>
              {MAHASISWA_BELUM_BIMBING.map((m) => (
                <option key={m.nim} value={m.nim}>
                  {m.nama} — {m.prodi}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              Pilih Dosen Pembimbing <span className="text-danger">*</span>
            </label>
            <select
              value={selectedDosen}
              onChange={(e) => setSelectedDosen(e.target.value)}
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer"
            >
              <option value="">— Pilih Dosen —</option>
              {DOSEN_LIST.filter((d) => d.status === "aktif").map((d) => (
                <option key={d.nip} value={d.nip}>
                  {d.nama} — {d.prodi}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-5">
          {saved ? <span className="text-[12px] text-success font-semibold animate-pulse">Berhasil disimpan ✓</span> : null}
          <button
            type="button"
            onClick={handleReset}
            className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSimpan}
            className="bg-brand text-white border-none text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-brand-dark transition-colors duration-200"
          >
            Simpan Pencocokan
          </button>
        </div>
      </div>

      {/* Recent matches */}
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
        <div className="px-6 pt-5 pb-3">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Pencocokan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen Pembimbing</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Tanggal</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((p, i) => (
                <tr key={`${p.mahasiswaNim}-${i}`} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                  <td className="py-3.5 px-6">
                    <div className="text-[13.5px] font-bold text-neutral-text">{p.mahasiswaNama}</div>
                    <div className="text-[11.5px] text-neutral-muted">{p.mahasiswaNim}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">{p.dosenNama}</td>
                  <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{p.tanggal}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[12px] font-bold text-success">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
              {matches.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[13px] text-neutral-muted">Belum ada pencocokan.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Daftarkan Dosen ───
function DaftarkanDosenTab() {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [prodi, setProdi] = useState("Sistem Informasi");

  function handleSubmit() {
    if (!nama || !nip || !email) {
      alert("Lengkapi semua field yang wajib diisi.");
      return;
    }
    alert(`Dosen "${nama}" berhasil didaftarkan!\nPassword default akan dikirim ke email: ${email}`);
    setNama("");
    setNip("");
    setEmail("");
    setProdi("Sistem Informasi");
  }

  function handleBatal() {
    setNama("");
    setNip("");
    setEmail("");
    setProdi("Sistem Informasi");
  }

  return (
    <div className="bg-white border border-neutral-border rounded-3.5 p-6 max-w-xl">
      <h3 className="font-display text-[15px] font-extrabold text-neutral-text mb-5">Daftarkan Dosen Baru</h3>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              Nama Lengkap <span className="text-danger">*</span>
            </label>
            <input
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
              type="text"
              placeholder="Dr. Nama Lengkap, M.Kom"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              NIP <span className="text-danger">*</span>
            </label>
            <input
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
              type="text"
              placeholder="0011223344"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-neutral-muted">
            Email <span className="text-danger">*</span>
          </label>
          <input
            className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
            type="email"
            placeholder="nama@uin-mataram.ac.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-neutral-muted">
            Program Studi <span className="text-danger">*</span>
          </label>
          <select
            value={prodi}
            onChange={(e) => setProdi(e.target.value)}
            className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer"
          >
            <option>Sistem Informasi</option>
            <option>Teknik Informatika</option>
          </select>
        </div>

        {/* Password info */}
        <div className="flex items-center gap-2 bg-warning-bg/50 text-warning text-[12.5px] font-medium py-2.5 px-3.5 rounded-2">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Password default akan dikirim ke email: <span className="font-bold">12345678</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={handleBatal}
          className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-brand text-white border-none text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-brand-dark transition-colors duration-200"
        >
          Daftarkan Dosen
        </button>
      </div>
    </div>
  );
}
