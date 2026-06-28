"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { verifyEmailOTP, sendEmailOTP } from "@/lib/services/auth.service";

function VerifikasiForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  function handleInputChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return; // digits only

    const next = [...otp];
    next[index] = value.slice(-1); // only last digit
    setOtp(next);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const next = [...otp];
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] ?? "";
    }
    setOtp(next);

    // Focus last filled or last input
    const lastIndex = Math.min(pasted.length, 5);
    inputRefs.current[lastIndex]?.focus();
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }

    if (!email) {
      setError("Email tidak ditemukan. Silakan daftar ulang.");
      return;
    }

    setError("");
    setLoading(true);

    const result = await verifyEmailOTP(email, code);

    if (result.success) {
      setSuccess("Email berhasil diverifikasi! Mengalihkan...");
      setTimeout(() => router.push("/masuk"), 1500);
    } else {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0 || !email) return;

    setError("");
    setResendCooldown(60);

    const result = await sendEmailOTP(email, "email-verification");

    if (result.success) {
      setSuccess("Kode OTP baru telah dikirim ke email Anda");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(result.error);
    }
  }

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

        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px", lineHeight: "1.6" }}>
          Kami telah mengirimkan kode OTP 6 digit ke email:
        </p>
        {email && (
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--blue-primary)", marginBottom: "24px" }}>
            {email}
          </p>
        )}

        {error && (
          <div className="auth-error" role="alert">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success" role="status">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} style={{ textAlign: "left" }}>
          <div className="form-group">
            <label htmlFor="otp-0" style={{ textAlign: "center" }}>Kode OTP</label>
            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  id={`otp-${i}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={loading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-login"
            style={{ marginTop: "16px" }}
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? "Memverifikasi..." : "Verifikasi Akun"}
          </button>
        </form>

        <p className="back-link" style={{ marginTop: "24px" }}>
          Belum menerima email?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            style={{
              background: "none",
              border: "none",
              color: resendCooldown > 0 ? "var(--text-light)" : "var(--blue-primary)",
              fontWeight: 600,
              cursor: resendCooldown > 0 ? "default" : "pointer",
              padding: 0,
              font: "inherit",
            }}
          >
            {resendCooldown > 0 ? `Kirim Ulang (${resendCooldown}s)` : "Kirim Ulang"}
          </button>
          <br /><br />
          Kembali ke <Link href="/daftar">Pendaftaran</Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifikasiPage() {
  return (
    <Suspense fallback={
      <div className="login-page">
        <div className="login-card" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Memuat...</p>
        </div>
      </div>
    }>
      <VerifikasiForm />
    </Suspense>
  );
}
