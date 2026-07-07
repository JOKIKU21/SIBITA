// ponytail: dummy data for admin dashboard — frontend only

export interface AdminProfile {
  nama: string;
  email: string;
}

export interface DosenItem {
  nip: string;
  nama: string;
  email: string;
  prodi: string;
  totalBimbingan: number;
  status: "aktif" | "nonaktif";
  avatarColor: string;
}

export interface MahasiswaBelumBimbing {
  nim: string;
  nama: string;
  prodi: string;
}

export interface PencocokanItem {
  mahasiswaNama: string;
  mahasiswaNim: string;
  dosenNama: string;
  tanggal: string;
  status: "aktif" | "selesai";
}

export interface ReferensiItem {
  id: string;
  judul: string;
  deskripsi: string;
  namaFile: string;
  ukuran: string;
}

export const ADMIN_PROFILE: AdminProfile = {
  nama: "Fatimah, S.Kom",
  email: "fatimah@uin-mataram.ac.id",
};

export const DOSEN_LIST: DosenItem[] = [
  {
    nip: "198501012010",
    nama: "Dr. Rizal Fauzi, M.Kom",
    email: "rizal@uin-mataram.ac.id",
    prodi: "Sistem Informasi",
    totalBimbingan: 12,
    status: "aktif",
    avatarColor: "from-[#818CF8] to-[#6366F1]",
  },
  {
    nip: "198702152011",
    nama: "Dr. Nurul Hikmah, M.T",
    email: "nurul@uin-mataram.ac.id",
    prodi: "Teknik Informatika",
    totalBimbingan: 9,
    status: "aktif",
    avatarColor: "from-[#34D399] to-[#059669]",
  },
  {
    nip: "199003212012",
    nama: "Hasan, M.Cs",
    email: "hasan@uin-mataram.ac.id",
    prodi: "Sistem Informasi",
    totalBimbingan: 14,
    status: "aktif",
    avatarColor: "from-[#FB923C] to-[#EA580C]",
  },
  {
    nip: "198806102013",
    nama: "Anisah Putri, M.Kom",
    email: "anisah@uin-mataram.ac.id",
    prodi: "Sistem Informasi",
    totalBimbingan: 7,
    status: "aktif",
    avatarColor: "from-[#F472B6] to-[#EC4899]",
  },
  {
    nip: "199105302014",
    nama: "Dr. Budi Setiawan, M.T",
    email: "budi.s@uin-mataram.ac.id",
    prodi: "Teknik Informatika",
    totalBimbingan: 11,
    status: "aktif",
    avatarColor: "from-[#60A5FA] to-[#2563EB]",
  },
  {
    nip: "198404252015",
    nama: "Siti Aminah, M.Kom",
    email: "siti.aminah@uin-mataram.ac.id",
    prodi: "Sistem Informasi",
    totalBimbingan: 5,
    status: "nonaktif",
    avatarColor: "from-[#A78BFA] to-[#7C3AED]",
  },
];

export const MAHASISWA_BELUM_BIMBING: MahasiswaBelumBimbing[] = [
  { nim: "210101058", nama: "Rina Wulandari", prodi: "Teknik Informatika" },
  { nim: "210101067", nama: "Dewi Lestari", prodi: "Sistem Informasi" },
  { nim: "210101072", nama: "Agus Pratama", prodi: "Teknik Informatika" },
  { nim: "210101083", nama: "Lina Safitri", prodi: "Sistem Informasi" },
  { nim: "210101095", nama: "Rendi Kurniawan", prodi: "Teknik Informatika" },
];

export const PENCOCOKAN_TERBARU: PencocokanItem[] = [
  {
    mahasiswaNama: "Rina Wulandari",
    mahasiswaNim: "210101058",
    dosenNama: "Dr. Rizal Fauzi, M.Kom",
    tanggal: "24 Jun 2026",
    status: "aktif",
  },
  {
    mahasiswaNama: "Dewi Lestari",
    mahasiswaNim: "210101067",
    dosenNama: "Hasan, M.Cs",
    tanggal: "20 Jun 2026",
    status: "aktif",
  },
];

export const REFERENSI_LIST_INITIAL: ReferensiItem[] = [
  {
    id: "ref-1",
    judul: "Panduan Penulisan Skripsi UIN Mataram 2025",
    deskripsi: "Pedoman resmi penulisan tugas akhir mencakup format, sistematika, dan tata cara pengutipan sesuai standar institusi.",
    namaFile: "panduan-skripsi-2025.pdf",
    ukuran: "2.4 MB",
  },
  {
    id: "ref-2",
    judul: "Template Proposal Penelitian",
    deskripsi: "File template proposal dalam format DOCX dengan margin dan heading styles sesuai panduan institusi.",
    namaFile: "template-proposal.docx",
    ukuran: "540 KB",
  },
  {
    id: "ref-3",
    judul: "Contoh Skripsi Terbaik 2024",
    deskripsi: "Kumpulan 3 skripsi terbaik tahun akademik 2023/2024 sebagai referensi standar penulisan dan penelitian.",
    namaFile: "contoh-skripsi-2024.zip",
    ukuran: "8.1 MB",
  },
];

// ponytail: derived stats
export function getAdminStats() {
  const totalDosen = DOSEN_LIST.length;
  const totalMahasiswa = 124;
  const bimbinganBerjalan = DOSEN_LIST.reduce((sum, d) => sum + d.totalBimbingan, 0);
  const skripsiSelesai = 41;
  return { totalDosen, totalMahasiswa, bimbinganBerjalan, skripsiSelesai };
}
