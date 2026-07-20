"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/Button";
import { menuConfig } from "./SidebarMenuConfig";

export function Sidebar() {
  const pathname = usePathname() || "";

  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    try {
      await authService.signOut();
    } catch (error) {
      console.error("Gagal keluar:", error);
      window.location.href = "/masuk";
    }
  }

  const role = (session?.user as { role?: string })?.role || "student";
  
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
    `flex items-center gap-3 py-2.75 px-3.5 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-[background,color] duration-150 group ${
      active ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
    }`;

  const activeMenu = menuConfig[role] || menuConfig.student;
  const roleLabel = getRoleLabel(role);

  return (
    <aside className="w-65 shrink-0 bg-brand-dark flex flex-col p-0 sticky top-0 h-screen overflow-y-auto max-[600px]:hidden">
      <div className="flex items-center gap-2.5 pt-6 px-5 pb-5 border-b border-white/8">
        <span className="w-9 h-9 rounded-2.5 bg-white/13 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4.75 h-4.75">
            <path
              d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"
              stroke="white"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M4 17.5C4 16.12 5.12 15 6.5 15H18"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <div className="font-display font-extrabold text-[17px] text-white">SIBITA</div>
          <div className="text-2.5 text-white/45 font-medium mt-px">Bimbingan Tugas Akhir</div>
        </div>
      </div>

      <nav className="pt-4.5 px-3 pb-0 flex-1" aria-label="Navigasi Utama">
        <div className="text-2.5 font-bold tracking-widest uppercase text-white/35 px-2.5 mb-1.5 mt-4.5">
          Menu Utama
        </div>
        {activeMenu.map((item) => {
          const isActive = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(isActive)}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon(isActive)}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 px-3 border-t border-white/8">
        <div className="flex items-center gap-3 py-2.5 px-3 rounded-2.5 mb-1.5 bg-white/5">
          {role === "superadmin" ? (
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-[14px] shrink-0 overflow-hidden">
              👑
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-3.5 font-bold text-white shrink-0 overflow-hidden">
              {isPending ? "..." : avatarLetter}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {isPending ? "Memuat..." : name}
            </div>
            <div className="text-2.75 text-white/50 whitespace-nowrap overflow-hidden text-ellipsis">
              {isPending ? "" : roleLabel}
            </div>
          </div>
        </div>
        <Button
          variant="danger-light"
          size="custom"
          fullWidth
          className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-2.5 text-[13.5px] font-semibold"
          type="button"
          onClick={handleLogout}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Keluar
        </Button>
      </div>
    </aside>
  );
}
