"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  manajemen: "Manajemen Dosen",
  referensi: "Referensi",
  profil: "Profil & Akun",
};

export default function AdminPage() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="dashboard-layout">
      <Sidebar
        role="admin"
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <div className="dash-main">
        <Topbar
          title={VIEW_TITLES[activeView] ?? "Dashboard"}
          avatarInitial="F"
        />
        <div className="content-area">
          {activeView === "dashboard" && (
            <AdminDashboardView onNavigate={setActiveView} />
          )}
          {activeView === "manajemen" && <AdminManajemenView />}
          {activeView === "referensi" && <AdminReferensiView />}
          {activeView === "profil" && <AdminProfilView />}
        </div>
      </div>
    </div>
  );
}

/* ═══ Dashboard ═══ */
function AdminDashboardView({
  onNavigate,
}: {
  onNavigate: (v: string) => void;
}) {
  return (
    <>
      <div className="page-header">
        <h1>Dashboard Admin</h1>
        <p>Ringkasan dosen, bimbingan, dan progres mahasiswa.</p>
      </div>

      <div className="stat-row stat-row-4">
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="#2B3BAF"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          bg="blue"
          value="18"
          label="Total Dosen"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path
                d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="#16A34A"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          bg="green"
          value="124"
          label="Total Mahasiswa"
          delta="↑ 12 mahasiswa baru"
          deltaUp
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#B45309"
                strokeWidth="1.7"
              />
              <path
                d="M12 7v5l3.5 2"
                stroke="#B45309"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          bg="amber"
          value="23"
          label="Bimbingan Berjalan"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path
                d="M22 10 12 5 2 10l10 5 10-5Z"
                stroke="#7C3AED"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"
                stroke="#7C3AED"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          bg="purple"
          value="41"
          label="Skripsi Selesai"
          delta="↑ 8 dari semester lalu"
          deltaUp
        />
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Dosen & Bimbingan</span>
            <button
              className="panel-action"
              onClick={() => onNavigate("manajemen")}
            >
              Kelola →
            </button>
          </div>
          <div className="panel-body" style={{ padding: "10px 18px" }}>
            <AssignRow
              initial="R"
              name="Dr. Rizal Fauzi, M.Kom"
              meta="Sistem Informasi"
              count="12 mhs"
              progress={67}
              fillClass="green"
            />
            <AssignRow
              initial="N"
              name="Dr. Nurul Hikmah, M.T"
              meta="Teknik Informatika"
              count="9 mhs"
              progress={44}
              fillClass="amber"
              bgGradient="linear-gradient(135deg,#7C3AED,#A855F7)"
            />
            <AssignRow
              initial="H"
              name="Hasan, M.Cs"
              meta="Sistem Informasi"
              count="14 mhs"
              progress={52}
              bgGradient="linear-gradient(135deg,#059669,#10B981)"
            />
            <AssignRow
              initial="A"
              name="Anisah Putri, M.Kom"
              meta="Sistem Informasi"
              count="7 mhs"
              progress={80}
              fillClass="green"
              bgGradient="linear-gradient(135deg,#B45309,#F2B33D)"
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Log Aktivitas Sistem</span>
          </div>
          <div className="panel-body" style={{ padding: "14px 18px" }}>
            <div className="activity-list">
              <ActivityItem
                dotColor="green"
                text={
                  <>
                    Dosen <strong>Hasan, M.Cs</strong> berhasil didaftarkan
                  </>
                }
                time="1 jam lalu"
              />
              <ActivityItem
                text={
                  <>
                    Pencocokan <strong>5 mahasiswa baru</strong> ke dosen
                    pembimbing
                  </>
                }
                time="3 jam lalu"
              />
              <ActivityItem
                dotColor="amber"
                text={
                  <>
                    Referensi{" "}
                    <strong>&quot;Panduan Penulisan Skripsi 2025&quot;</strong>{" "}
                    diunggah
                  </>
                }
                time="Kemarin, 14.30"
              />
              <ActivityItem
                dotColor="green"
                text={
                  <>
                    Mahasiswa <strong>Ahmad Fauzi</strong> menyelesaikan Tahap
                    11
                  </>
                }
                time="Kemarin, 09.15"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══ Manajemen Dosen ═══ */
function AdminManajemenView() {
  const [activeTab, setActiveTab] = useState("dosen");

  return (
    <>
      <div className="page-header">
        <h1>Manajemen Dosen</h1>
        <p>Daftarkan dosen dan kelola pencocokan mahasiswa bimbingan.</p>
      </div>

      <div className="sub-tabs">
        <button
          className={`sub-tab ${activeTab === "dosen" ? "active" : ""}`}
          onClick={() => setActiveTab("dosen")}
        >
          Daftar Dosen
        </button>
        <button
          className={`sub-tab ${activeTab === "assign" ? "active" : ""}`}
          onClick={() => setActiveTab("assign")}
        >
          Pencocokan Mahasiswa
        </button>
        <button
          className={`sub-tab ${activeTab === "daftar" ? "active" : ""}`}
          onClick={() => setActiveTab("daftar")}
        >
          Daftarkan Dosen
        </button>
      </div>

      {activeTab === "dosen" && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Semua Dosen</span>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setActiveTab("daftar")}
            >
              + Daftarkan Dosen
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Dosen</th>
                  <th>Email</th>
                  <th>Prodi</th>
                  <th>Jml Bimbingan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <DosenRow
                  initial="R"
                  name="Dr. Rizal Fauzi, M.Kom"
                  sub="NIDN 0012345678"
                  email="rizal@uin-mataram.ac.id"
                  prodi="Sistem Informasi"
                  count="12"
                />
                <DosenRow
                  initial="N"
                  name="Dr. Nurul Hikmah, M.T"
                  sub="NIDN 0098765432"
                  email="nurul@uin-mataram.ac.id"
                  prodi="Teknik Informatika"
                  count="9"
                  bgGradient="linear-gradient(135deg,#7C3AED,#A855F7)"
                />
                <DosenRow
                  initial="H"
                  name="Hasan, M.Cs"
                  sub="NIDN 0011223344"
                  email="hasan@uin-mataram.ac.id"
                  prodi="Sistem Informasi"
                  count="14"
                  bgGradient="linear-gradient(135deg,#059669,#10B981)"
                />
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "assign" && (
        <>
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">
                Cocokkan Mahasiswa ke Dosen Pembimbing
              </span>
            </div>
            <div className="panel-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Pilih Mahasiswa <span className="req">*</span>
                  </label>
                  <select className="form-select">
                    <option value="">— Pilih Mahasiswa —</option>
                    <option>Dewi Lestari (210101067)</option>
                    <option>Irfan Maulana (210101089)</option>
                    <option>Lina Safitri (210101072)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Pilih Dosen Pembimbing <span className="req">*</span>
                  </label>
                  <select className="form-select">
                    <option value="">— Pilih Dosen —</option>
                    <option>Dr. Rizal Fauzi, M.Kom (12 bimbingan)</option>
                    <option>Dr. Nurul Hikmah, M.T (9 bimbingan)</option>
                    <option>Hasan, M.Cs (14 bimbingan)</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-ghost">Reset</button>
                <button className="btn btn-primary">Simpan Pencocokan</button>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Pencocokan Terbaru</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mahasiswa</th>
                    <th>Dosen Pembimbing</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="cell-name">Rina Wulandari</div>
                      <div className="cell-sub">210101058</div>
                    </td>
                    <td>Dr. Rizal Fauzi, M.Kom</td>
                    <td
                      style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                    >
                      24 Jun 2026
                    </td>
                    <td>
                      <span className="pill pill-green">
                        <span className="pill-dot" />
                        Aktif
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cell-name">Dewi Lestari</div>
                      <div className="cell-sub">210101067</div>
                    </td>
                    <td>Hasan, M.Cs</td>
                    <td
                      style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                    >
                      20 Jun 2026
                    </td>
                    <td>
                      <span className="pill pill-green">
                        <span className="pill-dot" />
                        Aktif
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "daftar" && (
        <div className="panel" style={{ maxWidth: 560 }}>
          <div className="panel-header">
            <span className="panel-title">Daftarkan Dosen Baru</span>
          </div>
          <div className="panel-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Nama Lengkap <span className="req">*</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Dr. Nama Lengkap, M.Kom"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  NIDN <span className="req">*</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="0011223344"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                Email <span className="req">*</span>
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="nama@uin-mataram.ac.id"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Program Studi <span className="req">*</span>
              </label>
              <select className="form-select">
                <option>Sistem Informasi</option>
                <option>Teknik Informatika</option>
              </select>
            </div>
            <div className="info-box">
              🔒 Password default akan dikirim ke email:{" "}
              <strong>12345678</strong>
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost">Batal</button>
              <button className="btn btn-primary">Daftarkan Dosen</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══ Referensi ═══ */
function AdminReferensiView() {
  return (
    <>
      <div className="page-header">
        <h1>Referensi</h1>
        <p>Kelola dokumen referensi untuk mahasiswa bimbingan.</p>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Unggah Referensi Baru</span>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="form-label">
                Judul Referensi <span className="req">*</span>
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Contoh: Panduan Penulisan Skripsi 2026"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Deskripsi Singkat <span className="req">*</span>
              </label>
              <textarea
                className="form-textarea"
                placeholder="Deskripsikan isi dokumen secara singkat..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Dokumen <span className="req">*</span>
              </label>
              <div className="dropzone">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  width="28"
                  height="28"
                  style={{ margin: "0 auto 8px", display: "block" }}
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                    stroke="#9CA3AF"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Pilih file atau drag &amp; drop di sini
                <br />
                <span style={{ fontSize: 12 }}>PDF, DOCX, maksimal 10MB</span>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost">Batal</button>
              <button className="btn btn-primary">Upload Referensi</button>
            </div>
          </div>
        </div>

        <div>
          <div
            className="panel-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 15,
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            Referensi Tersedia
          </div>
          <RefCard
            title="Panduan Penulisan Skripsi UIN Mataram 2025"
            desc="Pedoman resmi penulisan tugas akhir mencakup format, sistematika, dan tata cara pengutipan sesuai standar institusi."
            file="panduan-skripsi-2025.pdf · 2.4 MB"
          />
          <RefCard
            title="Template Proposal Penelitian"
            desc="File template proposal dalam format DOCX dengan margin dan heading styles sesuai panduan institusi."
            file="template-proposal.docx · 540 KB"
          />
          <RefCard
            title="Contoh Skripsi Terbaik 2024"
            desc="Kumpulan 3 skripsi terbaik tahun akademik 2023/2024 sebagai referensi standar penulisan dan penelitian."
            file="contoh-skripsi-2024.zip · 8.1 MB"
          />
        </div>
      </div>
    </>
  );
}

/* ═══ Profil ═══ */
function AdminProfilView() {
  return (
    <>
      <div className="page-header">
        <h1>Profil & Akun</h1>
        <p>Kelola informasi akun Anda.</p>
      </div>
      <div className="grid-equal">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Data Diri</span>
          </div>
          <div className="panel-body">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#2B3BAF,#4A5CDB)",
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                F
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
                  Fatimah, S.Kom
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Admin Sistem
                </div>
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ marginTop: 8 }}
                >
                  Ganti Foto
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input
                className="form-input"
                type="text"
                defaultValue="Fatimah, S.Kom"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                defaultValue="fatimah@uin-mataram.ac.id"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">Simpan Perubahan</button>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Ubah Password</span>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="form-label">Password Lama</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password Baru</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Konfirmasi Password Baru</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary">Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══ Sub-components ═══ */
function StatCard({
  icon,
  bg,
  value,
  label,
  delta,
  deltaUp,
}: {
  icon: React.ReactNode;
  bg: string;
  value: string;
  label: string;
  delta?: string;
  deltaUp?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className={`stat-card-icon ${bg}`}>{icon}</div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {delta && (
          <div
            className={`stat-card-delta ${deltaUp ? "delta-up" : "delta-down"}`}
          >
            {delta}
          </div>
        )}
      </div>
    </div>
  );
}

function AssignRow({
  initial,
  name,
  meta,
  count,
  progress,
  fillClass,
  bgGradient,
}: {
  initial: string;
  name: string;
  meta: string;
  count: string;
  progress: number;
  fillClass?: string;
  bgGradient?: string;
}) {
  return (
    <div className="assign-row">
      <div
        className="assign-avatar"
        style={bgGradient ? { background: bgGradient } : undefined}
      >
        {initial}
      </div>
      <div className="assign-info">
        <div className="assign-name">{name}</div>
        <div className="assign-meta">{meta}</div>
      </div>
      <div>
        <div className="assign-count">{count}</div>
        <div style={{ marginTop: 6 }}>
          <div className="prog-wrap">
            <div className="prog-track">
              <div
                className={`prog-fill ${fillClass ?? ""}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className="prog-text"
              style={{ fontSize: 11, color: "var(--text-muted)" }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  dotColor,
  text,
  time,
}: {
  dotColor?: string;
  text: React.ReactNode;
  time: string;
}) {
  return (
    <div className="activity-item">
      <div className="activity-dot-wrap">
        <div className={`activity-dot ${dotColor ?? ""}`} />
      </div>
      <div>
        <div className="activity-text">{text}</div>
        <div className="activity-time">{time}</div>
      </div>
    </div>
  );
}

function DosenRow({
  initial,
  name,
  sub,
  email,
  prodi,
  count,
  bgGradient,
}: {
  initial: string;
  name: string;
  sub: string;
  email: string;
  prodi: string;
  count: string;
  bgGradient?: string;
}) {
  return (
    <tr>
      <td>
        <div className="avatar-cell">
          <div
            className="avatar-sm"
            style={bgGradient ? { background: bgGradient } : undefined}
          >
            {initial}
          </div>
          <div>
            <div className="cell-name">{name}</div>
            <div className="cell-sub">{sub}</div>
          </div>
        </div>
      </td>
      <td style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
        {email}
      </td>
      <td>{prodi}</td>
      <td>
        <div className="assign-count" style={{ display: "inline-block" }}>
          {count}
        </div>
      </td>
      <td>
        <span className="pill pill-green">
          <span className="pill-dot" />
          Aktif
        </span>
      </td>
      <td>
        <button className="btn btn-sm btn-outline">Edit</button>
      </td>
    </tr>
  );
}

function RefCard({
  title,
  desc,
  file,
}: {
  title: string;
  desc: string;
  file: string;
}) {
  return (
    <div className="ref-card">
      <div className="ref-title">{title}</div>
      <div className="ref-desc">{desc}</div>
      <div className="ref-footer">
        <div className="ref-file">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
              stroke="#9CA3AF"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6"
              stroke="#9CA3AF"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
          {file}
        </div>
        <button className="btn btn-sm btn-danger">Hapus</button>
      </div>
    </div>
  );
}
