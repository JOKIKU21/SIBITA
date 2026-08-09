import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan Ketentuan penggunaan SIBITA — aturan, hak, dan kewajiban pengguna dalam Sistem Bimbingan Tugas Akhir.",
};

const sections = [
  {
    id: "ketentuan-umum",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Ketentuan Umum",
    content: (
      <>
        <p>
          Syarat dan Ketentuan ini (&quot;Ketentuan&quot;) mengatur penggunaan
          Anda atas platform SIBITA (Sistem Bimbingan Tugas Akhir), termasuk
          seluruh fitur, layanan, dan konten yang tersedia di dalamnya.
        </p>
        <p>
          Dengan membuat akun atau mengakses platform SIBITA, Anda menyatakan
          telah membaca, memahami, dan menyetujui untuk terikat oleh Ketentuan
          ini. Jika Anda tidak menyetujui salah satu ketentuan, mohon untuk
          tidak menggunakan layanan kami.
        </p>
        <p>
          SIBITA berhak mengubah Ketentuan ini sewaktu-waktu. Perubahan akan
          diberitahukan melalui platform dan berlaku efektif sejak tanggal
          publikasi. Penggunaan berkelanjutan setelah perubahan dianggap sebagai
          persetujuan Anda.
        </p>
      </>
    ),
  },
  {
    id: "definisi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M4 17.5C4 16.12 5.12 15 6.5 15H18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8.5h6M8 11.5h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Definisi",
    content: (
      <div className="privacy-data-grid">
        <div className="privacy-data-card">
          <h4>&quot;Platform&quot;</h4>
          <p className="tos-def-text">
            Merujuk pada aplikasi web SIBITA beserta seluruh fitur, layanan,
            dan konten yang tersedia di dalamnya.
          </p>
        </div>
        <div className="privacy-data-card">
          <h4>&quot;Pengguna&quot;</h4>
          <p className="tos-def-text">
            Setiap individu yang mengakses atau menggunakan Platform, termasuk
            Mahasiswa, Dosen Pembimbing, dan Administrator.
          </p>
        </div>
        <div className="privacy-data-card">
          <h4>&quot;Mahasiswa&quot;</h4>
          <p className="tos-def-text">
            Pengguna terdaftar yang menggunakan Platform untuk mengelola proses
            bimbingan tugas akhir/skripsi mereka.
          </p>
        </div>
        <div className="privacy-data-card">
          <h4>&quot;Dosen Pembimbing&quot;</h4>
          <p className="tos-def-text">
            Pengguna terdaftar yang ditugaskan oleh institusi untuk membimbing
            mahasiswa dalam proses tugas akhir.
          </p>
        </div>
        <div className="privacy-data-card">
          <h4>&quot;Konten&quot;</h4>
          <p className="tos-def-text">
            Seluruh data, dokumen, teks, gambar, dan materi lainnya yang
            diunggah, dibuat, atau dibagikan melalui Platform.
          </p>
        </div>
        <div className="privacy-data-card">
          <h4>&quot;Layanan&quot;</h4>
          <p className="tos-def-text">
            Seluruh fungsi yang disediakan Platform, termasuk pelacakan
            tahapan, referensi jurnal, dan konsultasi terstruktur.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "pendaftaran-akun",
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
          d="M19 8v6M22 11h-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Pendaftaran Akun",
    content: (
      <>
        <p>
          Untuk menggunakan layanan SIBITA, Anda wajib melakukan pendaftaran
          akun dengan ketentuan berikut:
        </p>
        <ol className="privacy-numbered-list">
          <li>
            <strong>Kelayakan</strong> — Anda harus merupakan mahasiswa aktif
            atau dosen/staf yang terdaftar di institusi pendidikan yang
            bekerja sama dengan SIBITA.
          </li>
          <li>
            <strong>Informasi Akurat</strong> — Anda wajib memberikan informasi
            yang benar, lengkap, dan terkini saat pendaftaran. Informasi palsu
            dapat mengakibatkan penangguhan akun.
          </li>
          <li>
            <strong>Keamanan Akun</strong> — Anda bertanggung jawab penuh atas
            keamanan kredensial akun Anda (email dan kata sandi). Segera
            laporkan jika terjadi akses tidak sah.
          </li>
          <li>
            <strong>Satu Akun</strong> — Setiap pengguna hanya diperbolehkan
            memiliki satu akun aktif. Pembuatan akun ganda dapat mengakibatkan
            penangguhan seluruh akun.
          </li>
          <li>
            <strong>Verifikasi</strong> — SIBITA berhak memverifikasi identitas
            Anda melalui email institusi atau metode verifikasi lain yang
            ditetapkan.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "hak-kewajiban-pengguna",
    icon: (
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
    ),
    title: "Hak dan Kewajiban Pengguna",
    content: (
      <>
        <div className="tos-dual-grid">
          <div className="tos-dual-card tos-rights-card">
            <div className="tos-dual-header">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <h4>Hak Pengguna</h4>
            </div>
            <ul>
              <li>Mengakses dan menggunakan seluruh fitur Platform sesuai peran yang ditetapkan</li>
              <li>Mengunggah, menyimpan, dan mengelola dokumen tugas akhir</li>
              <li>Berkomunikasi dengan dosen pembimbing melalui fitur konsultasi</li>
              <li>Melacak progres bimbingan melalui timeline 16 tahapan</li>
              <li>Mengakses dan mengunduh referensi jurnal yang tersedia</li>
              <li>Memperbarui informasi profil dan preferensi akun</li>
            </ul>
          </div>
          <div className="tos-dual-card tos-obligations-card">
            <div className="tos-dual-header">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                <path
                  d="M12 9v4M12 17h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <h4>Kewajiban Pengguna</h4>
            </div>
            <ul>
              <li>Menggunakan Platform sesuai tujuan akademik yang semestinya</li>
              <li>Menjaga kerahasiaan kredensial akun pribadi</li>
              <li>Mengunggah konten yang orisinal dan tidak melanggar hak cipta</li>
              <li>Menghormati privasi dan hak pengguna lain di Platform</li>
              <li>Mematuhi seluruh peraturan akademik institusi yang berlaku</li>
              <li>Melaporkan kesalahan, bug, atau potensi pelanggaran keamanan</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "penggunaan-terlarang",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m4.93 4.93 14.14 14.14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Penggunaan Terlarang",
    content: (
      <>
        <p>
          Pengguna dilarang keras melakukan tindakan berikut saat menggunakan
          Platform SIBITA:
        </p>
        <div className="tos-prohibited-grid">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M13 2v7h7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              ),
              title: "Plagiarisme",
              desc: "Mengunggah karya tulis yang merupakan plagiat atau mengklaim karya orang lain sebagai milik sendiri.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
              title: "Akses Ilegal",
              desc: "Mencoba mengakses akun pengguna lain, data yang tidak diotorisasi, atau sistem backend Platform.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m15 9-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
              title: "Penyalahgunaan",
              desc: "Menggunakan Platform untuk tujuan selain bimbingan tugas akhir, termasuk kegiatan komersial atau ilegal.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
              title: "Gangguan Sistem",
              desc: "Mengirim spam, malware, atau melakukan tindakan yang dapat mengganggu stabilitas dan keamanan Platform.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m23 21-3-3m1-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
              title: "Pemalsuan Identitas",
              desc: "Membuat akun dengan identitas palsu, menggunakan identitas orang lain, atau menyamar sebagai pengguna lain.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m17 8-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: "Konten Terlarang",
              desc: "Mengunggah konten yang bersifat SARA, pornografi, kekerasan, atau melanggar hukum yang berlaku.",
            },
          ].map((item) => (
            <div key={item.title} className="tos-prohibited-item">
              <div className="tos-prohibited-icon">{item.icon}</div>
              <div>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="tos-warning-banner">
          <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 shrink-0">
            <path
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span>
            Pelanggaran terhadap ketentuan di atas dapat mengakibatkan
            penangguhan akun sementara, penonaktifan akun permanen, atau
            pelaporan ke pihak institusi dan/atau otoritas hukum yang berwenang.
          </span>
        </div>
      </>
    ),
  },
  {
    id: "hak-kekayaan-intelektual",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14.5 9a3.5 3.5 0 1 0 0 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Hak Kekayaan Intelektual",
    content: (
      <>
        <div className="privacy-share-list">
          <li>
            <strong>Kepemilikan Platform:</strong> Seluruh hak kekayaan
            intelektual atas Platform SIBITA, termasuk desain, kode sumber,
            logo, dan merek dagang, merupakan milik eksklusif pengelola SIBITA
            dan dilindungi oleh hukum yang berlaku.
          </li>
          <li>
            <strong>Konten Pengguna:</strong> Anda mempertahankan kepemilikan
            atas konten yang Anda buat dan unggah ke Platform, termasuk dokumen
            tugas akhir, catatan bimbingan, dan materi akademik lainnya.
          </li>
          <li>
            <strong>Lisensi Terbatas:</strong> Dengan mengunggah konten, Anda
            memberikan lisensi non-eksklusif kepada SIBITA untuk menyimpan,
            menampilkan, dan memproses konten tersebut sejauh diperlukan untuk
            menyediakan Layanan.
          </li>
          <li>
            <strong>Referensi Jurnal:</strong> Referensi jurnal yang tersedia di
            Platform tunduk pada hak cipta penerbit masing-masing. Penggunaan
            referensi harus sesuai dengan ketentuan fair use dan peraturan hak
            cipta yang berlaku.
          </li>
        </div>
      </>
    ),
  },
  {
    id: "layanan-platform",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Ketersediaan Layanan",
    content: (
      <>
        <p>SIBITA berupaya menyediakan layanan yang andal dan tersedia, dengan ketentuan berikut:</p>
        <ol className="privacy-numbered-list">
          <li>
            <strong>Ketersediaan</strong> — Kami berusaha menjaga Platform
            tersedia 24/7, namun tidak menjamin ketersediaan tanpa gangguan.
            Pemeliharaan terjadwal akan diinformasikan sebelumnya.
          </li>
          <li>
            <strong>Modifikasi Layanan</strong> — SIBITA berhak mengubah,
            memperbarui, atau menghentikan fitur tertentu dari Platform dengan
            pemberitahuan yang wajar kepada pengguna.
          </li>
          <li>
            <strong>Dukungan Teknis</strong> — Dukungan teknis tersedia pada
            jam kerja melalui email dan pusat bantuan di Platform. Kami
            berupaya merespons dalam 1×24 jam pada hari kerja.
          </li>
          <li>
            <strong>Backup Data</strong> — SIBITA secara rutin melakukan
            pencadangan data, namun pengguna disarankan untuk menyimpan salinan
            cadangan dokumen penting secara mandiri.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "batasan-tanggung-jawab",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Batasan Tanggung Jawab",
    content: (
      <>
        <p>
          SIBITA menyediakan Platform &quot;sebagaimana adanya&quot; (as is).
          Dalam batas maksimum yang diizinkan oleh hukum:
        </p>
        <div className="privacy-share-list">
          <li>
            <strong>Tidak Ada Jaminan Hasil:</strong> SIBITA tidak menjamin
            bahwa penggunaan Platform akan menghasilkan kelulusan tugas akhir.
            Keberhasilan akademik bergantung pada usaha mahasiswa dan proses
            bimbingan.
          </li>
          <li>
            <strong>Konten Pengguna:</strong> SIBITA tidak bertanggung jawab
            atas keakuratan, kualitas, atau legalitas konten yang diunggah oleh
            pengguna.
          </li>
          <li>
            <strong>Kerusakan Tidak Langsung:</strong> SIBITA tidak bertanggung
            jawab atas kerusakan tidak langsung, insidental, atau konsekuensial
            yang timbul dari penggunaan atau ketidakmampuan menggunakan
            Platform.
          </li>
          <li>
            <strong>Force Majeure:</strong> SIBITA tidak bertanggung jawab atas
            kegagalan atau keterlambatan layanan yang disebabkan oleh
            keadaan di luar kendali kami, termasuk bencana alam, gangguan
            jaringan, atau kebijakan pemerintah.
          </li>
        </div>
      </>
    ),
  },
  {
    id: "penangguhan-akun",
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
          d="m17 11 5 5M22 11l-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Penangguhan & Penghentian Akun",
    content: (
      <>
        <p>SIBITA berhak menangguhkan atau menghentikan akun Pengguna dalam kondisi berikut:</p>
        <div className="privacy-protection-grid">
          <div className="privacy-protection-item">
            <div className="tos-suspend-icon tos-suspend-warning">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <strong>Penangguhan Sementara</strong>
              <p>
                Dilakukan jika terdeteksi aktivitas mencurigakan, pelanggaran
                ringan, atau untuk keperluan investigasi. Akun dapat
                dipulihkan setelah klarifikasi.
              </p>
            </div>
          </div>
          <div className="privacy-protection-item">
            <div className="tos-suspend-icon tos-suspend-danger">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="m15 9-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <strong>Penghentian Permanen</strong>
              <p>
                Dilakukan jika terjadi pelanggaran berat, penggunaan terlarang
                berulang, atau atas permintaan institusi pendidikan terkait.
                Data akan diproses sesuai Kebijakan Privasi.
              </p>
            </div>
          </div>
          <div className="privacy-protection-item">
            <div className="tos-suspend-icon tos-suspend-info">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M22 11h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <strong>Penghentian oleh Pengguna</strong>
              <p>
                Anda dapat mengajukan permohonan penghentian akun kapan saja
                melalui email admin. Data akan dihapus sesuai masa retensi
                yang berlaku.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "hukum-berlaku",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 3 2 7l10 4 10-4-10-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 4 10-4M2 12l10 4 10-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Hukum yang Berlaku",
    content: (
      <>
        <p>
          Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum
          Republik Indonesia. Apabila terjadi perselisihan terkait Ketentuan
          ini:
        </p>
        <ol className="privacy-numbered-list">
          <li>
            <strong>Penyelesaian Musyawarah</strong> — Para pihak akan terlebih
            dahulu berupaya menyelesaikan perselisihan secara musyawarah dan
            mufakat dalam jangka waktu 30 hari kalender.
          </li>
          <li>
            <strong>Mediasi</strong> — Jika musyawarah tidak tercapai, para
            pihak dapat menunjuk mediator independen yang disepakati bersama.
          </li>
          <li>
            <strong>Pengadilan</strong> — Sebagai upaya terakhir, perselisihan
            akan diselesaikan melalui Pengadilan Negeri yang berwenang di
            wilayah Yogyakarta, Indonesia.
          </li>
        </ol>
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
          Untuk pertanyaan, saran, atau keluhan terkait Syarat dan Ketentuan
          ini, silakan hubungi kami melalui:
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
            <span>sibita@google.com</span>
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
            <span>Jl. Kaliurang, Yogyakarta</span>
          </div>
          <div className="privacy-contact-row">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
            <span>0000000000</span>
          </div>
        </div>
        <p>
          Kami akan merespons pertanyaan Anda dalam waktu maksimal 14 hari
          kerja.
        </p>
      </>
    ),
  },
] as const;

export default function SyaratKetentuanPage() {
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
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2v6h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              Syarat &amp; Ketentuan
            </div>
            <h1 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-0.01em] text-white mb-4">
              Aturan Penggunaan{" "}
              <span className="bg-linear-to-r from-[#8FE3C0] to-[#6FE3A6] bg-clip-text text-transparent">
                Platform SIBITA
              </span>
            </h1>
            <p className="text-[15.5px] text-white/70 leading-[1.65] max-w-130 mx-auto">
              Pahami hak, kewajiban, dan ketentuan yang berlaku saat menggunakan
              Sistem Bimbingan Tugas Akhir untuk pengalaman yang optimal.
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

        {/* Cross-link to privacy policy */}
        <div className="tos-crosslink-wrapper">
          <Link href="/kebijakan-privasi" className="tos-crosslink">
            <div className="tos-crosslink-icon">
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
            <div className="tos-crosslink-text">
              <strong>Kebijakan Privasi</strong>
              <span>Pelajari bagaimana kami melindungi data pribadi Anda →</span>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
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
