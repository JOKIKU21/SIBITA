# SIBITA API Documentation (Admin & Reference Files)

Dokumentasi ini menjelaskan endpoints API untuk pengelolaan sistem SIBITA dari perspektif **Admin** (beserta pengelolaan berkas referensi). Fitur ini digunakan untuk mengelola pendaftaran mahasiswa baru, memantau pembayaran, menugaskan dosen pembimbing, memantau status/progres bimbingan, serta mengakses berkas acuan/referensi.

> [!NOTE]
> Sebagian besar endpoint di bawah ini memerlukan autentikasi dengan peran (`role`) **`admin`** atau **`superadmin`** dan memiliki prefix route `/api/admin/*`, kecuali endpoint **File Referensi** yang dapat diakses oleh semua peran pengguna yang terautentikasi.

---

## 📊 Ringkasan Statistik (Summary)

### 1. Dapatkan Ringkasan Statistik
Mendapatkan jumlah statistik ringkas mengenai total dosen, total mahasiswa, bimbingan yang sedang berjalan, dan total seluruh bimbingan.

* **Endpoint:** `GET /api/admin/summary`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)

#### Contoh Response (200 OK)
```json
{
  "totalDosen": 5,
  "totalMahasiswa": 12,
  "totalBimbinganBerjalan": 8,
  "totalBimbingan": 10
}
```

#### Respon Kesalahan (Error Responses)
* **500 Internal Server Error:** Terjadi kesalahan pada server saat mengambil ringkasan data.
  ```json
  {
    "error": "Internal Server Error",
    "message": "Failed to retrieve summary"
  }
  ```

---

## 📝 Pengelolaan Pendaftaran (Registrations)

### 1. Daftar Pendaftaran Mahasiswa (List Registrations)
Menampilkan daftar seluruh pendaftaran mahasiswa yang masuk, diurutkan dari yang terbaru (`createdAt` desc). Mendukung pemfilteran berdasarkan status pendaftaran serta pencarian teks.

* **Endpoint:** `GET /api/admin/registrations`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Query Parameters:**
  * `status` (string, opsional): Memfilter berdasarkan status pendaftaran. Pilihan nilai: `pending`, `approved`, `rejected`.
  * `search` atau `q` (string, opsional): Kata kunci pencarian. Mencari kecocokan secara case-insensitive pada kolom:
    * Nama mahasiswa (`student.user.name`)
    * Email mahasiswa (`student.user.email`)
    * Opsi pembayaran (`paymentOption`)
    * Status registrasi (`status`)

#### Contoh Response (200 OK)
```json
{
  "registrations": [
    {
      "id": "registration-uuid-111",
      "studentId": "student-uuid-1234",
      "status": "pending",
      "totalAmount": 5000000,
      "paymentOption": "installment_2x",
      "createdAt": "2026-07-11T01:23:45.000Z",
      "student": {
        "userId": "student-uuid-1234",
        "nim": "12345678",
        "studyProgram": "Teknik Informatika",
        "campus": "Kampus Utama",
        "user": {
          "id": "student-uuid-1234",
          "name": "Mahasiswa SIBITA",
          "email": "student@sibita.com",
          "image": "https://lh3.googleusercontent.com/a/acds12"
        }
      },
      "files": [
        {
          "id": "file-uuid-999",
          "registrationId": "registration-uuid-111",
          "name": "KRS_Semester_Akhir.pdf",
          "url": "https://storage.sibita.com/files/krs.pdf",
          "key": "krs.pdf",
          "createdAt": "2026-07-11T01:23:45.000Z"
        }
      ],
      "payments": [
        {
          "id": "payment-uuid-222",
          "registrationId": "registration-uuid-111",
          "installment": 1,
          "amount": 2500000,
          "status": "paid",
          "paidAt": "2026-07-11T01:23:45.000Z",
          "files": []
        }
      ]
    }
  ]
}
```

---

### 2. Detail Pendaftaran Mahasiswa (Get Registration Detail)
Mendapatkan rincian informasi satu pendaftaran mahasiswa secara lengkap termasuk berkas terlampir, pembayaran, dan informasi penyetuju (approver) jika sudah diproses.

* **Endpoint:** `GET /api/admin/registrations/:id`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Path Parameters:**
  * `id` (string): ID pendaftaran.

#### Contoh Response (200 OK)
```json
{
  "registration": {
    "id": "registration-uuid-111",
    "studentId": "student-uuid-1234",
    "status": "approved",
    "totalAmount": 5000000,
    "paymentOption": "installment_2x",
    "createdAt": "2026-07-11T01:23:45.000Z",
    "approvedBy": "admin-uuid-5678",
    "approvedAt": "2026-07-11T02:00:00.000Z",
    "student": {
      "userId": "student-uuid-1234",
      "nim": "12345678",
      "studyProgram": "Teknik Informatika",
      "campus": "Kampus Utama",
      "user": {
        "id": "student-uuid-1234",
        "name": "Mahasiswa SIBITA",
        "email": "student@sibita.com",
        "image": "https://lh3.googleusercontent.com/a/acds12",
        "role": "student"
      }
    },
    "approver": {
      "id": "admin-uuid-5678",
      "name": "Admin SIBITA",
      "email": "admin@sibita.com"
    },
    "files": [
      {
        "id": "file-uuid-999",
        "registrationId": "registration-uuid-111",
        "name": "KRS_Semester_Akhir.pdf",
        "url": "https://storage.sibita.com/files/krs.pdf"
      }
    ],
    "payments": [
      {
        "id": "payment-uuid-222",
        "registrationId": "registration-uuid-111",
        "installment": 1,
        "amount": 2500000,
        "status": "paid",
        "paidAt": "2026-07-11T01:23:45.000Z",
        "files": []
      }
    ]
  }
}
```

#### Respon Kesalahan (Error Responses)
* **400 Bad Request:** Terjadi jika parameter ID tidak disertakan.
  ```json
  { "error": "Missing registration id" }
  ```
* **404 Not Found:** Pendaftaran tidak ditemukan.
  ```json
  { "error": "Registration not found" }
  ```

---

### 3. Setujui atau Tolak Pendaftaran (Update Registration Status)
Memproses persetujuan pendaftaran mahasiswa.

> [!IMPORTANT]
> - Jika status diubah menjadi **`approved`**, maka profil mahasiswa akan diaktifkan secara otomatis (`status` menjadi `active`) dan sistem akan membuat rekaman kemajuan bimbingan pertama untuk mahasiswa tersebut.
> - Hanya pendaftaran berstatus **`pending`** yang dapat diperbarui statusnya.

* **Endpoint:** `PATCH /api/admin/registrations/:id`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Path Parameters:**
  * `id` (string): ID pendaftaran.
* **Request Body (JSON):**
  * `status` (string, wajib): Status persetujuan baru. Pilihan nilai: `"approved"` atau `"rejected"`.

#### Contoh Request Body
```json
{
  "status": "approved"
}
```

#### Contoh Response (200 OK)
Mengembalikan data pendaftaran yang telah diperbarui (format sama dengan Detail Pendaftaran).

#### Respon Kesalahan (Error Responses)
* **400 Bad Request:** Format JSON salah, parameter ID kosong, atau validasi input gagal.
  ```json
  {
    "error": "Validation failed",
    "details": [
      {
        "code": "invalid_enum_value",
        "options": ["approved", "rejected"],
        "path": ["status"],
        "message": "Invalid enum value. Expected 'approved' | 'rejected', received 'invalid_status'"
      }
    ]
  }
  ```
* **404 Not Found:** Pendaftaran tidak ditemukan.
  ```json
  { "error": "Registration not found" }
  ```
* **409 Conflict:** Pendaftaran sudah diproses sebelumnya (bukan bertatus `pending`).
  ```json
  {
    "error": "Registration already approved",
    "message": "Only pending registrations can be approved or rejected"
  }
  ```

---

## 💳 Pemantauan Pembayaran (Payments)

### 1. Daftar Status Pembayaran Mahasiswa (List Payments)
Mendapatkan daftar status keuangan mahasiswa, termasuk total biaya, akumulasi pembayaran yang sudah diverifikasi lunas (`paidAmount`), metode pembayaran, rincian setiap termin cicilan, serta mendukung pencarian teks.

* **Endpoint:** `GET /api/admin/payments`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Query Parameters:**
  * `search` atau `q` (string, opsional): Kata kunci pencarian. Mencari kecocokan secara case-insensitive pada kolom:
    * Nama mahasiswa (`studentName`)
    * Opsi pembayaran (`paymentOption`)
    * Status registrasi/pembayaran utama (`status`)

#### Contoh Response (200 OK)
```json
{
  "payments": [
    {
      "registrationId": "registration-uuid-111",
      "studentId": "student-uuid-1234",
      "studentName": "Mahasiswa SIBITA",
      "totalAmount": 5000000,
      "paidAmount": 2500000,
      "paymentOption": "installment_2x",
      "status": "approved",
      "payments": [
        {
          "id": "payment-uuid-222",
          "installment": 1,
          "amount": 2500000,
          "status": "paid",
          "paidAt": "2026-07-11T01:23:45.000Z"
        },
        {
          "id": "payment-uuid-333",
          "installment": 2,
          "amount": 2500000,
          "status": "pending",
          "paidAt": null
        }
      ]
    }
  ]
}
```

---

### 2. ACC / Ubah Status Pembayaran Cicilan (Update Payment Status)
Memperbarui status pembayaran termin/cicilan tertentu (misalnya dari `processing` menjadi `paid` untuk menyetujui pembayaran cicilan).

> [!NOTE]
> Jika status diubah menjadi **`paid`**, kolom `paidAt` secara otomatis akan diisi dengan waktu saat ini. Jika diubah ke status lainnya, `paidAt` akan diatur kembali ke `null`.

* **Endpoint:** `PATCH /api/admin/payments/:paymentId`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Path Parameters:**
  * `paymentId` (string): ID transaksi/pembayaran cicilan (`registration_payment.id`).
* **Request Body (JSON):**
  * `status` (string, wajib): Status pembayaran baru. Pilihan nilai: `"processing"`, `"paid"`, `"rejected"`.
  * `note` (string, opsional): Catatan admin untuk pembayaran tersebut.

#### Contoh Request Body
```json
{
  "status": "paid",
  "note": "Pembayaran termin 1 telah diterima dan dikonfirmasi."
}
```

#### Contoh Response (200 OK)
```json
{
  "payment": {
    "id": "payment-uuid-222",
    "registrationId": "registration-uuid-111",
    "installment": 1,
    "amount": 2500000,
    "status": "paid",
    "paidAt": "2026-07-11T05:58:30.000Z",
    "note": "Pembayaran termin 1 telah diterima dan dikonfirmasi.",
    "createdAt": "2026-07-11T01:23:45.000Z"
  }
}
```

#### Respon Kesalahan (Error Responses)
* **400 Bad Request:** Format JSON salah, `paymentId` kosong, atau validasi nilai status salah.
* **404 Not Found:** Rekaman pembayaran cicilan tidak ditemukan.
  ```json
  { "error": "Payment record not found" }
  ```

---

## 👥 Pengelolaan Pengguna (Lecturers & Students)

### 1. Daftar Dosen Pembimbing (List Lecturers)
Menampilkan daftar seluruh dosen pembimbing beserta informasi departemen/jurusan dan jumlah mahasiswa aktif bimbingannya (`activeAdviseeCount`). Mendukung pencarian kata kunci.

* **Endpoint:** `GET /api/admin/lecturers`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Query Parameters:**
  * `search` atau `q` (string, opsional): Kata kunci pencarian. Mencari kecocokan secara case-insensitive pada kolom:
    * Nama dosen (`name`)
    * Email dosen (`email`)
    * Nomor telepon dosen (`phoneNumber`)
    * Departemen/jurusan dosen (`department`)

#### Contoh Response (200 OK)
```json
{
  "lecturers": [
    {
      "id": "lecturer-uuid-5678",
      "name": "Dosen SIBITA, M.T.",
      "email": "dosen@sibita.com",
      "phoneNumber": "08123456789",
      "department": "Teknik Informatika",
      "activeAdviseeCount": 3
    }
  ]
}
```

---

### 2. Daftar Mahasiswa (List Students)
Menampilkan daftar mahasiswa bimbingan beserta profil lengkap dan persentase progres. Mendukung pencarian kata kunci multi-kolom.

* **Endpoint:** `GET /api/admin/students`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Query Parameters:**
  * `search` atau `q` (string, opsional): Kata kunci pencarian. Mencari kecocokan secara case-insensitive pada kolom:
    * Nama mahasiswa (`name`)
    * Email mahasiswa (`email`)
    * NIM (`nim`)
    * Program studi (`studyProgram`)
    * Kampus (`campus`)
    * Nomor telepon (`phoneNumber`)
    * Status keaktifan bimbingan (`status`)
    * Nama dosen pembimbing (`advisorName`)

#### Contoh Response (200 OK)
```json
{
  "students": [
    {
      "id": "student-uuid-1234",
      "name": "Mahasiswa SIBITA",
      "email": "student@sibita.com",
      "campus": "Kampus Utama",
      "nim": "12345678",
      "studyProgram": "Teknik Informatika",
      "phoneNumber": "08987654321",
      "status": "active",
      "progressPercentage": 25,
      "advisorName": "Dosen SIBITA, M.T."
    }
  ]
}
```

---

### 3. Tentukan Dosen Pembimbing (Assign Advisor)
Menetapkan dosen pembimbing bagi mahasiswa tertentu. Jika profil mahasiswa belum ada, sistem akan membuat profil baru secara otomatis.

* **Endpoint:** `PATCH /api/admin/students/:studentId/advisor`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Path Parameters:**
  * `studentId` (string): ID pengguna mahasiswa.
* **Request Body (JSON):**
  * `advisorId` (string, wajib): ID pengguna dosen pembimbing.

#### Contoh Request Body
```json
{
  "advisorId": "lecturer-uuid-5678"
}
```

#### Contoh Response (200 OK)
```json
{
  "student": {
    "id": "student-uuid-1234",
    "name": "Mahasiswa SIBITA",
    "email": "student@sibita.com",
    "image": "https://lh3.googleusercontent.com/a/acds12",
    "role": "student",
    "studentProfile": {
      "campus": "Kampus Utama",
      "nim": "12345678",
      "studyProgram": "Teknik Informatika",
      "title": null,
      "education": null,
      "status": "active",
      "advisorId": "lecturer-uuid-5678",
      "advisor": {
        "id": "lecturer-uuid-5678",
        "name": "Dosen SIBITA, M.T.",
        "email": "dosen@sibita.com"
      }
    }
  }
}
```

#### Respon Kesalahan (Error Responses)
* **400 Bad Request:** Format JSON salah, `advisorId` kosong, pengguna target bukan berstatus `student`, atau pembimbing terpilih bukan dosen (`role !== "lecturer"`).
  ```json
  { "error": "Advisor must have lecturer role" }
  ```
* **404 Not Found:** Mahasiswa atau Dosen Pembimbing tidak ditemukan.
  ```json
  { "error": "Advisor not found" }
  ```

---

### 4. Ubah Status Keaktifan Mahasiswa (Update Student Status)
Mengubah status keaktifan bimbingan mahasiswa secara manual.

> [!IMPORTANT]
> Jika status diubah menjadi **`active`**, maka sistem secara otomatis menginisialisasi kemajuan bimbingan (progres dan catatan tahapan bimbingan).

* **Endpoint:** `PATCH /api/admin/students/:studentId/status`
* **Autentikasi:** Wajib (Role: `admin` / `superadmin`)
* **Path Parameters:**
  * `studentId` (string): ID pengguna mahasiswa.
* **Request Body (JSON):**
  * `status` (string, wajib): Status baru mahasiswa. Pilihan nilai: `"active"`, `"nonactive"`, `"ended"`.

#### Contoh Request Body
```json
{
  "status": "nonactive"
}
```

#### Contoh Response (200 OK)
Mengembalikan data mahasiswa yang telah diperbarui (format sama dengan respon Tentukan Dosen Pembimbing).

#### Respon Kesalahan (Error Responses)
* **400 Bad Request:** Format JSON salah, `status` salah (tidak terdaftar dalam enum), atau pengguna target bukan berstatus `student`.
  ```json
  {
    "error": "Validation failed",
    "details": [
      {
        "code": "invalid_enum_value",
        "options": ["active", "nonactive", "ended"],
        "path": ["status"],
        "message": "Invalid enum value. Expected 'active' | 'nonactive' | 'ended', received 'graduated'"
      }
    ]
  }
  ```
* **404 Not Found:** Mahasiswa tidak ditemukan.
  ```json
  { "error": "Student not found" }
  ```

---

## 📂 File Referensi (Reference Files)

### 1. Daftar File Referensi (List Reference Files)
Menampilkan daftar seluruh file referensi / acuan penulisan bimbingan akademis (misal template jurnal, panduan TA, dsb).

* **Endpoint:** `GET /api/reference-files`
* **Autentikasi:** Wajib (Semua Peran / Authenticated User)
* **Query Parameters:**
  * `type` (string, opsional): Memfilter file berdasarkan kategori. Pilihan nilai: `guideline`, `template`, `example`.
  - `search` atau `q` (string, opsional): Kata kunci pencarian. Mencari kecocokan secara case-insensitive pada kolom:
    * Judul referensi (`title`)
    * Deskripsi referensi (`description`)
    * Nama file fisik (`fileName`)
    * Pembuat/penulis file (`author`)

#### Contoh Response (200 OK)
```json
{
  "referenceFiles": [
    {
      "id": "ref-uuid-000",
      "title": "Panduan Tugas Akhir S1",
      "description": "Dokumen panduan tata cara penulisan skripsi/tugas akhir edisi terbaru.",
      "type": "guideline",
      "fileName": "panduan_ta_s1_2026.pdf",
      "fileUrl": "https://storage.sibita.com/references/panduan_ta_s1_2026.pdf",
      "fileType": "application/pdf",
      "fileSize": 1548234,
      "author": "Tim Akademik",
      "createdAt": "2026-07-11T01:23:45.000Z",
      "updatedAt": "2026-07-11T01:23:45.000Z"
    }
  ]
}
```