"use client";

import Link from "next/link";

/* ── SVG Icon components ── */
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
    <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="sicon" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" /></svg>
);

const BimbinganIcon = () => (
  <svg className="sicon" viewBox="0 0 24 24" fill="none"><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ProfilIcon = () => (
  <svg className="sicon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
);

const ManajemenDosenIcon = () => (
  <svg className="sicon" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ReferensiIcon = () => (
  <svg className="sicon" viewBox="0 0 24 24" fill="none"><path d="M4 19V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v14H6a2 2 0 0 0-2 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M4 21a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2" stroke="currentColor" strokeWidth="1.7" /></svg>
);

const ManajemenPenggunaIcon = () => (
  <svg className="sicon" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ── Menu config per role ── */
type MenuItem = { label: string; icon: React.ReactNode; view: string };

const ROLE_MENUS: Record<string, MenuItem[]> = {
  mahasiswa: [
    { label: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { label: "Bimbingan", icon: <BimbinganIcon />, view: "bimbingan" },
    { label: "Profil & Akun", icon: <ProfilIcon />, view: "profil" },
  ],
  dosen: [
    { label: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { label: "Bimbingan", icon: <BimbinganIcon />, view: "bimbingan" },
    { label: "Profil & Akun", icon: <ProfilIcon />, view: "profil" },
  ],
  admin: [
    { label: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { label: "Manajemen Dosen", icon: <ManajemenDosenIcon />, view: "manajemen" },
    { label: "Referensi", icon: <ReferensiIcon />, view: "referensi" },
    { label: "Profil & Akun", icon: <ProfilIcon />, view: "profil" },
  ],
  superadmin: [
    { label: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { label: "Manajemen Pengguna", icon: <ManajemenPenggunaIcon />, view: "manajemen" },
    { label: "Profil & Akun", icon: <ProfilIcon />, view: "profil" },
  ],
};

const ROLE_USERS: Record<string, { name: string; role: string; emoji: string }> = {
  mahasiswa: { name: "Ahmad Fauzi", role: "Mahasiswa", emoji: "🎓" },
  dosen: { name: "Dr. Rizal, M.Kom", role: "Dosen Pembimbing", emoji: "👨‍🏫" },
  admin: { name: "Fatimah, S.Kom", role: "Admin", emoji: "🛠️" },
  superadmin: { name: "Super Admin", role: "Administrator Utama", emoji: "👑" },
};

interface SidebarProps {
  role: string;
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ role, activeView, onViewChange }: SidebarProps) {
  const menus = ROLE_MENUS[role] ?? ROLE_MENUS.mahasiswa;
  const user = ROLE_USERS[role] ?? ROLE_USERS.mahasiswa;

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-brand">
        <span className="sidebar-brand-mark">
          <BookIcon />
        </span>
        SIBITA
      </Link>

      {menus.map((item) => (
        <button
          key={item.view}
          className={`sidebar-link ${activeView === item.view ? "active" : ""}`}
          onClick={() => onViewChange(item.view)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}

      <div className="sidebar-spacer" />

      <div className="sidebar-user">
        <div className="sidebar-avatar">{user.emoji}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{user.name}</div>
          <div className="sidebar-user-role">{user.role}</div>
        </div>
        <Link href="/masuk" className="sidebar-logout-btn" title="Logout">
          <LogoutIcon />
        </Link>
      </div>
    </aside>
  );
}
