"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  manajemen: "Manajemen Pengguna",
  profil: "Profil & Akun",
};

export default function SuperAdminPage() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="dashboard-layout">
      <Sidebar
        role="superadmin"
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <div className="dash-main">
        <Topbar
          title={VIEW_TITLES[activeView] ?? "Dashboard"}
          avatarInitial="SA"
        />
        <div className="content-area">
          {activeView === "dashboard" && (
            <SADashboardView onNavigate={setActiveView} />
          )}
          {activeView === "manajemen" && <SAManajemenView />}
          {activeView === "profil" && <SAProfilView />}
        </div>
      </div>
    </div>
  );
}

/* ═══ Dashboard ═══ */
function SADashboardView({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <>
      <div className="page-header">
        <h1>Dashboard Super Admin</h1>
        <p>Ringkasan keseluruhan sistem SIBITA.</p>
      </div>

      {/* Hero stat cards */}
      <div className="stat-row stat-row-2" style={{ marginBottom: 16 }}>
        <div
          className="stat-card"
          style={{
            background: "linear-gradient(135deg,#2B3BAF,#4A5CDB)",
            border: "none",
          }}
        >
          <div
            className="stat-card-icon"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="stat-card-body">
            <div
              className="stat-card-value"
              style={{ color: "#fff", fontSize: 32 }}
            >
              18
            </div>
            <div
              className="stat-card-label"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Total Dosen Terdaftar
            </div>
            <div
              className="stat-card-delta"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              ↑ 3 dosen baru bulan ini
            </div>
          </div>
        </div>
        <div
          className="stat-card"
          style={{
            background: "linear-gradient(135deg,#1A2580,#2B3BAF)",
            border: "none",
          }}
        >
          <div
            className="stat-card-icon"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path
                d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="stat-card-body">
            <div
              className="stat-card-value"
              style={{ color: "#fff", fontSize: 32 }}
            >
              124
            </div>
            <div
              className="stat-card-label"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Total Mahasiswa Terdaftar
            </div>
            <div
              className="stat-card-delta"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              ↑ 12 mahasiswa baru
            </div>
          </div>
        </div>
      </div>

      <div className="stat-row stat-row-4">
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                stroke="#16A34A"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M22 4 12 14.01l-3-3"
                stroke="#16A34A"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          bg="green"
          value="41"
          label="Skripsi Selesai"
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
          value="83"
          label="Bimbingan Aktif"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="#2B3BAF"
                strokeWidth="1.7"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="#2B3BAF"
                strokeWidth="1.7"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="#2B3BAF"
                strokeWidth="1.7"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="#2B3BAF"
                strokeWidth="1.7"
              />
            </svg>
          }
          bg="blue"
          value="3"
          label="Admin Aktif"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#B91C1C"
                strokeWidth="1.7"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="#B91C1C"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          }
          bg="red"
          value="7"
          label="Tidak Aktif / Bermasalah"
        />
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Ringkasan Per Admin</span>
            <button
              className="panel-action"
              onClick={() => onNavigate("manajemen")}
            >
              Kelola →
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="avatar-cell">
                      <div className="avatar-sm">F</div>
                      <div>
                        <div className="cell-name">Fatimah, S.Kom</div>
                        <div className="cell-sub">Admin Utama</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    fatimah@uin-mataram.ac.id
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
                <tr>
                  <td>
                    <div className="avatar-cell">
                      <div
                        className="avatar-sm"
                        style={{
                          background: "linear-gradient(135deg,#7C3AED,#A855F7)",
                        }}
                      >
                        Y
                      </div>
                      <div>
                        <div className="cell-name">Yusuf, A.Md</div>
                        <div className="cell-sub">Admin</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    yusuf@uin-mataram.ac.id
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
                <tr>
                  <td>
                    <div className="avatar-cell">
                      <div
                        className="avatar-sm"
                        style={{
                          background: "linear-gradient(135deg,#059669,#10B981)",
                        }}
                      >
                        M
                      </div>
                      <div>
                        <div className="cell-name">Mira Susanti</div>
                        <div className="cell-sub">Admin</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    mira@uin-mataram.ac.id
                  </td>
                  <td>
                    <span className="pill pill-amber">
                      <span className="pill-dot" />
                      Nonaktif
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Log Sistem</span>
          </div>
          <div className="panel-body" style={{ padding: "14px 18px" }}>
            <div className="activity-list">
              <ActivityItem
                dotColor="green"
                text={
                  <>
                    Admin <strong>Fatimah</strong> mendaftarkan dosen baru
                  </>
                }
                time="2 jam lalu"
              />
              <ActivityItem
                text={
                  <>
                    Admin <strong>Yusuf</strong> login ke sistem
                  </>
                }
                time="5 jam lalu"
              />
              <ActivityItem
                dotColor="red"
                text={
                  <>
                    Akun admin <strong>Mira</strong> dinonaktifkan
                  </>
                }
                time="Kemarin, 11.00"
              />
              <ActivityItem
                dotColor="green"
                text={
                  <>
                    Super Admin menambahkan admin baru: <strong>Yusuf</strong>
                  </>
                }
                time="3 hari lalu"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══ Manajemen Pengguna ═══ */
function SAManajemenView() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <>
      <div className="page-header">
        <h1>Manajemen Pengguna</h1>
        <p>Tambahkan dan kelola akun Admin sistem.</p>
      </div>

      <div className="sub-tabs">
        <button
          className={`sub-tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          Daftar Admin
        </button>
        <button
          className={`sub-tab ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Tambah Admin
        </button>
      </div>

      {activeTab === "list" && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Semua Admin</span>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setActiveTab("add")}
            >
              + Tambah Admin
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Email</th>
                  <th>Tanggal Dibuat</th>
                  <th>Login Terakhir</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="avatar-cell">
                      <div className="avatar-sm">F</div>
                      <div>
                        <div className="cell-name">Fatimah, S.Kom</div>
                        <div className="cell-sub">Admin Utama</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    fatimah@uin-mataram.ac.id
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    01 Jan 2026
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    Hari ini, 08.30
                  </td>
                  <td>
                    <span className="pill pill-green">
                      <span className="pill-dot" />
                      Aktif
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-danger">
                      Nonaktifkan
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="avatar-cell">
                      <div
                        className="avatar-sm"
                        style={{
                          background: "linear-gradient(135deg,#7C3AED,#A855F7)",
                        }}
                      >
                        Y
                      </div>
                      <div>
                        <div className="cell-name">Yusuf, A.Md</div>
                        <div className="cell-sub">Admin</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    yusuf@uin-mataram.ac.id
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    15 Mar 2026
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    Hari ini, 05.12
                  </td>
                  <td>
                    <span className="pill pill-green">
                      <span className="pill-dot" />
                      Aktif
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-danger">
                      Nonaktifkan
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="avatar-cell">
                      <div
                        className="avatar-sm"
                        style={{
                          background: "linear-gradient(135deg,#059669,#10B981)",
                        }}
                      >
                        M
                      </div>
                      <div>
                        <div className="cell-name">Mira Susanti</div>
                        <div className="cell-sub">Admin</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    mira@uin-mataram.ac.id
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    10 Feb 2026
                  </td>
                  <td
                    style={{ fontSize: "12.5px", color: "var(--text-muted)" }}
                  >
                    3 hari lalu
                  </td>
                  <td>
                    <span className="pill pill-amber">
                      <span className="pill-dot" />
                      Nonaktif
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-primary">Aktifkan</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "add" && (
        <div className="panel" style={{ maxWidth: 520 }}>
          <div className="panel-header">
            <span className="panel-title">Tambahkan Admin Baru</span>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="form-label">
                Nama Lengkap <span className="req">*</span>
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Nama Lengkap, Gelar"
              />
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
            <div className="info-box">
              🔒 Password default akan dikirim ke email:{" "}
              <strong>12345678</strong>
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost">Batal</button>
              <button className="btn btn-primary">Tambah Admin</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══ Profil ═══ */
function SAProfilView() {
  return (
    <>
      <div className="page-header">
        <h1>Profil & Akun</h1>
        <p>Kelola informasi akun Super Admin.</p>
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
                  fontSize: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                👑
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
                  Super Administrator
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Administrator Utama Sistem SIBITA
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
              <label className="form-label">Nama</label>
              <input
                className="form-input"
                type="text"
                defaultValue="Super Administrator"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                defaultValue="superadmin@uin-mataram.ac.id"
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
}: {
  icon: React.ReactNode;
  bg: string;
  value: string;
  label: string;
}) {
  return (
    <div className="stat-card">
      <div className={`stat-card-icon ${bg}`}>{icon}</div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
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
