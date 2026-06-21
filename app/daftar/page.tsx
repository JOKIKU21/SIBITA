import Link from "next/link";

export default function DaftarPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="#2B3BAF" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="#2B3BAF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="login-title">Daftar Akun SIBITA</h1>

        <form style={{ textAlign: "left" }}>
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input className="form-input" type="text" id="nama" placeholder="Masukkan nama lengkap" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-input" type="email" id="email" placeholder="nama@gmail.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <input className="form-input" type="password" id="password" placeholder="Buat password" />
              <button className="eye-btn" type="button" title="Tampilkan password">👁</button>
            </div>
          </div>

          <Link href="/verifikasi" className="btn-login">Daftar Sekarang</Link>
        </form>

        <div className="divider">Atau Daftar dengan</div>

        <button className="google-btn" type="button">
          <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Daftar dengan Google
        </button>

        <p className="back-link">
          Sudah punya akun? <Link href="/masuk">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
