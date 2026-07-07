"use client";

// ponytail: admin ringkasan table with inline edit for name & email
import { useState } from "react";
import Link from "next/link";
import { ADMIN_LIST, type AdminItem } from "@/lib/superadmin-data";

export function AdminRingkasanTable() {
  const [admins, setAdmins] = useState<AdminItem[]>(ADMIN_LIST);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editEmail, setEditEmail] = useState("");

  function startEdit(admin: AdminItem) {
    setEditingId(admin.id);
    setEditNama(admin.nama);
    setEditEmail(admin.email);
  }

  function saveEdit() {
    if (!editingId) return;
    setAdmins(admins.map((a) =>
      a.id === editingId ? { ...a, nama: editNama, email: editEmail } : a
    ));
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Ringkasan Per Admin</h3>
        <Link
          href="/dashboard/superadmin/manajemen-pengguna"
          className="text-[13px] text-brand font-semibold hover:underline"
        >
          Kelola →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
              <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Admin</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const isEditing = editingId === admin.id;
              return (
                <tr key={admin.id} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-linear-to-br ${admin.avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                        {(isEditing ? editNama : admin.nama).charAt(0)}
                      </div>
                      <div>
                        {isEditing ? (
                          <input
                            className="bg-neutral-bg border-[1.5px] border-brand-light rounded-1.5 py-1 px-2.5 text-[13px] font-bold outline-none w-40"
                            value={editNama}
                            onChange={(e) => setEditNama(e.target.value)}
                            autoFocus
                          />
                        ) : (
                          <>
                            <div className="text-[13.5px] font-bold text-neutral-text">{admin.nama}</div>
                            <div className="text-[11.5px] text-neutral-muted">Admin Utama</div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {isEditing ? (
                      <input
                        className="bg-neutral-bg border-[1.5px] border-brand-light rounded-1.5 py-1 px-2.5 text-[13px] outline-none w-52"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    ) : (
                      <span className="text-[13px] text-neutral-muted">{admin.email}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[12px] font-bold text-success">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      Aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={saveEdit}
                          className="bg-brand text-white text-[11.5px] font-bold py-1.5 px-3 rounded-1.5 border-none cursor-pointer hover:bg-brand-dark transition-colors duration-150"
                        >
                          Simpan
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="bg-transparent text-neutral-muted text-[11.5px] font-bold py-1.5 px-3 rounded-1.5 border border-neutral-border cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(admin)}
                        className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-1.5 px-3.5 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
