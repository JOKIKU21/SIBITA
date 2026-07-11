"use client";

import { useState } from "react";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role?: string;
}

interface StudentDetail {
  userId: string;
  nim: string;
  studyProgram: string;
  campus: string;
  user: UserInfo;
}

interface FileItem {
  id: string;
  registrationId: string;
  name: string;
  url: string;
  key: string;
  createdAt: string;
}

interface PaymentItem {
  id: string;
  registrationId: string;
  installment: number;
  amount: number;
  status: "paid" | "pending";
  paidAt: string | null;
  files: any[];
}

interface RegistrationItem {
  id: string;
  studentId: string;
  status: "pending" | "approved" | "rejected";
  totalAmount: number;
  paymentOption: "installment" | "full";
  createdAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectedReason?: string | null;
  student: StudentDetail;
  approver?: {
    id: string;
    name: string;
    email: string;
  } | null;
  files: FileItem[];
  payments: PaymentItem[];
}

const INITIAL_REGISTRATIONS: RegistrationItem[] = [
  {
    id: "registration-uuid-111",
    studentId: "student-uuid-1234",
    status: "pending",
    totalAmount: 5000000,
    paymentOption: "installment",
    createdAt: "2026-07-11T01:23:45.000Z",
    approvedBy: null,
    approvedAt: null,
    student: {
      userId: "student-uuid-1234",
      nim: "12345678",
      studyProgram: "Teknik Informatika",
      campus: "Kampus Utama",
      user: {
        id: "student-uuid-1234",
        name: "Ahmad Maulana",
        email: "ahmad.maulana@uin-mataram.ac.id",
        image: null
      }
    },
    files: [
      {
        id: "file-uuid-999",
        registrationId: "registration-uuid-111",
        name: "KRS_Semester_Akhir.pdf",
        url: "#",
        key: "krs.pdf",
        createdAt: "2026-07-11T01:23:45.000Z"
      },
      {
        id: "file-uuid-998",
        registrationId: "registration-uuid-111",
        name: "Bukti_Cicilan_1.jpg",
        url: "#",
        key: "bukti1.jpg",
        createdAt: "2026-07-11T01:23:45.000Z"
      }
    ],
    payments: [
      {
        id: "payment-uuid-222",
        registrationId: "registration-uuid-111",
        installment: 1,
        amount: 2500000,
        status: "paid",
        paidAt: "2026-07-11T01:23:45.000Z",
        files: []
      },
      {
        id: "payment-uuid-333",
        registrationId: "registration-uuid-111",
        installment: 2,
        amount: 2500000,
        status: "pending",
        paidAt: null,
        files: []
      }
    ]
  },
  {
    id: "registration-uuid-222",
    studentId: "student-uuid-5678",
    status: "pending",
    totalAmount: 5000000,
    paymentOption: "full",
    createdAt: "2026-07-10T09:15:30.000Z",
    approvedBy: null,
    approvedAt: null,
    student: {
      userId: "student-uuid-5678",
      nim: "210101105",
      studyProgram: "Sistem Informasi",
      campus: "Kampus Utama",
      user: {
        id: "student-uuid-5678",
        name: "Fina Indriani",
        email: "fina.indri@uin-mataram.ac.id",
        image: null
      }
    },
    files: [
      {
        id: "file-uuid-777",
        registrationId: "registration-uuid-222",
        name: "Bukti_Pembayaran_Lunas.pdf",
        url: "#",
        key: "bukti_lunas.pdf",
        createdAt: "2026-07-10T09:15:30.000Z"
      }
    ],
    payments: [
      {
        id: "payment-uuid-444",
        registrationId: "registration-uuid-222",
        installment: 1,
        amount: 5000000,
        status: "paid",
        paidAt: "2026-07-10T09:15:30.000Z",
        files: []
      }
    ]
  },
  {
    id: "registration-uuid-333",
    studentId: "student-uuid-9999",
    status: "approved",
    totalAmount: 5000000,
    paymentOption: "installment",
    createdAt: "2026-07-08T11:02:11.000Z",
    approvedBy: "admin-uuid-5678",
    approvedAt: "2026-07-10T08:12:02.000Z",
    approver: {
      id: "admin-uuid-5678",
      name: "Admin SIBITA",
      email: "admin@sibita.com"
    },
    student: {
      userId: "student-uuid-9999",
      nim: "210101067",
      studyProgram: "Teknik Informatika",
      campus: "Kampus Utama",
      user: {
        id: "student-uuid-9999",
        name: "Dewi Lestari",
        email: "dewi@mail.com",
        image: null
      }
    },
    files: [
      {
        id: "file-uuid-666",
        registrationId: "registration-uuid-333",
        name: "KRS_Approved.pdf",
        url: "#",
        key: "krs_approved.pdf",
        createdAt: "2026-07-08T11:02:11.000Z"
      }
    ],
    payments: [
      {
        id: "payment-uuid-555",
        registrationId: "registration-uuid-333",
        installment: 1,
        amount: 2500000,
        status: "paid",
        paidAt: "2026-07-08T11:02:11.000Z",
        files: []
      },
      {
        id: "payment-uuid-556",
        registrationId: "registration-uuid-333",
        installment: 2,
        amount: 2500000,
        status: "pending",
        paidAt: null,
        files: []
      }
    ]
  },
  {
    id: "registration-uuid-444",
    studentId: "student-uuid-4444",
    status: "rejected",
    totalAmount: 5000000,
    paymentOption: "installment",
    createdAt: "2026-07-07T10:00:00.000Z",
    approvedBy: "admin-uuid-5678",
    approvedAt: "2026-07-08T15:30:00.000Z",
    rejectedReason: "Bukti transfer tidak terbaca (gambar terlalu blur). Mohon upload ulang bukti pembayaran yang jelas.",
    approver: {
      id: "admin-uuid-5678",
      name: "Admin SIBITA",
      email: "admin@sibita.com"
    },
    student: {
      userId: "student-uuid-4444",
      nim: "210101041",
      studyProgram: "Teknik Informatika",
      campus: "Kampus Utama",
      user: {
        id: "student-uuid-4444",
        name: "Hafiz Rahmat",
        email: "hafiz@mail.com",
        image: null
      }
    },
    files: [
      {
        id: "file-uuid-333",
        registrationId: "registration-uuid-444",
        name: "KRS_Hafiz.pdf",
        url: "#",
        key: "krs_hafiz.pdf",
        createdAt: "2026-07-07T10:00:00.000Z"
      }
    ],
    payments: [
      {
        id: "payment-uuid-111",
        registrationId: "registration-uuid-444",
        installment: 1,
        amount: 2500000,
        status: "pending",
        paidAt: null,
        files: []
      }
    ]
  }
];

export function RegistrasiMahasiswaList() {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>(INITIAL_REGISTRATIONS);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  // Filter registrations by active tab
  const filteredRegs = registrations.filter((reg) => {
    return reg.status === activeTab;
  });

  const handleApprove = (id: string) => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          return {
            ...reg,
            status: "approved" as const,
            approvedBy: "admin-uuid-5678",
            approvedAt: new Date().toISOString(),
            approver: {
              id: "admin-uuid-5678",
              name: "Admin SIBITA",
              email: "admin@sibita.com"
            }
          };
        }
        return reg;
      })
    );
    // If modal is open, update its selection view
    if (selectedReg?.id === id) {
      setSelectedReg(prev => prev ? {
        ...prev,
        status: "approved" as const,
        approvedBy: "admin-uuid-5678",
        approvedAt: new Date().toISOString(),
        approver: {
          id: "admin-uuid-5678",
          name: "Admin SIBITA",
          email: "admin@sibita.com"
        }
      } : null);
    }
  };

  const handleRejectSubmit = () => {
    if (!selectedReg || !rejectReasonInput.trim()) return;

    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === selectedReg.id) {
          return {
            ...reg,
            status: "rejected" as const,
            approvedBy: "admin-uuid-5678",
            approvedAt: new Date().toISOString(),
            rejectedReason: rejectReasonInput,
            approver: {
              id: "admin-uuid-5678",
              name: "Admin SIBITA",
              email: "admin@sibita.com"
            }
          };
        }
        return reg;
      })
    );
    
    setSelectedReg(null);
    setRejectReasonInput("");
    setIsRejecting(false);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-wrap gap-4 items-center justify-start shadow-sm">
        <div className="flex gap-1.5 bg-neutral-bg p-1.25 rounded-2.75">
          {(["pending", "approved", "rejected"] as const).map((tab) => {
            const count = registrations.filter(r => r.status === tab).length;
            const label = tab === "pending" ? "Menunggu" : tab === "approved" ? "Disetujui" : "Ditolak";
            const tabColor = tab === "pending" ? "text-warning bg-warning-bg" : tab === "approved" ? "text-success bg-success-bg" : "text-danger bg-danger-bg";
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-2.25 text-[13px] font-bold cursor-pointer transition-colors duration-150 flex items-center gap-2 border-none ${
                  activeTab === tab
                    ? "bg-white text-neutral-text shadow-sm"
                    : "text-neutral-muted hover:text-neutral-text bg-transparent"
                }`}
              >
                <span>{label}</span>
                <span className={`inline-flex items-center justify-center text-[11px] font-extrabold w-5 h-5 rounded-full ${
                  activeTab === tab ? tabColor : "bg-neutral-light/20 text-neutral-muted"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden shadow-sm">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
            Daftar Registrasi Mahasiswa
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Tanggal Pengajuan</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Metode Pembayaran</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Total Pembayaran</th>
                {activeTab === "rejected" && (
                  <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Alasan Penolakan</th>
                )}
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegs.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150"
                >
                  {/* Mahasiswa */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-brand-light to-brand flex items-center justify-center text-[13px] font-bold text-white shrink-0">
                        {reg.student.user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{reg.student.user.name}</div>
                        <div className="text-[11.5px] text-neutral-muted">NIM {reg.student.nim}</div>
                      </div>
                    </div>
                  </td>

                  {/* Prodi */}
                  <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">
                    {reg.student.studyProgram}
                  </td>

                  {/* Tanggal Pengajuan */}
                  <td className="py-3.5 px-4 text-[13px] text-neutral-muted">
                    {formatDate(reg.createdAt)}
                  </td>

                  {/* Metode Pembayaran */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center text-[11.5px] font-bold py-0.5 px-2 rounded-md ${
                      reg.paymentOption === "full"
                        ? "bg-success-bg text-success"
                        : "bg-warning-bg text-warning"
                    }`}>
                      {reg.paymentOption === "full" ? "Lunas" : "Cicilan"}
                    </span>
                  </td>

                  {/* Jumlah Pembayaran */}
                  <td className="py-3.5 px-4 text-[13px] font-bold text-neutral-text">
                    {formatRupiah(reg.totalAmount)}
                  </td>

                  {/* Rejected Reason */}
                  {activeTab === "rejected" && (
                    <td className="py-3.5 px-4 text-[12.5px] text-danger max-w-50 truncate" title={reg.rejectedReason || ""}>
                      {reg.rejectedReason}
                    </td>
                  )}

                  {/* Aksi */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedReg(reg)}
                        className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                      >
                        Detail
                      </button>
                      
                      {reg.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(reg.id)}
                            className="bg-success text-white border-none text-[12.5px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-success-dark transition-colors duration-150"
                          >
                            Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedReg(reg);
                              setIsRejecting(true);
                            }}
                            className="bg-danger text-white border-none text-[12.5px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-danger-dark transition-colors duration-150"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRegs.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === "rejected" ? 7 : 6}
                    className="py-12 text-center text-[13.5px] text-neutral-muted"
                  >
                    Tidak ada pendaftaran dengan status ini.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Action Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-border rounded-3.5 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border shrink-0">
              <h3 className="font-display text-[15.5px] font-extrabold text-neutral-text">
                {isRejecting ? "Tolak Registrasi Mahasiswa" : "Detail Pengajuan Registrasi"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedReg(null);
                  setIsRejecting(false);
                  setRejectReasonInput("");
                }}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
              {isRejecting ? (
                <div className="flex flex-col gap-3">
                  <div className="bg-danger-bg text-danger text-[13px] py-3 px-4 rounded-2.5 font-medium">
                    Anda sedang menolak pengajuan pendaftaran untuk mahasiswa: <strong>{selectedReg.student.user.name}</strong>.
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Alasan Penolakan <span className="text-danger">*</span>
                    </label>
                    <textarea
                      placeholder="Tulis alasan penolakan secara detail agar dapat dibaca oleh mahasiswa..."
                      value={rejectReasonInput}
                      onChange={(e) => setRejectReasonInput(e.target.value)}
                      rows={4}
                      className="w-full bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.5 p-3 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-danger"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Student Info Section */}
                  <div>
                    <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2.5">Data Mahasiswa</h4>
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 max-[500px]:grid-cols-1">
                      <div>
                        <div className="text-[12px] text-neutral-muted">Nama Lengkap</div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{selectedReg.student.user.name}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">NIM</div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{selectedReg.student.nim}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Program Studi</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.studyProgram}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Perguruan Tinggi</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.campus}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Email</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.user.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Section */}
                  <div className="border-t border-neutral-border pt-4.5">
                    <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2.5">Rincian Pembayaran</h4>
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 max-[500px]:grid-cols-1 mb-4">
                      <div>
                        <div className="text-[12px] text-neutral-muted">Pilihan Metode</div>
                        <div className="text-[13.5px] font-bold text-neutral-text">
                          {selectedReg.paymentOption === "full" ? "Pembayaran Lunas (Full)" : "Pembayaran Cicilan (Installment)"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Status Pengajuan</div>
                        <div className="text-[13.5px] font-bold mt-0.5">
                          <span className={`inline-flex items-center gap-1 text-[12px] py-0.5 px-2.5 rounded-full ${
                            selectedReg.status === "pending"
                              ? "bg-warning-bg text-warning"
                              : selectedReg.status === "approved"
                              ? "bg-success-bg text-success"
                              : "bg-danger-bg text-danger"
                          }`}>
                            {selectedReg.status === "pending" ? "Menunggu Persetujuan" : selectedReg.status === "approved" ? "Disetujui" : "Ditolak"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Total Biaya Registrasi</div>
                        <div className="text-[13.5px] font-bold text-brand">{formatRupiah(selectedReg.totalAmount)}</div>
                      </div>
                    </div>
                    
                    <div className="text-[12.5px] font-bold text-neutral-muted mb-2">Riwayat Termin Pembayaran:</div>
                    <div className="flex flex-col gap-2">
                      {selectedReg.payments.map((p) => (
                        <div key={p.id} className="flex justify-between items-center bg-neutral-bg/50 p-2.5 rounded-2 text-[12.5px] border border-neutral-border">
                          <div>
                            <span className="font-bold text-neutral-text">Termin #{p.installment}</span>
                            <span className="text-neutral-muted ml-2">({formatRupiah(p.amount)})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center text-[10.5px] font-bold py-0.5 px-2 rounded-md ${
                              p.status === "paid" ? "bg-success-bg text-success" : "bg-warning-bg text-warning"
                            }`}>
                              {p.status === "paid" ? "Lunas" : "Belum Bayar"}
                            </span>
                            {p.paidAt && <span className="text-[11px] text-neutral-muted">{formatDate(p.paidAt)}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="border-t border-neutral-border pt-4.5">
                    <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2.5">Berkas Pendukung</h4>
                    <div className="flex flex-col gap-2.5">
                      {selectedReg.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-neutral-bg border border-neutral-border rounded-2.5 hover:bg-neutral-bg/60 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-neutral-muted shrink-0">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[13px] font-semibold text-neutral-text truncate">{file.name}</span>
                          </div>
                          <a
                            href={file.url}
                            onClick={(e) => { e.preventDefault(); alert(`Mengunduh berkas: ${file.name}`); }}
                            className="text-[12.5px] text-brand font-bold hover:underline shrink-0 pl-4"
                          >
                            Unduh
                          </a>
                        </div>
                      ))}
                      {selectedReg.files.length === 0 && (
                        <div className="text-[13px] text-neutral-muted italic">Tidak ada berkas yang diunggah.</div>
                      )}
                    </div>
                  </div>

                  {/* Rejected Details (if rejected) */}
                  {selectedReg.status === "rejected" && selectedReg.rejectedReason && (
                    <div className="border-t border-neutral-border pt-4.5">
                      <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2">Informasi Penolakan</h4>
                      <div className="p-3.5 bg-danger-bg/50 border border-danger/10 text-danger rounded-2.5 text-[13px] font-medium leading-relaxed">
                        <div className="text-[11px] uppercase tracking-wider font-extrabold mb-1 opacity-75">Alasan Penolakan:</div>
                        {selectedReg.rejectedReason}
                      </div>
                      {selectedReg.approver && (
                        <div className="text-[11.5px] text-neutral-muted mt-2 text-right">
                          Ditolak oleh: <strong>{selectedReg.approver.name}</strong> ({selectedReg.approver.email})
                        </div>
                      )}
                    </div>
                  )}

                  {/* Approved Details (if approved) */}
                  {selectedReg.status === "approved" && selectedReg.approvedAt && (
                    <div className="border-t border-neutral-border pt-4.5">
                      <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2">Informasi Persetujuan</h4>
                      <div className="p-3.5 bg-success-bg/40 border border-success/10 text-success rounded-2.5 text-[13px] font-medium">
                        Disetujui pada {formatDate(selectedReg.approvedAt)}
                      </div>
                      {selectedReg.approver && (
                        <div className="text-[11.5px] text-neutral-muted mt-2 text-right">
                          Disetujui oleh: <strong>{selectedReg.approver.name}</strong> ({selectedReg.approver.email})
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-border shrink-0 flex justify-end gap-3 bg-neutral-bg/30">
              {isRejecting ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRejecting(false);
                      setRejectReasonInput("");
                    }}
                    className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectSubmit}
                    disabled={!rejectReasonInput.trim()}
                    className={`text-white border-none text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer transition-colors duration-150 ${
                      rejectReasonInput.trim() ? "bg-danger hover:bg-danger-dark" : "bg-neutral-light cursor-not-allowed"
                    }`}
                  >
                    Kirim Penolakan
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedReg(null)}
                    className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                  >
                    Tutup
                  </button>
                  
                  {selectedReg.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRejecting(true);
                        }}
                        className="bg-danger text-white border-none text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-danger-dark transition-colors duration-150"
                      >
                        Tolak Pendaftaran
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(selectedReg.id)}
                        className="bg-success text-white border-none text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-success-dark transition-colors duration-150"
                      >
                        Setujui Pendaftaran
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
