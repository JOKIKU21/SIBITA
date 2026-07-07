"use client";

// ponytail: profil admin with form inputs
import { useState } from "react";
import { ADMIN_PROFILE } from "@/lib/admin-data";

export default function ProfilAdminPage() {
  const [nama, setNama] = useState(ADMIN_PROFILE.nama);
  const [email, setEmail] = useState(ADMIN_PROFILE.email);

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Profil & Akun</h2>
          <p className="text-3.5 text-neutral-muted">Kelola informasi akun dan data diri Anda.</p>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-5.5 items-start max-[900px]:grid-cols-1">
          {/* Data Diri */}
          <div className="bg-white border border-neutral-border rounded-4 p-6.5">
            <h3 className="font-display text-[15px] font-extrabold mb-5 pb-3 border-b border-neutral-border">Data Diri</h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-8 font-bold text-white overflow-hidden">
                  {nama.charAt(0).toUpperCase()}
                </div>
                <label className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-brand border-2 border-white flex items-center justify-center cursor-pointer" title="Ganti foto">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                  <input type="file" accept="image/*" className="hidden" onChange={() => alert("Upload foto!")} />
                </label>
              </div>
              <div>
                <div className="font-display text-[16px] font-extrabold text-neutral-text">{nama}</div>
                <div className="text-[13px] text-neutral-muted">Admin</div>
                <button
                  type="button"
                  className="mt-1.5 text-[12px] text-brand font-semibold bg-transparent border border-neutral-border rounded-1.75 py-1 px-3 cursor-pointer hover:bg-brand-bg transition-colors duration-150"
                  onClick={() => alert("Ganti foto!")}
                >
                  Ganti Foto
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-neutral-muted">Nama Lengkap</label>
                <input
                  className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-neutral-muted">Email</label>
                <input
                  className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                className="bg-brand text-white border-none py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold cursor-pointer transition-[background] duration-200 hover:bg-brand-dark"
                onClick={() => alert("Profil berhasil disimpan!")}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>

          {/* Ubah Password */}
          <div className="bg-white border border-neutral-border rounded-4 p-6.5">
            <h3 className="font-display text-[15px] font-extrabold mb-5 pb-3 border-b border-neutral-border">Ubah Password</h3>
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-neutral-muted">Password Lama</label>
                <input
                  className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-neutral-muted">Password Baru</label>
                <input
                  className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                  type="password"
                  placeholder="Minimal 8 karakter"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-neutral-muted">Konfirmasi Password Baru</label>
                <input
                  className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                  type="password"
                  placeholder="Ulangi password baru"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-brand text-white border-none py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold cursor-pointer transition-[background] duration-200 hover:bg-brand-dark"
                onClick={() => alert("Password berhasil diubah!")}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
