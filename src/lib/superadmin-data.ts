// ponytail: dummy data for super admin dashboard — frontend only

export interface SuperAdminProfile {
  nama: string;
  email: string;
}

export interface AdminItem {
  id: string;
  nama: string;
  email: string;
  tanggalDibuat: string;
  loginTerakhir: string;
  status: "aktif" | "nonaktif";
  avatarColor: string;
}

export const SUPERADMIN_PROFILE: SuperAdminProfile = {
  nama: "Super Administrator",
  email: "superadmin@uin-mataram.ac.id",
};

export const ADMIN_LIST: AdminItem[] = [
  {
    id: "adm-1",
    nama: "Fatimah, S.Kom",
    email: "fatimah@uin-mataram.ac.id",
    tanggalDibuat: "15 Jan 2025",
    loginTerakhir: "7 Jul 2026, 14:30",
    status: "aktif",
    avatarColor: "from-[#818CF8] to-[#6366F1]",
  },
  {
    id: "adm-2",
    nama: "Yusuf, A.Md",
    email: "yusuf@uin-mataram.ac.id",
    tanggalDibuat: "20 Mar 2025",
    loginTerakhir: "7 Jul 2026, 09:15",
    status: "aktif",
    avatarColor: "from-[#34D399] to-[#059669]",
  },
  {
    id: "adm-3",
    nama: "Andi Saputra, S.T",
    email: "andi.s@uin-mataram.ac.id",
    tanggalDibuat: "10 Jun 2025",
    loginTerakhir: "5 Jul 2026, 11:00",
    status: "aktif",
    avatarColor: "from-[#60A5FA] to-[#2563EB]",
  },
];

export function getSuperAdminStats() {
  const adminAktif = ADMIN_LIST.filter((a) => a.status === "aktif").length;
  const adminNonAktif = ADMIN_LIST.filter((a) => a.status === "nonaktif").length;
  return {
    totalDosen: 0,
    totalMahasiswa: 0,
    skripsiSelesai: 0,
    bimbinganAktif: 0,
    adminAktif,
    tidakAktif: adminNonAktif,
  };
}
