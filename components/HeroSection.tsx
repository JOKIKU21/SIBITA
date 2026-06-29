import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>Selesaikan Skripsi Lebih Cepat dengan <span className="accent">Bimbingan Terstruktur</span></h1>
          <p>SIBITA membantu mahasiswa melacak setiap tahapan tugas akhir, dari diskusi konsep hingga ujian akhir, dengan timeline, deadline, dan komunikasi dosen pembimbing dalam satu platform.</p>
          <div className="hero-actions">
            <Link href="/masuk" className="btn-primary-landing">
              Mulai Sekarang
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <button className="btn-outline-landing">Lihat Panduan</button>
          </div>
        </div>

        <div className="hero-visual">
          <svg viewBox="0 0 420 460" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="18" width="376" height="424" rx="22" fill="white" fillOpacity="0.06"/>
            <rect x="22" y="18" width="376" height="424" rx="22" stroke="white" strokeOpacity="0.18"/>
            <rect x="46" y="46" width="328" height="56" rx="12" fill="white" fillOpacity="0.95"/>
            <circle cx="74" cy="74" r="14" fill="#6FE3A6"/>
            <path d="M68 74l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="100" y="64" width="160" height="9" rx="4" fill="#1A2580"/>
            <rect x="100" y="80" width="100" height="7" rx="3" fill="#9CA3AF"/>
            <rect x="46" y="118" width="328" height="56" rx="12" fill="white" fillOpacity="0.95"/>
            <circle cx="74" cy="146" r="14" fill="#2B3BAF"/>
            <text x="74" y="151" fontSize="13" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial">5</text>
            <rect x="100" y="136" width="180" height="9" rx="4" fill="#1A2580"/>
            <rect x="100" y="152" width="120" height="7" rx="3" fill="#9CA3AF"/>
            <rect x="46" y="190" width="328" height="56" rx="12" fill="white" fillOpacity="0.55"/>
            <circle cx="74" cy="218" r="14" fill="white" fillOpacity="0.6"/>
            <text x="74" y="223" fontSize="13" fontWeight="700" fill="#2B3BAF" textAnchor="middle" fontFamily="Arial">6</text>
            <rect x="100" y="208" width="150" height="9" rx="4" fill="white" fillOpacity="0.7"/>
            <rect x="100" y="224" width="90" height="7" rx="3" fill="white" fillOpacity="0.4"/>
            <rect x="46" y="270" width="328" height="120" rx="14" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.16"/>
            <text x="64" y="296" fontSize="12" fontWeight="700" fill="white" fillOpacity="0.8" fontFamily="Arial">PROGRES KESELURUHAN</text>
            <rect x="64" y="308" width="284" height="10" rx="5" fill="white" fillOpacity="0.15"/>
            <rect x="64" y="308" width="167" height="10" rx="5" fill="#6FE3A6"/>
            <text x="64" y="345" fontSize="26" fontWeight="800" fill="white" fontFamily="Arial">59%</text>
            <text x="64" y="368" fontSize="11" fill="white" fillOpacity="0.6" fontFamily="Arial">9 dari 16 tahap selesai</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
