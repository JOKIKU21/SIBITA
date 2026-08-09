import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi SIBITA — informasi tentang bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda dalam Sistem Bimbingan Tugas Akhir.",
};

const sections = [
  {
    id: "pendahuluan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Pendahuluan",
    content: (
      <>
        <p>
          SIBITA (&quot;Sistem Bimbingan Tugas Akhir&quot;) berkomitmen untuk
          melindungi privasi dan keamanan data pribadi seluruh pengguna, termasuk
          mahasiswa, dosen pembimbing, dan administrator akademik.
        </p>
        <p>
          Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
          menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat
          menggunakan platform SIBITA. Dengan mengakses atau menggunakan layanan
          kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.
        </p>
        <p>
          Kebijakan ini berlaku efektif sejak tanggal terakhir diperbarui dan
          dapat berubah sewaktu-waktu. Kami akan memberitahu Anda melalui
          platform jika terdapat perubahan material.
        </p>
      </>
    ),
  },
  {
    id: "data-dikumpulkan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M21 5H3M21 5v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5m18 0-2-3H5L3 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Data yang Kami Kumpulkan",
    content: (
      <>
        <p>
          Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan
          meningkatkan layanan bimbingan tugas akhir:
        </p>
        <div className="privacy-data-grid">
          <div className="privacy-data-card">
            <h4>Informasi Akun</h4>
            <ul>
              <li>Nama lengkap dan NIM/NIP</li>
              <li>Alamat email institusi</li>
              <li>Program studi dan fakultas</li>
              <li>Nomor telepon (opsional)</li>
              <li>Foto profil (opsional)</li>
            </ul>
          </div>
          <div className="privacy-data-card">
            <h4>Data Akademik</h4>
            <ul>
              <li>Judul dan topik tugas akhir</li>
              <li>Progres tahapan bimbingan</li>
              <li>Catatan dan masukan dosen</li>
              <li>Dokumen tugas akhir yang diunggah</li>
              <li>Referensi jurnal yang disimpan</li>
            </ul>
          </div>
          <div className="privacy-data-card">
            <h4>Data Teknis</h4>
            <ul>
              <li>Alamat IP dan jenis perangkat</li>
              <li>Jenis dan versi browser</li>
              <li>Halaman yang dikunjungi</li>
              <li>Waktu akses dan durasi sesi</li>
              <li>Cookie dan token autentikasi</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "penggunaan-data",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Penggunaan Data",
    content: (
      <>
        <p>Data pribadi Anda digunakan untuk tujuan berikut:</p>
        <ol className="privacy-numbered-list">
          <li>
            <strong>Pengelolaan Bimbingan</strong> — Memfasilitasi proses
            bimbingan tugas akhir antara mahasiswa dan dosen pembimbing,
            termasuk pelacakan progres, penjadwalan, dan dokumentasi konsultasi.
          </li>
          <li>
            <strong>Autentikasi &amp; Keamanan</strong> — Memverifikasi
            identitas pengguna, mengelola sesi login, dan mencegah akses tidak
            sah ke akun Anda.
          </li>
          <li>
            <strong>Notifikasi</strong> — Mengirimkan pemberitahuan terkait
            jadwal bimbingan, deadline tahapan, masukan dosen, dan pembaruan
            penting lainnya.
          </li>
          <li>
            <strong>Peningkatan Layanan</strong> — Menganalisis pola penggunaan
            secara agregat (tanpa identifikasi pribadi) untuk meningkatkan
            performa, fitur, dan pengalaman pengguna platform.
          </li>
          <li>
            <strong>Pelaporan Akademik</strong> — Menyediakan laporan statistik
            progres bimbingan kepada pihak akademik yang berwenang sesuai
            peraturan institusi.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "perlindungan-data",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect
          x="3"
          y="11"
          width="18"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Perlindungan Data",
    content: (
      <>
        <p>
          Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk
          melindungi data pribadi Anda:
        </p>
        <div className="privacy-protection-grid">
          <div className="privacy-protection-item">
            <div className="privacy-protection-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong>Enkripsi Data</strong>
              <p>
                Seluruh komunikasi data menggunakan enkripsi TLS/SSL. Data
                sensitif disimpan dengan enkripsi AES-256 di database kami.
              </p>
            </div>
          </div>
          <div className="privacy-protection-item">
            <div className="privacy-protection-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong>Kontrol Akses</strong>
              <p>
                Akses ke data dibatasi berdasarkan peran (mahasiswa, dosen,
                admin). Setiap pengguna hanya dapat mengakses data yang relevan
                dengan perannya.
              </p>
            </div>
          </div>
          <div className="privacy-protection-item">
            <div className="privacy-protection-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 6v6l4 2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong>Audit Berkala</strong>
              <p>
                Kami melakukan audit keamanan secara berkala dan pemantauan
                sistem 24/7 untuk mendeteksi dan mencegah potensi ancaman
                keamanan.
              </p>
            </div>
          </div>
          <div className="privacy-protection-item">
            <div className="privacy-protection-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m22 6-10 7L2 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong>Backup Terenkripsi</strong>
              <p>
                Data Anda dicadangkan secara otomatis dan terenkripsi untuk
                mencegah kehilangan data akibat kegagalan sistem.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "berbagi-data",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "Berbagi Data dengan Pihak Ketiga",
    content: (
      <>
        <p>
          Kami <strong>tidak menjual</strong> data pribadi Anda kepada pihak
          ketiga. Data hanya dapat dibagikan dalam kondisi berikut:
        </p>
        <ul className="privacy-share-list">
          <li>
            <strong>Dosen Pembimbing:</strong> Data progres bimbingan dan
            dokumen tugas akhir dibagikan dengan dosen pembimbing yang
            ditugaskan untuk membimbing Anda.
          </li>
          <li>
            <strong>Pihak Akademik:</strong> Laporan agregat progres bimbingan
            dapat diakses oleh koordinator program studi atau pihak fakultas
            sesuai kebijakan institusi.
          </li>
          <li>
            <strong>Penyedia Layanan:</strong> Kami menggunakan penyedia layanan
            terpercaya (hosting, email) yang terikat perjanjian kerahasiaan dan
            hanya memproses data sesuai instruksi kami.
          </li>
          <li>
            <strong>Kewajiban Hukum:</strong> Data dapat diungkapkan jika
            diwajibkan oleh peraturan perundang-undangan yang berlaku di
            Indonesia.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hak-pengguna",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="9"
          cy="7"
          r="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m22 8-5 5M22 13l-5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Hak-Hak Pengguna",
    content: (
      <>
        <p>
          Sebagai pengguna SIBITA, Anda memiliki hak-hak berikut terkait data
          pribadi Anda:
        </p>
        <div className="privacy-rights-grid">
          {[
            {
              title: "Hak Akses",
              desc: "Anda berhak mengetahui data apa saja yang kami simpan tentang Anda dan meminta salinan data tersebut.",
            },
            {
              title: "Hak Perbaikan",
              desc: "Anda dapat memperbarui atau memperbaiki informasi pribadi yang tidak akurat melalui pengaturan profil.",
            },
            {
              title: "Hak Penghapusan",
              desc: "Anda dapat mengajukan permohonan penghapusan akun dan data pribadi, dengan tunduk pada kewajiban retensi akademik.",
            },
            {
              title: "Hak Pembatasan",
              desc: "Anda dapat membatasi cara kami memproses data Anda dalam kondisi tertentu yang diatur oleh hukum.",
            },
            {
              title: "Hak Portabilitas",
              desc: "Anda berhak menerima data pribadi Anda dalam format terstruktur dan dapat dibaca mesin.",
            },
            {
              title: "Hak Keberatan",
              desc: "Anda dapat mengajukan keberatan atas pemrosesan data untuk tujuan tertentu, seperti analitik penggunaan.",
            },
          ].map((right) => (
            <div key={right.title} className="privacy-right-card">
              <h4>{right.title}</h4>
              <p>{right.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "cookie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="8" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="8" r="1" fill="currentColor" />
        <circle cx="10" cy="14" r="1" fill="currentColor" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
        <circle cx="13" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Penggunaan Cookie",
    content: (
      <>
        <p>SIBITA menggunakan cookie untuk keperluan berikut:</p>
        <div className="privacy-cookie-table-wrapper">
          <table className="privacy-cookie-table">
            <thead>
              <tr>
                <th>Jenis Cookie</th>
                <th>Tujuan</th>
                <th>Durasi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="cookie-badge cookie-essential">Esensial</span>
                </td>
                <td>Autentikasi sesi login dan keamanan CSRF</td>
                <td>Sesi aktif</td>
              </tr>
              <tr>
                <td>
                  <span className="cookie-badge cookie-functional">Fungsional</span>
                </td>
                <td>Menyimpan preferensi tampilan dan bahasa</td>
                <td>1 tahun</td>
              </tr>
              <tr>
                <td>
                  <span className="cookie-badge cookie-analytics">Analitik</span>
                </td>
                <td>Memahami pola penggunaan platform secara agregat</td>
                <td>6 bulan</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Anda dapat mengelola preferensi cookie melalui pengaturan browser Anda.
          Menonaktifkan cookie esensial dapat memengaruhi fungsionalitas platform.
        </p>
      </>
    ),
  },
  {
    id: "retensi-data",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M3 3v5h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.05 13A9 9 0 1 0 5.64 5.64L3 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7v5l4 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Retensi Data",
    content: (
      <>
        <p>
          Data pribadi Anda disimpan selama diperlukan untuk memenuhi tujuan yang
          dijelaskan dalam kebijakan ini:
        </p>
        <ul className="privacy-share-list">
          <li>
            <strong>Data Akun Aktif:</strong> Disimpan selama akun Anda aktif di
            platform SIBITA.
          </li>
          <li>
            <strong>Data Bimbingan:</strong> Disimpan selama proses bimbingan
            berlangsung dan hingga 5 tahun setelah kelulusan, sesuai ketentuan
            arsip akademik institusi.
          </li>
          <li>
            <strong>Dokumen Tugas Akhir:</strong> Disimpan sesuai dengan
            kebijakan retensi arsip akademik institusi yang berlaku.
          </li>
          <li>
            <strong>Data Log Teknis:</strong> Disimpan maksimal 12 bulan untuk
            keperluan keamanan dan pemecahan masalah teknis.
          </li>
        </ul>
        <p>
          Setelah melewati masa retensi, data akan dihapus atau dianonimkan
          secara permanen.
        </p>
      </>
    ),
  },
  {
    id: "kontak",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m22 6-10 7L2 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Hubungi Kami",
    content: (
      <>
        <p>
          Jika Anda memiliki pertanyaan, permintaan, atau keluhan terkait
          Kebijakan Privasi ini atau pemrosesan data pribadi Anda, silakan
          hubungi kami:
        </p>
        <div className="privacy-contact-card">
          <div className="privacy-contact-row">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m22 6-10 7L2 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>jokimu2100@gmail.com</span>
          </div>
          <div className="privacy-contact-row">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <span>Sukoharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581</span>
          </div>
          <div className="privacy-contact-row">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
            <span>+62 817 464 655</span>
          </div>
        </div>
        <p>
          Kami akan merespons permintaan Anda dalam waktu maksimal 14 hari kerja.
        </p>
      </>
    ),
  },
] as const;

export default function KebijakanPrivasiPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-brand/97 backdrop-blur-md px-[5vw] h-18 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-display font-extrabold text-[19px] tracking-[0.01em] no-underline"
        >
          <Image src="/sibita.png" alt="SIBITA" width={34} height={34} className="w-8.5 h-8.5 shrink-0" />
          SIBITA
        </Link>
        <Link
          href="/"
          className="text-white/80 no-underline text-[14px] font-medium transition-colors duration-200 hover:text-white flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kembali
        </Link>
      </nav>

      <main className="privacy-page">
        {/* Hero */}
        <section className="privacy-hero">
          <div className="privacy-hero-inner">
            <div className="privacy-hero-badge">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Kebijakan Privasi
            </div>
            <h1 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-0.01em] text-white mb-4">
              Privasi &amp; Perlindungan{" "}
              <span className="bg-linear-to-r from-[#8FE3C0] to-[#6FE3A6] bg-clip-text text-transparent">
                Data Anda
              </span>
            </h1>
            <p className="text-[15.5px] text-white/70 leading-[1.65] max-w-130 mx-auto">
              Kami berkomitmen menjaga keamanan dan privasi data pribadi seluruh
              pengguna SIBITA. Baca kebijakan lengkap kami di bawah ini.
            </p>
            <div className="privacy-hero-meta">
              <span>Terakhir diperbarui: 9 Agustus 2026</span>
              <span className="privacy-hero-sep">•</span>
              <span>Versi 1.0</span>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="privacy-toc">
          <div className="privacy-toc-inner">
            <h2 className="font-display text-[15px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
              Daftar Isi
            </h2>
            <nav className="privacy-toc-nav">
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="privacy-toc-link">
                  <span className="privacy-toc-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Content sections */}
        <div className="privacy-content">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="privacy-section">
              <div className="privacy-section-header">
                <div className="privacy-section-icon">{section.icon}</div>
                <div className="privacy-section-num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-display text-[clamp(20px,2.5vw,26px)] font-extrabold tracking-[-0.01em] text-neutral-text">
                  {section.title}
                </h2>
              </div>
              <div className="privacy-section-body">{section.content}</div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer (simplified) */}
      <footer className="bg-[#0f1430] text-white py-10 px-[5vw] border-t border-white/5">
        <div className="max-w-270 mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5 font-display text-[17px] font-extrabold">
            <Image src="/sibita.png" alt="SIBITA" width={32} height={32} className="w-8 h-8 shrink-0" />
            SIBITA
          </div>
          <p className="text-[13px] text-white/50 text-center">
            &copy; 2026 SIBITA — Sistem Bimbingan Tugas Akhir. Seluruh hak
            dilindungi.
          </p>
        </div>
      </footer>
    </>
  );
}
