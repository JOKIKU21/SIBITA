export default function FeaturesSection() {
  return (
    <section className="features">
      <div className="features-head">
        <span className="features-eyebrow">Fitur Utama</span>
        <h2>Semua yang Kamu Butuhkan untuk Menyelesaikan Skripsi</h2>
        <p className="sub">Satu platform untuk melacak progres, menyimpan referensi, dan berkoordinasi dengan dosen pembimbing — dari diskusi konsep sampai ujian akhir.</p>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 5h13l3 3-3 3H4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3>Timeline 16 Tahapan</h3>
          <p>Lacak seluruh tahapan tugas akhir dalam satu tampilan visual yang jelas, lengkap dengan status, progres, dan tenggat waktu setiap tahap secara real-time.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12h6M9 16h6M9 8h2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <h3>Referensi Jurnal</h3>
          <p>Cari, simpan, dan kelola referensi jurnal ilmiah dari Scopus, SINTA, dan DOAJ, lengkap dengan generator sitasi APA, IEEE, dan Harvard.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
          <h3>Konsultasi Terstruktur</h3>
          <p>Dokumentasikan setiap sesi bimbingan dengan dosen pembimbing, catat masukan, lacak revisi, dan kelola persetujuan secara digital.</p>
        </div>
      </div>
    </section>
  );
}
