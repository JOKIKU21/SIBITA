import Link from "next/link";

export default function VerifikasiPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#2B3BAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#2B3BAF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="login-title">Verifikasi Email</h1>
        
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.6" }}>
          Kami telah mengirimkan kode OTP 6 digit ke email Anda. Silakan masukkan kode tersebut di bawah ini.
        </p>

        <form style={{ textAlign: "left" }}>
          <div className="form-group">
            <label htmlFor="otp" style={{ textAlign: "center" }}>Kode OTP</label>
            <input 
              className="form-input" 
              type="text" 
              id="otp" 
              maxLength={6}
              placeholder="000000" 
              style={{ 
                textAlign: "center", 
                letterSpacing: "8px", 
                fontSize: "18px", 
                fontWeight: "bold" 
              }} 
            />
          </div>

          <Link href="/dashboard" className="btn-login" style={{ marginTop: "16px" }}>
            Verifikasi Akun
          </Link>
        </form>

        <p className="back-link" style={{ marginTop: "24px" }}>
          Belum menerima email? <a href="#" style={{ color: "var(--blue-primary)", fontWeight: 600 }}>Kirim Ulang</a>
          <br /><br />
          Kembali ke <Link href="/daftar">Pendaftaran</Link>
        </p>
      </div>
    </div>
  );
}
