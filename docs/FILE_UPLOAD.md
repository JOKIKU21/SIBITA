# SIBITA API Documentation - File Upload

Dokumentasi ini menjelaskan penggunaan endpoint pengunggahan berkas (*file upload*) pada sistem SIBITA API.

---

## 📤 Pengunggahan Berkas (File Upload)

### 1. Unggah Berkas Baru ke VPS
Mengunggah berkas baru (PDF, DOCX, atau MP4) ke penyimpanan lokal VPS dengan validasi ukuran berkas dan pemeriksaan signature berkas (*magic numbers*) demi keamanan.

* **Endpoint:** `POST /api/upload`
* **Query Parameters:**
  * `category` (string, opsional): Mengkategorikan berkas ke subfolder tertentu. Nilai yang didukung:
    * `stage` / `stages` -> folder: `public/uploads/stages/`
    * `registration` / `registrations` -> folder: `public/uploads/registrations/`
    * `reference` / `references` -> folder: `public/uploads/references/`
    * `chat` / `chats` -> folder: `public/uploads/chats/`
    * `avatar` / `avatars` -> folder: `public/uploads/avatars/`
    * Kosong / lainnya -> folder: `public/uploads/others/`
* **Autentikasi:** Wajib (Semua Peran / Authenticated User)
* **Request Content-Type:** `multipart/form-data`
* **Request Body:**
  * `file` (file binary, wajib): Berkas yang akan diunggah.
  * `category` (string, opsional): Kategori berkas jika tidak dikirim via Query Parameter.
* **Aturan & Validasi Keamanan:**
  * **Tipe Berkas yang Diizinkan:** Hanya berkas bertipe **PDF**, **DOCX**, dan **MP4**.
  * **Validasi Magic Numbers:** Sistem memverifikasi isi file (*file signature*) untuk memastikan file tersebut asli dan bukan file berbahaya.
  * **Batas Maksimal Ukuran File:**
    * PDF: Maksimal **20MB**
    * DOCX: Maksimal **20MB**
    * MP4: Maksimal **100MB**
  * **UUID Obfuscation:** Nama file fisik di server akan diubah otomatis menjadi UUID v4 (misalnya `8c9e5bf7-0c7f-4b08-8e65-d0df73562e84.pdf`) untuk mencegah bentrok nama file dan serangan *path traversal*.

#### Contoh Response (201 Created)
```json
{
  "success": true,
  "fileName": "draft_skripsi_bab_1.pdf",
  "fileUrl": "http://localhost:3001/uploads/stages/8c9e5bf7-0c7f-4b08-8e65-d0df73562e84.pdf",
  "fileType": "application/pdf",
  "fileSize": 1048576,
  "category": "stages"
}
```

#### Respon Kesalahan (Error Responses)
* **400 Bad Request:** Berkas tidak disertakan, tipe berkas tidak diizinkan, ekstensi tidak sesuai dengan signature asli berkas, atau ukuran berkas melebihi batas.
  ```json
  {
    "error": "Ukuran berkas melebihi batas maksimal untuk tipe ini (Maks 20MB)"
  }
  ```
* **413 Payload Too Large:** Ukuran muatan HTTP melebihi batas maksimum server (Maks 100MB untuk upload).
  ```json
  {
    "error": "Payload Too Large (Max 100MB)"
  }
  ```
* **401 Unauthorized:** Pengguna belum masuk/tidak terautentikasi.
  ```json
  {
    "error": "Unauthorized"
  }
  ```

---

## 💾 Penyimpanan Metadata Berkas ke Database (Database Persistence)

Setelah file berhasil diunggah ke VPS menggunakan endpoint `/api/upload` (Langkah 1), Anda akan mendapatkan metadata file berupa `fileUrl`, `fileName`, `fileType`, dan `fileSize`. 

Gunakan metadata tersebut untuk disimpan ke tabel database terkait melalui endpoint di bawah ini (Langkah 2):

### 1. Simpan Berkas Progres Bimbingan (`stage_file`)
Mahasiswa mengunggah berkas rancangan skripsi per tahapan bimbingan.

* **Endpoint:** `POST /api/student/bimbingan/:stageId/files`
* **Autentikasi:** Wajib (Role: `student`)
* **Path Parameters:**
  * `stageId` (integer): Urutan tahapan skripsi (1 s.d. 17).
* **Request Body (JSON):**
  ```json
  {
    "fileName": "draft_skripsi_bab_1.pdf",
    "fileUrl": "http://localhost:3001/uploads/stages/8c9e5bf7-0c7f-4b08-8e65-d0df73562e84.pdf",
    "fileType": "application/pdf",
    "fileSize": 1048576
  }
  ```

### 2. Simpan Berkas Persyaratan Pendaftaran (`registration_file`)
Mahasiswa mengunggah dokumen pendaftaran seperti bukti UKT, kontrak, atau bukti bayar.

* **Endpoint:** `POST /api/student/registration/files`
* **Autentikasi:** Wajib (Role: `student`)
* **Request Body (JSON):**
  ```json
  {
    "type": "ukt", // Pilihan: "ukt" | "contract" | "payment_proof"
    "fileName": "bukti_ukt_semester_akhir.pdf",
    "fileUrl": "http://localhost:3001/uploads/registrations/f2711ab4-f481-42cb-b1b7-d1cb27f8a9e0.pdf",
    "fileType": "application/pdf",
    "fileSize": 450300,
    "registrationPaymentId": null // Wajib diisi jika type adalah "payment_proof"
  }
  ```

### 3. Simpan Berkas Panduan / Referensi Akademik (`reference_file`)
Admin atau superadmin membuat data referensi akademik baru beserta lampiran dokumennya.

* **Endpoint:** `POST /api/reference-files`
* **Autentikasi:** Wajib (Role: `admin` | `superadmin`)
* **Request Body (JSON):**
  ```json
  {
    "title": "Buku Pedoman Penulisan Tugas Akhir S1 2026",
    "description": "Dokumen acuan format penulisan skripsi edisi terbaru",
    "type": "guideline", // Pilihan: "guideline" | "template" | "example"
    "fileName": "pedoman_skripsi_2026.pdf",
    "fileUrl": "http://localhost:3001/uploads/references/40ea79c9-5ee4-4ee9-b4b1-e23a3a416e91.pdf",
    "fileType": "application/pdf",
    "fileSize": 2500000,
    "author": "Fakultas Teknik"
  }
  ```

### 4. Kirim Chat Bimbingan dengan Lampiran File (`chat_message`)
Mengirim pesan chat antara mahasiswa dan dosen pembimbing dengan lampiran berkas.

* **Endpoint:** `POST /api/student/chat/:stageId` (Mahasiswa) atau `POST /api/lecturer/chat/:studentId/:stageId` (Dosen)
* **Autentikasi:** Wajib (Role: `student` atau `lecturer`)
* **Request Body (JSON):**
  ```json
  {
    "message": "Berikut adalah video demo sistem saya, Pak.",
    "fileName": "demo_sistem.mp4",
    "fileUrl": "http://localhost:3001/uploads/chats/f82a93b4-e221-4f11-ba2c-d9c02013f99e.mp4",
    "fileType": "video/mp4",
    "fileSize": 45200000
  }
  ```
