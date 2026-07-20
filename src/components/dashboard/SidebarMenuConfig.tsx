import React from "react";

export interface MenuItem {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: (active: boolean) => React.ReactNode;
}

export const iconClass = (active: boolean) =>
  `w-4.5 h-4.5 shrink-0 transition-opacity duration-150 ${
    active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
  }`;

export const menuConfig: Record<string, MenuItem[]> = {
  student: [
    {
      label: "Dashboard",
      href: "/dashboard/mahasiswa",
      match: (p) => p === "/dashboard/mahasiswa" || p.startsWith("/dashboard/mahasiswa/tahap"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: "Referensi",
      href: "/dashboard/mahasiswa/referensi",
      match: (p) => p === "/dashboard/mahasiswa/referensi",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path
            d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Pembayaran",
      href: "/dashboard/mahasiswa/pembayaran",
      match: (p) => p.startsWith("/dashboard/mahasiswa/pembayaran"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6v12M15 9H11.5a2.5 2.5 0 0 0 0 5H13a2.5 2.5 0 0 1 0 5H9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Profil",
      href: "/dashboard/mahasiswa/profil",
      match: (p) => p === "/dashboard/mahasiswa/profil",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M4 20c0-4 3.58-7 8-7s8 3 8 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ],
  lecturer: [
    {
      label: "Dashboard",
      href: "/dashboard/dosen",
      match: (p) => p === "/dashboard/dosen",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: "Bimbingan",
      href: "/dashboard/dosen/bimbingan",
      match: (p) => p.startsWith("/dashboard/dosen/bimbingan"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Chat Mahasiswa",
      href: "/dashboard/dosen/chat",
      match: (p) => p.startsWith("/dashboard/dosen/chat"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Profil & Akun",
      href: "/dashboard/dosen/profil",
      match: (p) => p === "/dashboard/dosen/profil",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ],
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      match: (p) => p === "/dashboard/admin",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: "Registrasi",
      href: "/dashboard/admin/registrasi",
      match: (p) => p.startsWith("/dashboard/admin/registrasi"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Pembayaran",
      href: "/dashboard/admin/pembayaran",
      match: (p) => p.startsWith("/dashboard/admin/pembayaran"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Data Dosen",
      href: "/dashboard/admin/manajemen-dosen",
      match: (p) => p.startsWith("/dashboard/admin/manajemen-dosen"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Data Mahasiswa",
      href: "/dashboard/admin/manajemen-mahasiswa",
      match: (p) => p.startsWith("/dashboard/admin/manajemen-mahasiswa"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5-10 5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Referensi",
      href: "/dashboard/admin/referensi",
      match: (p) => p.startsWith("/dashboard/admin/referensi"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M16 13H8M16 17H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Profil & Akun",
      href: "/dashboard/admin/profil",
      match: (p) => p === "/dashboard/admin/profil",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ],
  superadmin: [
    {
      label: "Dashboard",
      href: "/dashboard/superadmin",
      match: (p) => p === "/dashboard/superadmin",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      label: "Manajemen Pengguna",
      href: "/dashboard/superadmin/manajemen-pengguna",
      match: (p) => p.startsWith("/dashboard/superadmin/manajemen-pengguna"),
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Profil & Akun",
      href: "/dashboard/superadmin/profil",
      match: (p) => p === "/dashboard/superadmin/profil",
      icon: (active) => (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ],
};
