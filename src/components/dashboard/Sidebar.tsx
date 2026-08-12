"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/Button";
import { menuConfig } from "./SidebarMenuConfig";

export function Sidebar({ roleOverride }: { roleOverride?: string } = {}) {
  const pathname = usePathname() || "";
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    try {
      await authService.signOut();
    } catch (error) {
      console.error("Gagal keluar:", error);
      window.location.href = "/masuk";
    }
  }

  const role = roleOverride || (session?.user as { role?: string })?.role || "student";
  
  const defaultNames: Record<string, string> = {
    student: "Pengguna",
    lecturer: "Dosen",
    admin: "Admin",
    superadmin: "Super Admin",
  };

  const name = session?.user?.name || defaultNames[role] || "Pengguna";
  const avatarLetter = name.charAt(0).toUpperCase();

  const getRoleLabel = (r: string) => {
    switch (r) {
      case "student":
        return "Mahasiswa";
      case "lecturer":
        return "Dosen Pembimbing";
      case "admin":
        return "Admin";
      case "superadmin":
        return "Administrator Utama";
      default:
        return r;
    }
  };

  const linkClass = (active: boolean) =>
    `flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3.5'} py-2.75 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-all duration-150 group ${
      active ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
    }`;

  const activeMenu = menuConfig[role] || menuConfig.student;
  const roleLabel = getRoleLabel(role);

  return (
    <aside className={`shrink-0 bg-brand-dark flex flex-col p-0 sticky top-0 h-screen overflow-visible max-[600px]:hidden transition-all duration-300 relative z-50 ${isCollapsed ? 'w-20' : 'w-65'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-brand-light border-2 border-brand-dark rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors z-50 shadow-md focus:outline-none"
        title={isCollapsed ? "Perlebar Sidebar" : "Kecilkan Sidebar"}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0">
          <path d={isCollapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Logo & Header */}
      <div className={`flex items-center pt-6 pb-5 border-b border-white/8 ${isCollapsed ? 'justify-center px-0' : 'gap-2.5 px-5'}`}>
        <Image src="/sibita.png" alt="SIBITA" width={36} height={36} className="w-9 h-9 shrink-0" />
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap transition-all duration-300">
            <div className="font-display font-extrabold text-[17px] text-white">SIBITA</div>
            <div className="text-2.5 text-white/45 font-medium mt-px">Bimbingan Tugas Akhir</div>
          </div>
        )}
      </div>

      <nav className={`pt-4.5 pb-2 flex-1 ${isCollapsed ? 'px-2' : 'px-3'}`} aria-label="Navigasi Utama">
        {!isCollapsed ? (
          <div className="text-2.5 font-bold tracking-widest uppercase text-white/35 px-2.5 mb-1.5 mt-4.5 whitespace-nowrap">
            Menu Utama
          </div>
        ) : (
          <div className="mt-8"></div>
        )}
        
        {activeMenu.map((item) => {
          const href = item.href;
          const isActive = item.match(pathname);
            
          return (
            <Link
              key={href}
              href={href}
              className={linkClass(isActive)}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon(isActive)}
              {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/8 shrink-0">
        <div className={`flex items-center py-2 px-2 rounded-2.5 bg-white/5 ${isCollapsed ? 'flex-col gap-3' : 'justify-between'}`}>
          
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            {role === "superadmin" ? (
              <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-[14px] shrink-0 overflow-hidden">
                👑
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-3.5 font-bold text-white shrink-0 overflow-hidden">
                {isPending ? "..." : avatarLetter}
              </div>
            )}
            
            {!isCollapsed && (
              <div className="min-w-0 pr-1">
                <div className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[90px]">
                  {isPending ? "Memuat..." : name}
                </div>
                <div className="text-2.75 text-white/50 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90px]">
                  {isPending ? "" : roleLabel}
                </div>
              </div>
            )}
          </div>
          
          {/* Logout Icon Button */}
          <button 
            onClick={handleLogout}
            title="Keluar"
            className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 shrink-0">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
        </div>
      </div>
    </aside>
  );
}
