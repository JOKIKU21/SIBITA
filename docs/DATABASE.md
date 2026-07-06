# Database Documentation

Dokumen ini menjelaskan fungsi setiap tabel pada sistem manajemen skripsi beserta hubungan antar tabel.

---

# Entity Relationship Overview

```
User
├── Student Profile
│   ├── Student Progress
│   ├── Registration
│   │   ├── Registration Payment
│   │   └── Registration File
│   ├── Stage Note
│   ├── Stage File
│   └── Chat Message
│
├── Lecturer Profile
│
├── Session
└── Account

Thesis Stage
├── Student Progress
├── Stage Note
└── Stage File

Reference File
```

---

# User

Menyimpan seluruh akun pengguna pada sistem. Semua pengguna (Admin, Super Admin, Dosen, dan Mahasiswa) menggunakan tabel ini sebagai identitas utama.

## Fields

| Field | Description |
|--------|-------------|
| id | Primary key user |
| name | Nama pengguna |
| email | Email login |
| email_verified | Status verifikasi email |
| image | Foto profil |
| phone_number | Nomor telepon |
| role | Hak akses pengguna |
| created_at | Waktu dibuat |
| updated_at | Waktu diperbarui |

## Relations

- One to One → Student Profile
- One to One → Lecturer Profile
- One to Many → Session
- One to Many → Account
- One to Many → Chat Message (sender)
- One to Many → Registration (approver)
- One to Many → Student Profile (advisor)

---

# Student Profile

Menyimpan informasi akademik mahasiswa.

## Fields

- user_id
- campus
- nim
- study_program
- education
- status
- advisor_id
- created_at
- updated_at

## Relations

Belongs To

- User

References

- Advisor → User

Has One

- Student Progress

Has Many

- Stage Note
- Stage File
- Chat Message
- Registration

---

# Lecturer Profile

Menyimpan informasi dosen.

## Relations

Belongs To

- User

---

# Student Progress

Menyimpan progres keseluruhan skripsi mahasiswa.

Satu mahasiswa hanya memiliki satu data progress.

## Relations

Belongs To

- Student Profile
- Thesis Stage (current stage)

---

# Thesis Stage

Master data tahapan skripsi.

Berisi 17 tahapan proses skripsi.

Contoh:

1. Pengajuan Judul
2. Seminar Proposal
3. Penelitian
4. Sidang
5. Revisi
6. Lulus

## Relations

Has Many

- Student Progress
- Stage Note
- Stage File

---

# Stage Note

Catatan mahasiswa pada setiap tahapan skripsi.

Kolom `data` menggunakan JSON sehingga setiap tahapan dapat memiliki struktur data yang berbeda.

## Relations

Belongs To

- Student Profile
- Thesis Stage

---

# Stage File

Menyimpan file yang diupload mahasiswa pada setiap tahapan skripsi.

Contoh file:

- Proposal
- BAB 1
- BAB 2
- Jurnal
- Surat

## Relations

Belongs To

- Student Profile
- Thesis Stage

---

# Chat Message

Percakapan antara mahasiswa dan dosen pembimbing.

Pesan dapat berupa:

- Text
- Attachment

## Relations

Belongs To

- Student Profile
- User (sender)

---

# Registration

Data pendaftaran mahasiswa baru.

Status:

- Pending
- Approved
- Rejected

## Relations

Belongs To

- Student Profile
- User (approver)

Has Many

- Registration Payment
- Registration File

---

# Registration Payment

Riwayat pembayaran pendaftaran.

Satu registrasi dapat memiliki beberapa pembayaran apabila menggunakan cicilan.

## Relations

Belongs To

- Registration

Has Many

- Registration File (payment proof)

---

# Registration File

Dokumen yang diupload saat proses pendaftaran.

Jenis dokumen:

- UKT
- Contract
- Payment Proof

## Relations

Belongs To

- Registration

Optional Belongs To

- Registration Payment

---

# Reference File

Master file referensi yang dapat diakses mahasiswa.

Contoh:

- Panduan Skripsi
- Template Proposal
- Template Laporan
- Contoh Skripsi

Tidak memiliki relasi dengan tabel lain.

---

# Session

Session login Better Auth.

Digunakan untuk autentikasi pengguna.

## Relations

Belongs To

- User

---

# Account

Data akun OAuth / Credential Better Auth.

## Relations

Belongs To

- User

---

# Verification

Menyimpan token verifikasi.

Digunakan untuk:

- Email Verification
- Password Reset
- OTP
- Magic Link

Tidak memiliki relasi dengan tabel lain.

---

# Enum

## Role

- superadmin
- admin
- lecturer
- student

## Education

- S1
- S2
- S3

## Student Status

- active
- nonactive
- ended

## Progress Status

- not started
- in progress
- completed

## Registration Status

- pending
- approved
- rejected

## Payment Status

- processing
- paid
- rejected

## Payment Option

- full
- installment_2x
- installment_3x
- installment_4x
- pay_at_end

## Registration File Type

- ukt
- contract
- payment_proof

## Reference File Type

- guideline
- template
- example