export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-premium-inner">
        {/* Brand & Tagline */}
        <div className="footer-col-brand">
          <div className="footer-brand">
            <span className="footer-brand-mark">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            SIBITA
          </div>
          <p className="footer-desc">
            Sistem Bimbingan Tugas Akhir platform terintegrasi yang membantu mahasiswa dan dosen menyelesaikan skripsi dengan proses yang lebih cepat, rapi, dan terstruktur.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="footer-col-links">
          <h4 className="footer-heading">Eksplorasi</h4>
          <ul>
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Panduan Skripsi</a></li>
            <li><a href="#">Cari Jurnal</a></li>
            <li><a href="#">FAQ Mahasiswa</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="footer-col-links">
          <h4 className="footer-heading">Layanan</h4>
          <ul>
            <li><a href="#">Pusat Bantuan</a></li>
            <li><a href="#">Syarat & Ketentuan</a></li>
            <li><a href="#">Kebijakan Privasi</a></li>
            <li><a href="#">Hubungi Admin</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col-contact">
          <h4 className="footer-heading">Hubungi Kami</h4>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>Jl.Kaliurang Yogyakarta </span>
          </div>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>0000000000</span>
          </div>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>sibita@google.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-premium-bottom">
        <div className="fp-bottom-inner">
          <span>&copy; 2026 SIBITA</span>
        </div>
      </div>
    </footer>
  );
}
