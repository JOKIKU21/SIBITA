# SIBITA API Documentation (Admin & Superadmin)

Dokumentasi ini menjelaskan endpoints API untuk peran **Admin** dan **Superadmin**.

> [!NOTE]
> Seluruh endpoint di bawah memerlukan autentikasi dengan peran (`role`) **`admin`** atau **`superadmin`** dan memiliki prefix route `/api/admin/*`.

---

## 🛡️ Fitur Admin

### 1. Ambil Ringkasan Statistik (Admin Summary)
Mendapatkan statistik ringkas sistem seperti total dosen, total mahasiswa, total bimbingan berjalan (aktif), dan total bimbingan secara keseluruhan.

* **Endpoint:** `GET /api/admin/summary`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)

#### Contoh Response (200 OK)
```json
{
  "totalDosen": 1,
  "totalMahasiswa": 1,
  "totalBimbinganBerjalan": 1,
  "totalBimbingan": 1
}
```

---

### 2. Ambil Daftar Seluruh Dosen
Mendapatkan daftar semua dosen beserta departemen, total mahasiswa bimbingan aktif, email, dan nomor HP.

* **Endpoint:** `GET /api/admin/lecturers`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)

#### Contoh Response (200 OK)
```json
{
  "lecturers": [
    {
      "id": "lecturer-uuid-5678",
      "name": "Dosen SIBITA",
      "email": "lecturer@sibita.com",
      "phoneNumber": "081234567890",
      "department": "Teknik Informatika",
      "activeAdviseeCount": 1
    }
  ]
}
```

---

### 3. Ambil Daftar Seluruh Mahasiswa
Menampilkan daftar seluruh mahasiswa beserta identitas, email, no HP, status bimbingan, persentase progres bimbingan, dan nama dosen pembimbing yang ditugaskan.

* **Endpoint:** `GET /api/admin/students`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)

#### Contoh Response (200 OK)
```json
{
  "students": [
    {
      "id": "student-uuid-1234",
      "name": "Mahasiswa SIBITA",
      "email": "student@sibita.com",
      "campus": "Universitas SIBITA",
      "nim": "10115001",
      "studyProgram": "Teknik Informatika",
      "phoneNumber": "081234567890",
      "status": "active",
      "progressPercentage": 18,
      "advisorName": "Dosen SIBITA"
    }
  ]
}
```

---

### 4. Tugaskan Dosen Pembimbing ke Mahasiswa
Menugaskan dosen pembimbing (dengan peran `lecturer`) ke mahasiswa tertentu.

* **Endpoint:** `PATCH /api/admin/students/:studentId/advisor`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)
* **Request Body:**
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
    "image": null,
    "role": "student",
    "studentProfile": {
      "campus": "Universitas SIBITA",
      "nim": "10115001",
      "studyProgram": "Teknik Informatika",
      "title": "Analisis Performa Model Bahasa Besar pada Dataset Lokal",
      "education": "S1",
      "status": "active",
      "advisorId": "lecturer-uuid-5678",
      "advisor": {
        "id": "lecturer-uuid-5678",
        "name": "Dosen SIBITA",
        "email": "lecturer@sibita.com"
      }
    }
  }
}
```

---

### 5. Perbarui Status Bimbingan Mahasiswa
Memperbarui status bimbingan mahasiswa (`active`, `nonactive`, atau `ended`). Jika status diubah menjadi `active`, sistem secara otomatis akan menginisiasi draf 17 tahapan bimbingan.

* **Endpoint:** `PATCH /api/admin/students/:studentId/status`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)
* **Request Body:**
  ```json
  {
    "status": "active"
  }
  ```

#### Contoh Response (200 OK)
```json
{
  "student": {
    "id": "student-uuid-1234",
    "name": "Mahasiswa SIBITA",
    "email": "student@sibita.com",
    "image": null,
    "role": "student",
    "studentProfile": {
      "campus": "Universitas SIBITA",
      "nim": "10115001",
      "studyProgram": "Teknik Informatika",
      "title": "Analisis Performa Model Bahasa Besar pada Dataset Lokal",
      "education": "S1",
      "status": "active",
      "advisorId": "lecturer-uuid-5678",
      "advisor": {
        "id": "lecturer-uuid-5678",
        "name": "Dosen SIBITA",
        "email": "lecturer@sibita.com"
      }
    }
  }
}
```

---

### 6. Ambil Daftar Pengajuan Pendaftaran
Menampilkan data pendaftaran mahasiswa baru. Dapat difilter menggunakan query `status` (`pending`, `approved`, atau `rejected`).

* **Endpoint:** `GET /api/admin/registrations?status=pending`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)

#### Contoh Response (200 OK)
```json
{
  "registrations": [
    {
      "id": "registration-uuid-1234",
      "studentId": "student-uuid-1234",
      "paymentOption": "full",
      "status": "pending",
      "approvedBy": null,
      "approvedAt": null,
      "createdAt": "2026-07-09T14:02:11.120Z",
      "updatedAt": "2026-07-09T14:02:11.120Z",
      "student": {
        "userId": "student-uuid-1234",
        "campus": "Universitas SIBITA",
        "nim": "10115001",
        "studyProgram": "Teknik Informatika",
        "title": null,
        "education": "S1",
        "status": "nonactive",
        "advisorId": null,
        "createdAt": "2026-07-09T14:02:11.120Z",
        "updatedAt": "2026-07-09T14:02:11.120Z",
        "user": {
          "id": "student-uuid-1234",
          "name": "Mahasiswa SIBITA",
          "email": "student@sibita.com",
          "image": null
        }
      },
      "files": [],
      "payments": []
    }
  ]
}
```

---

### 7. Ambil Detail Pengajuan Pendaftaran
Mendapatkan detail pendaftaran lengkap, termasuk berkas pendukung dan data cicilan pembayaran.

* **Endpoint:** `GET /api/admin/registrations/:id`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)

#### Contoh Response (200 OK)
```json
{
  "registration": {
    "id": "registration-uuid-1234",
    "studentId": "student-uuid-1234",
    "paymentOption": "full",
    "status": "pending",
    "approvedBy": null,
    "approvedAt": null,
    "createdAt": "2026-07-09T14:02:11.120Z",
    "updatedAt": "2026-07-09T14:02:11.120Z",
    "student": {
      "userId": "student-uuid-1234",
      "campus": "Universitas SIBITA",
      "nim": "10115001",
      "studyProgram": "Teknik Informatika",
      "title": null,
      "education": "S1",
      "status": "nonactive",
      "advisorId": null,
      "createdAt": "2026-07-09T14:02:11.120Z",
      "updatedAt": "2026-07-09T14:02:11.120Z",
      "user": {
        "id": "student-uuid-1234",
        "name": "Mahasiswa SIBITA",
        "email": "student@sibita.com",
        "image": null,
        "role": "student"
      }
    },
    "approver": null,
    "files": [],
    "payments": []
  }
}
```

---

### 8. Setujui atau Tolak Pendaftaran Mahasiswa Baru
Menerima atau menolak pendaftaran. Jika pendaftaran disetujui (status = `approved`), profil mahasiswa diaktifkan secara otomatis dan tahapan bimbingan dimulai.

* **Endpoint:** `PATCH /api/admin/registrations/:id`
* **Autentikasi:** Wajib (Role: `admin`, `superadmin`)
* **Request Body:**
  ```json
  {
    "status": "approved"
  }
  ```

#### Contoh Response (200 OK)
```json
{
  "registration": {
    "id": "registration-uuid-1234",
    "studentId": "student-uuid-1234",
    "paymentOption": "full",
    "status": "approved",
    "approvedBy": "admin-uuid-5678",
    "approvedAt": "2026-07-10T08:12:02.000Z",
    "createdAt": "2026-07-09T14:02:11.120Z",
    "updatedAt": "2026-07-10T08:12:02.000Z",
    "student": {
      "userId": "student-uuid-1234",
      "campus": "Universitas SIBITA",
      "nim": "10115001",
      "studyProgram": "Teknik Informatika",
      "title": null,
      "education": "S1",
      "status": "active",
      "advisorId": null,
      "createdAt": "2026-07-09T14:02:11.120Z",
      "updatedAt": "2026-07-10T08:12:02.000Z",
      "user": {
        "id": "student-uuid-1234",
        "name": "Mahasiswa SIBITA",
        "email": "student@sibita.com",
        "image": null,
        "role": "student"
      }
    },
    "approver": {
      "id": "admin-uuid-5678",
      "name": "Admin SIBITA",
      "email": "admin@sibita.com"
    },
    "files": [],
    "payments": []
  }
}
```