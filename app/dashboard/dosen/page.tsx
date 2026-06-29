"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

/* ── Dosen Dashboard ── */

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  bimbingan: "Bimbingan",
  profil: "Profil & Akun",
};

export default function DosenPage() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="dashboard-layout">
      <Sidebar
        role="dosen"
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <div className="dash-main">
        <Topbar
          title={VIEW_TITLES[activeView] ?? "Dashboard"}
          avatarInitial="R"
        />

        <div className="content-area">
          {activeView === "dashboard" && (
            <DosenDashboardView onNavigate={setActiveView} />
          )}
          {activeView === "bimbingan" && <DosenBimbinganView />}
          {activeView === "profil" && <DosenProfilView />}
        </div>
      </div>
    </div>
  );
}

/* ═══ Dashboard View ═══ */
function DosenDashboardView({
  onNavigate,
}: {
  onNavigate: (v: string) => void;
}) {
  return (
    <>
      <div className="page-header">
        <h1>Selamat datang, Dr. Rizal 👋</h1>
        <p>Berikut ringkasan bimbingan mahasiswa Anda hari ini.</p>
      </div>

      <div className="stat-row stat-row-4">
        <StatCard
          icon={<UserIcon color="#2B3BAF" />}
          bg="blue"
          value="12"
          label="Mahasiswa Bimbingan"
        />
        <StatCard
          icon={<CheckCircle color="#16A34A" />}
          bg="green"
          value="4"
          label="Selesai Semester Ini"
          delta="↑ 2 dari semester lalu"
          deltaUp
        />
        <StatCard
          icon={<ClockIcon color="#B45309" />}
          bg="amber"
          value="3"
          label="Mendekati Tenggat"
        />
        <StatCard
          icon={<AlertIcon color="#B91C1C" />}
          bg="red"
          value="1"
          label="Terlambat / Tidak Aktif"
        />
      </div>

      <div className="grid-2">
        {/* Mahasiswa Bimbingan */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Mahasiswa Bimbingan</span>
            <button
              className="panel-action"
              onClick={() => onNavigate("bimbingan")}
            >
              Lihat Semua →
            </button>
          </div>
          <div className="panel-body" style={{ padding: "14px 18px" }}>
            <MhsCard
              initial="A"
              name="Ahmad Fauzi"
              nim="NIM 210101032 · Sistem Informasi"
              topic="Implementasi JWT pada REST API Node.js"
              progress={75}
              pillClass="pill-green"
              pillLabel="Aktif"
            />
            <MhsCard
              initial="S"
              name="Siti Rahayu"
              nim="NIM 210101045 · Teknik Informatika"
              topic="Analisis Sentimen Ulasan Aplikasi Mobile"
              progress={42}
              fillClass="amber"
              pillClass="pill-amber"
              pillLabel="Mendekati Tenggat"
              bgGradient="linear-gradient(135deg,#7C3AED,#A855F7)"
            />
            <MhsCard
              initial="B"
              name="Budi Santoso"
              nim="NIM 210101011 · Sistem Informasi"
              topic="Sistem Informasi Manajemen Aset Kampus"
              progress={18}
              fillClass="red"
              pillClass="pill-red"
              pillLabel="Terlambat"
              bgGradient="linear-gradient(135deg,#059669,#10B981)"
            />
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Aktivitas Terbaru</span>
          </div>
          <div className="panel-body" style={{ padding: "14px 18px" }}>
            <div className="activity-list">
              <ActivityItem
                dotColor="green"
                text={
                  <>
                    <strong>Ahmad Fauzi</strong> menyelesaikan Tahap 11 —
                    Konsultasi ke-3
                  </>
                }
                time="30 menit lalu"
              />
              <ActivityItem
                text={
                  <>
                    <strong>Siti Rahayu</strong> mengunggah dokumen Tahap 9
                  </>
                }
                time="2 jam lalu"
              />
              <ActivityItem
                dotColor="amber"
                text={
                  <>
                    <strong>Budi Santoso</strong> belum ada aktivitas sejak 14
                    hari
                  </>
                }
                time="14 hari lalu"
              />
              <ActivityItem
                dotColor="green"
                text={
                  <>
                    <strong>Rina Wulandari</strong> mengajukan topik penelitian
                    baru
                  </>
                }
                time="Kemarin, 16.20"
              />
              <ActivityItem
                text={
                  <>
                    <strong>Hendra Gunawan</strong> mengirim pesan di Chatting
                  </>
                }
                time="Kemarin, 10.55"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══ Bimbingan View ═══ */
function DosenBimbinganView() {
  return (
    <>
      <div className="page-header">
        <h1>Bimbingan</h1>
        <p>Daftar lengkap semua mahasiswa bimbingan dan detail progresnya.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Semua Mahasiswa Bimbingan</span>
          <span className="pill pill-blue">12 mahasiswa</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Mahasiswa</th>
                <th>Judul / Topik</th>
                <th>Tahap Aktif</th>
                <th>Progres</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <BimbinganRow
                initial="A"
                name="Ahmad Fauzi"
                sub="210101032 · SI"
                topic="Implementasi JWT pada REST API Node.js"
                tahap="Tahap 11"
                progress={75}
                statusPill="pill-green"
                statusLabel="Aktif"
              />
              <BimbinganRow
                initial="S"
                name="Siti Rahayu"
                sub="210101045 · TI"
                topic="Analisis Sentimen Ulasan Aplikasi Mobile"
                tahap="Tahap 9"
                progress={42}
                fillClass="amber"
                statusPill="pill-amber"
                statusLabel="Mendekati Tenggat"
                bgGradient="linear-gradient(135deg,#7C3AED,#A855F7)"
              />
              <BimbinganRow
                initial="B"
                name="Budi Santoso"
                sub="210101011 · SI"
                topic="Sistem Informasi Manajemen Aset Kampus"
                tahap="Tahap 3"
                progress={18}
                fillClass="red"
                statusPill="pill-red"
                statusLabel="Terlambat"
                bgGradient="linear-gradient(135deg,#059669,#10B981)"
              />
              <BimbinganRow
                initial="R"
                name="Rina Wulandari"
                sub="210101058 · SI"
                topic="Sistem Pakar Diagnosa Penyakit Tanaman"
                tahap="Tahap 1"
                progress={5}
                statusPill="pill-grey"
                statusLabel="Baru Mulai"
                bgGradient="linear-gradient(135deg,#B45309,#F2B33D)"
              />
              <BimbinganRow
                initial="H"
                name="Hendra Gunawan"
                sub="210101023 · TI"
                topic="Penerapan Algoritma K-Means pada Data Alumni"
                tahap="Tahap 14"
                progress={88}
                fillClass="green"
                statusPill="pill-green"
                statusLabel="Aktif"
                bgGradient="linear-gradient(135deg,#0369A1,#38BDF8)"
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ═══ Profil View ═══ */
function DosenProfilView() {
  return (
    <>
      <div className="page-header">
        <h1>Profil & Akun</h1>
        <p>Kelola informasi akun dan data diri Anda.</p>
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
                R
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
                  Dr. Rizal Fauzi, M.Kom
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Dosen Pembimbing · NIDN 0012345678
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
                defaultValue="Dr. Rizal Fauzi, M.Kom"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                defaultValue="rizal.fauzi@uin-mataram.ac.id"
              />
            </div>
            <div className="form-group">
              <label className="form-label">NIDN</label>
              <input
                className="form-input"
                type="text"
                defaultValue="0012345678"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Program Studi</label>
              <input
                className="form-input"
                type="text"
                defaultValue="Sistem Informasi"
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

/* ═══ Shared Sub-Components ═══ */

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

function MhsCard({
  initial,
  name,
  nim,
  topic,
  progress,
  fillClass,
  pillClass,
  pillLabel,
  bgGradient,
}: {
  initial: string;
  name: string;
  nim: string;
  topic: string;
  progress: number;
  fillClass?: string;
  pillClass: string;
  pillLabel: string;
  bgGradient?: string;
}) {
  return (
    <div className="mhs-card">
      <div
        className="mhs-avatar"
        style={bgGradient ? { background: bgGradient } : undefined}
      >
        {initial}
      </div>
      <div className="mhs-info">
        <div className="mhs-name">{name}</div>
        <div className="mhs-nim">{nim}</div>
        <div className="mhs-topic">{topic}</div>
        <div className="mhs-footer">
          <div className="prog-wrap" style={{ flex: 1 }}>
            <div className="prog-track">
              <div
                className={`prog-fill ${fillClass ?? ""}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="prog-text">{progress}%</span>
          </div>
          <span className={`pill ${pillClass}`}>
            <span className="pill-dot" />
            {pillLabel}
          </span>
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

function BimbinganRow({
  initial,
  name,
  sub,
  topic,
  tahap,
  progress,
  fillClass,
  statusPill,
  statusLabel,
  bgGradient,
}: {
  initial: string;
  name: string;
  sub: string;
  topic: string;
  tahap: string;
  progress: number;
  fillClass?: string;
  statusPill: string;
  statusLabel: string;
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
      <td style={{ maxWidth: 200, fontSize: "12.5px" }}>{topic}</td>
      <td>
        <span className="pill pill-blue">{tahap}</span>
      </td>
      <td>
        <div className="prog-wrap">
          <div className="prog-track">
            <div
              className={`prog-fill ${fillClass ?? ""}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="prog-text">{progress}%</span>
        </div>
      </td>
      <td>
        <span className={`pill ${statusPill}`}>
          <span className="pill-dot" />
          {statusLabel}
        </span>
      </td>
      <td>
        <button className="btn btn-sm btn-outline">Detail</button>
      </td>
    </tr>
  );
}

/* ── Icons ── */
function UserIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path
        d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CheckCircle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path
        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M22 4 12 14.01l-3-3"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ClockIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.7" />
      <path
        d="M12 7v5l3.5 2"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function AlertIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.7" />
      <path
        d="M12 8v4M12 16h.01"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
