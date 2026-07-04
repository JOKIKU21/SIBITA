# SIBITA API

Backend API for **SIBITA (Sistem Bimbingan Tugas Akhir)** — a role-based web platform for managing the student thesis supervision process.

## Tech Stack

| Layer | Technology |
|-------|-----------:|
| Runtime | [Bun](https://bun.sh) |
| Framework | [Hono](https://hono.dev) |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL ([Neon](https://neon.tech)) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Auth | [Better Auth](https://better-auth.com) |
| Email | [Resend](https://resend.com) |

## Prerequisites

- [Bun](https://bun.sh) >= 1.0
- PostgreSQL database (or [Neon](https://neon.tech) serverless)

## Getting Started

### 1. Install dependencies

```sh
bun install
```

### 2. Configure environment variables

Copy `.env.example` or create `.env` with the following:

```env
DATABASE_URL=postgresql://user:password@host/dbname
BETTER_AUTH_SECRET=your-secret-min-32-chars
BETTER_AUTH_URL=http://localhost:3001
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM="SIBITA <onboarding@sibita.com>"
```

> Generate `BETTER_AUTH_SECRET` with: `openssl rand -base64 32`

### 3. Push database schema

```sh
bunx drizzle-kit push
```

### 4. Run the development server

```sh
bun run dev
```

The API will be available at **http://localhost:3001**

## Project Structure

```
src/
  index.ts              Hono app — routes, entry point, CORS
  routes/
    user.ts             User management route definitions
    student.ts          Student feature route definitions
    lecturer.ts         Lecturer feature route definitions
    admin.ts            Admin feature route definitions
    superadmin.ts       Superadmin feature route definitions
  controllers/
    user.ts             User CRUD controller logic
    student/
      registration.ts   Student registration process
      bimbingan.ts      Student thesis stage progress, notes, and files
      chat.ts           Student advisor chat thread
    lecturer/
      students.ts       Lecturer advisee list and profile/progress details
      bimbingan.ts      Lecturer bimbingan supervision notes and files
      chat.ts           Lecturer bimbingan chat threads and messaging
    admin/
      registrations.ts  Admin registration review, approve/reject
      users.ts          Admin lecturer/student listing, advisor assignment
    superadmin/
      users.ts          Superadmin dashboard, admin/lecturer creation, user role/delete
  middlewares/
    auth.ts             Session validation via Better Auth
    role.ts             RBAC authorization (requireRole, requireSelf)
    security.ts         Security features (input sanitization, rate limiting)
lib/
  auth.ts               Better Auth config (email/password + Google OAuth + password reset)
  email.ts              Email templates & sending via Resend
db/
  index.ts              Database connection (pg driver) + Drizzle relational query schema
  schema.ts             All tables: user, student_profile, lecturer_profile, auth tables, relations
drizzle/
  0000_initial.sql      Migration: full schema with enums + profile tables
drizzle.config.ts       Drizzle Kit configuration
```

## Database Schema

Profile data is split out of the core `user` table into role-specific tables
(`student_profile`, `lecturer_profile`), each 1:1 with `user` via `user_id`.
The `user` table keeps only the fields needed by Better Auth and authorization
(`role`, `status`).

### `user` Table

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | `text` | — | Primary key |
| `name` | `text` | — | Nama lengkap |
| `email` | `text` | — | Email (unique) |
| `email_verified` | `boolean` | `false` | Status verifikasi email |
| `image` | `text` | `null` | URL foto profil |
| `role` | `enum(superadmin,admin,lecturer,student)` | `student` | Role pengguna |
| `status` | `enum(active,nonactive)` | `nonactive` | Status akun |
| `created_at` | `timestamp` | `now()` | Tanggal registrasi |
| `updated_at` | `timestamp` | `now()` | Terakhir diperbarui |

### `student_profile` Table (1:1 with `user`, role = `student`)

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `user_id` | `text` (PK, FK → `user.id`, `ON DELETE CASCADE`) | — | Pemilik profil |
| `campus` | `text` | `null` | Nama kampus/universitas |
| `study_program` | `text` | `null` | Program studi |
| `education` | `enum(S1,S2,S3)` | `null` | Jenjang pendidikan |
| `advisor_id` | `text` (FK → `user.id`, `ON DELETE SET NULL`) | `null` | Dosen pembimbing (harus role lecturer) |
| `created_at` | `timestamp` | `now()` | Dibuat |
| `updated_at` | `timestamp` | `now()` | Terakhir diperbarui |

### `lecturer_profile` Table (1:1 with `user`, role = `lecturer`)

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `user_id` | `text` (PK, FK → `user.id`, `ON DELETE CASCADE`) | — | Pemilik profil |
| `nidn` | `text` (unique) | `null` | Nomor Induk Dosen Nasional |
| `campus` | `text` | `null` | Nama kampus/universitas |
| `department` | `text` | `null` | Jurusan/departemen |
| `education` | `enum(S1,S2,S3)` | `null` | Jenjang pendidikan |
| `quota` | `integer` | `0` | Batas maksimal mahasiswa bimbingan |
| `created_at` | `timestamp` | `now()` | Dibuat |
| `updated_at` | `timestamp` | `now()` | Terakhir diperbarui |

## Authentication

Better Auth provides the following auth methods:

- **Email & Password** — sign-up and sign-in with email/password (min 8, max 128 characters)
- **Google OAuth** — social login with Google account (`prompt: "select_account"`)
- **Account Linking** — accounts with the same email are automatically linked
- **Email Verification** — OTP via email (6 digit, 10 menit) + link verifikasi saat sign-up
- **Forgot Password** — reset link via email (token berlaku 30 menit, single-use)
- **Change Password** — ganti password saat login (wajib currentPassword)

### Auth Endpoints

All auth endpoints are served under `/api/auth/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-up/email` | `POST` | Register akun baru |
| `/api/auth/sign-in/email` | `POST` | Login dengan email & password |
| `/api/auth/sign-in/social` | `POST` | Login via Google |
| `/api/auth/sign-out` | `POST` | Logout / revoke session |
| `/api/auth/forget-password` | `POST` | Request reset password link via email |
| `/api/auth/reset-password` | `POST` | Reset password dengan token dari email |
| `/api/auth/change-password` | `POST` | Ganti password (butuh session aktif) |
| `/api/auth/ok` | `GET` | Health check |
| `/api/auth/get-session` | `GET` | Dapatkan detail sesi aktif (Cookie) |

### Password Security

| Setting | Value |
|---------|-------|
| Min password length | 8 karakter |
| Max password length | 128 karakter |
| Reset token expiry | 30 menit |
| Revoke sessions on reset | ✅ Ya, semua sesi dicabut |
| Hashing algorithm | scrypt (Node.js native) |

## User Management API

All user endpoints require authentication (`authMiddleware`).

Responses include the role-specific profile nested under `studentProfile` /
`lecturerProfile` (the non-matching one is `null`); `studentProfile.advisor`
resolves to the assigned lecturer's `id`/`name`/`email`.

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/users` | `GET` | admin, superadmin | List semua user (+ profil) |
| `/api/users/:id` | `GET` | admin, superadmin, atau self | Detail user by ID (+ profil) |
| `/api/users/profile` | `PATCH` | authenticated | Update profil sendiri. `name` → `user`; field profil di-route ke tabel sesuai role: student (`campus`, `studyProgram`, `education`), lecturer (`campus`, `department`, `education`, `nidn`) |
| `/api/users/:id` | `PATCH` | admin, superadmin | Update user: `role`/`status` → `user`; field profil sesuai role efektif: student (`campus`, `studyProgram`, `education`, `advisorId`), lecturer (`campus`, `department`, `education`, `nidn`, `quota`) |
| `/api/me` | `GET` | authenticated | Data user yang sedang login (+ profil) |

> Guard: `advisorId` hanya untuk student & harus menunjuk user ber-role `lecturer`. `quota` hanya untuk lecturer (integer ≥ 0). Profil di-upsert, jadi tetap berfungsi walau baris profil belum ada.

### Role-Based Access & Middleware

We enforce role-based access control (RBAC) using Hono middlewares defined in `src/middlewares/role.ts`.

#### Helper Middlewares

- **`requireRole(...roles)`**: Restricts route access to the specified roles (`superadmin`, `admin`, `lecturer`, `student`).
- **`requireSelf(paramName?, overrideRoles?)`**: Restricts route access to the owner of the resource (where `:id` matches `user.id`), with an option to allow override roles (default: `superadmin`, `admin`).

#### Role Permissions Matrix

| Role | Permissions |
|------|-------------|
| `superadmin` | Dashboard, buat akun admin & dosen, kelola semua user (ganti role, hapus), semua akses admin |
| `admin` | Review & approve/reject registrasi, assign dosen pembimbing ke mahasiswa, list dosen & mahasiswa |
| `lecturer` | Akses list bimbingan mahasiswa, CRUD notes & files bimbingan, chat mahasiswa |
| `student` | Akses registrasi, bimbingan mandiri (CRUD notes & files), chat dosen pembimbing |

#### Usage Examples

```ts
import { authMiddleware } from "./middlewares/auth.js";
import { requireRole, requireSelf } from "./middlewares/role.js";

// Hanya admin dan superadmin
app.get("/api/admin-only", authMiddleware, requireRole("admin", "superadmin"), handler);

// Hanya mahasiswa pemilik akun atau admin
app.get("/api/users/:id", authMiddleware, requireSelf("id"), handler);
```

## Security & API Protection

API SIBITA dilengkapi dengan berbagai proteksi keamanan tingkat tinggi:

### 1. 🛡️ Secure Headers & CSRF
- **Secure Headers**: Menggunakan Hono `secureHeaders()` untuk menyematkan HTTP security headers (seperti HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, dll.).
- **CSRF Protection**: Menggunakan Hono `csrf()` untuk mencocokkan asal request (`Origin` dan `Referer`) dengan asal frontend yang diperbolehkan (`FRONTEND_URL` / `localhost:3000`).

### 2. 🧯 Payload & Timeout Limits
- **Body Size Limit**: Membatasi ukuran body payload request maksimal **10MB** menggunakan Hono `bodyLimit()` untuk mencegah serangan Denial of Service (DoS) melalui payload besar.
- **Request Timeout**: Membatasi waktu eksekusi request maksimal **30 detik** menggunakan Hono `timeout()`. Jika melebihi batas, request otomatis diputus dengan respon `504 Gateway Timeout`.

### 3. 🧼 Input Sanitization (Anti-XSS)
- **Deep Sanitizer**: Middleware kustom `sanitizeInput` mendeteksi request dengan `Content-Type: application/json` secara rekursif:
  - Menyaring tag `<script>`, atribut event `on*` (seperti `onerror`, `onclick`), serta protocol `javascript:`.
  - Mengonversi karakter berbahaya seperti `<`, `>`, `"`, `'`, dan `` ` `` menjadi HTML entities (`&lt;`, `&gt;`).
  - Menjaga integritas data khusus (seperti field `fileUrl`, `image`, `email`, `callbackURL`) agar fungsionalitas pengiriman link/file tetap berjalan normal tanpa bypass script.

### 4. 🚦 Rate Limiting
- **IP-Based Limit**: Membatasi akses request maksimal **200 requests per 15 menit** untuk tiap kombinasi IP dan path route menggunakan middleware kustom `rateLimit`.
- Menyertakan response header standar:
  - `X-RateLimit-Limit`: Batas maksimum request.
  - `X-RateLimit-Remaining`: Jumlah sisa request yang diperbolehkan.
  - `X-RateLimit-Reset`: Epoch timestamp kapan batas limit di-reset.
  - Respon otomatis `429 Too Many Requests` saat limit terlampaui.

## Student Features API

All student endpoints are prefixed with `/api/student/*` and require authentication (`authMiddleware` + `requireRole("student")`). All input parameters are validated using Zod.

### 👤 Profil Mahasiswa

Membuat data profil mahasiswa saat pertama kali masuk. Profil hanya bisa dibuat sekali (akan mengembalikan `409` jika sudah ada).

- **Create Student Profile**: `POST /api/student/profile`
  - Body: `{"campus"?: string, "nim"?: string, "studyProgram"?: string, "education"?: "S1" | "S2" | "S3"}`
  - Semua field opsional. `education` default `S1`, `status` default `nonactive`.

### 📋 Registrasi Mahasiswa Baru

Digunakan untuk proses registrasi awal mahasiswa dan pengunggahan berkas UKT/kontrak/bukti pembayaran.

- **Create Registration**: `POST /api/student/registration`
  - Body: `{"paymentOption": "full" | "installment_2x" | "installment_3x" | "installment_4x" | "pay_at_end"}`
- **Get My Registration Info**: `GET /api/student/registration`
  - Mengambil data registrasi aktif, beserta berkas pendukung dan tahapan pembayaran.
- **Upload Registration File**: `POST /api/student/registration/files`
  - Body: `{"type": "ukt" | "contract" | "payment_proof", "fileName": string, "fileUrl": string, "fileType"?: string, "fileSize"?: number, "registrationPaymentId"?: string}`
  - *Catatan*: `registrationPaymentId` wajib diisi jika `type` bernilai `payment_proof`.

### 📚 Bimbingan Mandiri (Thesis Stages Progress)

Mahasiswa dapat melacak progres tugas akhir mereka (melalui 17 tahapan bimbingan), menulis catatan pribadi, dan mengunggah berkas untuk tiap tahapan.

- **List Bimbingan Stages**: `GET /api/student/bimbingan`
  - Mengambil seluruh 17 tahapan bimbingan beserta progres mahasiswa, catatan (`notes`), dan berkas (`files`) yang diunggah.
- **Get Stage Detail**: `GET /api/student/bimbingan/:stageId`
  - Mengambil detail tahapan tertentu beserta daftar catatan dan berkas mahasiswa pada tahapan tersebut.
- **Create Note**: `POST /api/student/bimbingan/:stageId/notes`
  - Body: `{"data": Record<string, unknown>}`
- **Update Note**: `PATCH /api/student/bimbingan/:stageId/notes/:noteId`
  - Body: `{"data"?: Record<string, unknown>, "completedAt"?: ISOString | null}`
- **Delete Note**: `DELETE /api/student/bimbingan/:stageId/notes/:noteId`
- **Upload Stage File**: `POST /api/student/bimbingan/:stageId/files`
  - Body: `{"fileName": string, "fileUrl": string, "fileType"?: string, "fileSize"?: number}`
- **Delete Stage File**: `DELETE /api/student/bimbingan/:stageId/files/:fileId`

### 💬 Chat Dosen Pembimbing

Komunikasi langsung antara mahasiswa dengan dosen pembimbing yang ditugaskan.

- **List Chat Messages**: `GET /api/student/chat?limit=50&offset=0`
  - Mengambil riwayat pesan bimbingan dengan pagination. Mengembalikan data pesan beserta detail dosen pembimbing.
- **Send Message**: `POST /api/student/chat`
  - Body: `{"message"?: string, "fileName"?: string, "fileUrl"?: string, "fileType"?: string, "fileSize"?: number}`
  - *Catatan*: `message` or `fileUrl` wajib diisi (tidak boleh mengirim pesan kosong).
  - *Syarat*: Mahasiswa harus sudah memiliki dosen pembimbing (`advisorId` tidak null) untuk dapat mengirim atau membaca pesan.

## Lecturer Features API

All lecturer endpoints are prefixed with `/api/lecturer/*` and require authentication (`authMiddleware` + `requireRole("lecturer")`). Input parameters are validated using Zod. All student-specific endpoints verify that the student is an assigned advisee (`advisorId` check).

### 👤 Profil Dosen

Mengambil data profil dosen yang sedang login.

- **Get My Profile**: `GET /api/lecturer/profile`

### 👥 Mahasiswa Bimbingan (Advisees)

- **List Advisees**: `GET /api/lecturer/students`
  - Mengambil daftar seluruh mahasiswa bimbingan yang dibimbing oleh dosen ini.
- **Get Advisee Detail**: `GET /api/lecturer/students/:studentId`
  - Mengambil detail data user mahasiswa, profil mahasiswa, dan progres pengerjaan skripsi.

### 📚 Bimbingan (Thesis Supervision)

Dosen pembimbing dapat memantau progres bimbingan mahasiswa (17 tahapan bimbingan), serta menulis catatan bimbingan atau menambahkan berkas pendukung pada tahapan tertentu mahasiswa.

- **List Advisee Bimbingan Stages**: `GET /api/lecturer/bimbingan/:studentId`
  - Mengambil 17 tahapan bimbingan mahasiswa beserta progres, catatan bimbingan (`notes`), dan berkas (`files`) yang diunggah.
- **Get Advisee Stage Detail**: `GET /api/lecturer/bimbingan/:studentId/:stageId`
  - Mengambil detail tahapan tertentu mahasiswa beserta daftar catatan dan berkas.
- **Create Note**: `POST /api/lecturer/bimbingan/:studentId/:stageId/notes`
  - Body: `{"data": Record<string, unknown>}`
- **Update Note**: `PATCH /api/lecturer/bimbingan/:studentId/:stageId/notes/:noteId`
  - Body: `{"data"?: Record<string, unknown>, "completedAt"?: ISOString | null}`
- **Delete Note**: `DELETE /api/lecturer/bimbingan/:studentId/:stageId/notes/:noteId`
- **Upload Stage File**: `POST /api/lecturer/bimbingan/:studentId/:stageId/files`
  - Body: `{"fileName": string, "fileUrl": string, "fileType"?: string, "fileSize"?: number}`
- **Delete Stage File**: `DELETE /api/lecturer/bimbingan/:studentId/:stageId/files/:fileId`

### 💬 Chat Mahasiswa

Komunikasi bimbingan dengan mahasiswa bimbingan secara langsung.

- **List Chat Threads**: `GET /api/lecturer/chat`
  - Mengambil daftar percakapan chat (satu per mahasiswa bimbingan) beserta pesan terakhirnya.
- **List Chat Messages**: `GET /api/lecturer/chat/:studentId?limit=50&offset=0`
  - Mengambil riwayat pesan bimbingan dengan mahasiswa tertentu dengan pagination.
- **Send Message**: `POST /api/lecturer/chat/:studentId`
  - Body: `{"message"?: string, "fileName"?: string, "fileUrl"?: string, "fileType"?: string, "fileSize"?: number}`
  - *Catatan*: `message` atau `fileUrl` wajib diisi (tidak boleh mengirim pesan kosong).

## Admin Features API

All admin endpoints are prefixed with `/api/admin/*` and require authentication (`authMiddleware` + `requireRole("admin", "superadmin")`). Input parameters are validated using Zod.

### 📋 Registrasi Mahasiswa

Admin dapat mereview pendaftaran mahasiswa baru, melihat berkas pendukung (UKT, kontrak, bukti bayar), dan meng-approve atau reject registrasi. **Saat registrasi di-approve**, secara otomatis:
1. Status `student_profile` mahasiswa diubah menjadi `active`.
2. Baris `student_progress` dibuat untuk mahasiswa tersebut (menunjuk tahapan pertama dari 17 tahapan bimbingan), sehingga mahasiswa langsung dapat melihat seluruh 17 tahapan dengan status "belum mulai".

- **List Registrations**: `GET /api/admin/registrations?status=pending`
  - Filter opsional: `?status=pending|approved|rejected`. Default menampilkan semua.
- **Get Registration Detail**: `GET /api/admin/registrations/:id`
  - Menampilkan detail registrasi dengan data mahasiswa, berkas, dan pembayaran.
- **Approve/Reject Registration**: `PATCH /api/admin/registrations/:id`
  - Body: `{"status": "approved" | "rejected"}`
  - Hanya registrasi berstatus `pending` yang bisa diproses. Registrasi yang sudah di-approve atau reject akan mengembalikan error `409`.

### 👥 Manajemen Dosen & Mahasiswa

- **List Lecturers**: `GET /api/admin/lecturers`
  - Menampilkan semua dosen beserta profil dan jumlah mahasiswa bimbingan.
- **List Students**: `GET /api/admin/students`
  - Menampilkan semua mahasiswa beserta profil dan informasi dosen pembimbing.
- **Assign Advisor**: `PATCH /api/admin/students/:studentId/advisor`
  - Body: `{"advisorId": "lecturer-user-id"}`
  - Validasi: mahasiswa harus role `student`, advisor harus role `lecturer`.

## Superadmin Features API

All superadmin endpoints are prefixed with `/api/superadmin/*` and require authentication (`authMiddleware` + `requireRole("superadmin")`). Superadmin juga memiliki akses ke seluruh endpoint admin (`/api/admin/*`).

### 📊 Dashboard

Ringkasan statistik seluruh sistem.

- **Get Dashboard**: `GET /api/superadmin/dashboard`
  - Menampilkan jumlah user per role, status registrasi (pending/approved/rejected), dan status progress mahasiswa (not started/in progress/completed).

### 👤 Manajemen Admin

- **List Admins**: `GET /api/superadmin/admins`
  - Menampilkan semua user dengan role `admin`.
- **Create Admin**: `POST /api/superadmin/admins`
  - Body: `{"name": string, "email": string, "password"?: string}`
  - Password default: `12345678`. Email otomatis terverifikasi.

### 🎓 Buat Akun Dosen

- **Create Lecturer**: `POST /api/superadmin/lecturers`
  - Body: `{"name": string, "email": string, "password"?: string, "nidn"?: string, "campus"?: string, "department"?: string}`
  - Password default: `12345678`. Email otomatis terverifikasi. Profil dosen (`lecturer_profile`) otomatis dibuat.

### 👥 Manajemen User

- **List All Users**: `GET /api/superadmin/users?role=student`
  - Menampilkan semua user beserta profil (student/lecturer). Filter opsional: `?role=student|lecturer|admin|superadmin`.
- **Change User Role**: `PATCH /api/superadmin/users/:id/role`
  - Body: `{"role": "superadmin" | "admin" | "lecturer" | "student"}`
  - Otomatis membuat profil (`student_profile`/`lecturer_profile`) jika belum ada saat ganti role.
  - Tidak bisa mengubah role diri sendiri.
- **Delete User**: `DELETE /api/superadmin/users/:id`
  - Menghapus user beserta seluruh data terkait (cascade). Tidak bisa menghapus akun sendiri.

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3001/api/auth/callback/google`
4. Copy the Client ID and Client Secret to your `.env` file

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with hot reload |
| `bunx drizzle-kit push` | Push schema changes to database |
| `bunx drizzle-kit generate` | Generate Drizzle migrations |
| `bunx drizzle-kit migrate` | Run pending migrations |
| `bunx @better-auth/cli@latest generate --output ./db/auth-schema.ts` | Regenerate auth schema (run after adding auth plugins) |

## API Usage Examples

### Sign Up

```sh
curl -X POST http://localhost:3001/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Sign In

```sh
curl -X POST http://localhost:3001/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Google Sign In

```sh
curl -X POST http://localhost:3001/api/auth/sign-in/social \
  -H "Content-Type: application/json" \
  -d '{"provider": "google", "callbackURL": "http://localhost:3001"}'
```

### Forgot Password (Request Reset Link)

```sh
curl -X POST http://localhost:3001/api/auth/forget-password \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "redirectTo": "http://localhost:5173/reset-password"}'
```

### Reset Password (with Token)

```sh
curl -X POST http://localhost:3001/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"newPassword": "newpassword123", "token": "token-from-email-url"}'
```

### Change Password (while Logged In)

```sh
curl -X POST http://localhost:3001/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"currentPassword": "password123", "newPassword": "newpassword456"}'
```

### Get Session (Check Active Session)

```sh
curl -X GET http://localhost:3001/api/auth/get-session \
  -H "Cookie: better-auth.session_token=..."
```

Response Contoh:
```json
{
  "session": {
    "expiresAt": "2026-07-11T04:08:17.370Z",
    "token": "7UHYBS6MPlKdDLAuOgmU98T8nfbLVxxC",
    "createdAt": "2026-07-04T04:08:17.370Z",
    "updatedAt": "2026-07-04T04:08:17.370Z",
    "ipAddress": "",
    "userAgent": "PostmanRuntime/7.39.1",
    "userId": "y84GD4aSsU1bQDxpO7tPRKzBCs0uGcV0",
    "id": "DKVAvxcwDiMdRiJe27goQ8QYHkkzaBDm"
  },
  "user": {
    "name": "Superadmin SIBITA",
    "email": "superadmin@sibita.com",
    "emailVerified": true,
    "image": null,
    "createdAt": "2026-07-03T06:47:08.611Z",
    "updatedAt": "2026-07-03T06:47:08.677Z",
    "role": "superadmin",
    "id": "y84GD4aSsU1bQDxpO7tPRKzBCs0uGcV0"
  }
}
```


### Update Profile (student)

```sh
curl -X PATCH http://localhost:3001/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "John Updated", "campus": "Universitas Udayana", "studyProgram": "Teknik Informatika", "education": "S1"}'
```

### Update Profile (lecturer)

```sh
curl -X PATCH http://localhost:3001/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "Dr. Jane", "nidn": "0012345678", "campus": "Universitas Udayana", "department": "Informatika", "education": "S3"}'
```

### Admin Update User (activate a lecturer, set quota)

```sh
curl -X PATCH http://localhost:3001/api/users/{user-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"role": "lecturer", "status": "active", "quota": 10}'
```

### Admin Update User (assign advisor to a student)

```sh
curl -X PATCH http://localhost:3001/api/users/{student-user-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"status": "active", "advisorId": "lecturer-user-id"}'
```

### Create Student Profile

```sh
curl -X POST http://localhost:3001/api/student/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"campus": "Universitas Udayana", "nim": "2215091001", "studyProgram": "Teknik Informatika", "education": "S1"}'
```

### Create Student Registration

```sh
curl -X POST http://localhost:3001/api/student/registration \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"paymentOption": "installment_2x"}'
```

### Get My Student Registration Info

```sh
curl -X GET http://localhost:3001/api/student/registration \
  -H "Cookie: better-auth.session_token=..."
```

### Upload Student Registration File

```sh
curl -X POST http://localhost:3001/api/student/registration/files \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"type": "ukt", "fileName": "bukti-ukt.pdf", "fileUrl": "https://example.com/uploads/bukti-ukt.pdf", "fileSize": 102456}'
```

### List Bimbingan Stages (Progress, Notes & Files)

```sh
curl -X GET http://localhost:3001/api/student/bimbingan \
  -H "Cookie: better-auth.session_token=..."
```

### Create Note in Bimbingan Stage

```sh
curl -X POST http://localhost:3001/api/student/bimbingan/{stage-id}/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"data": {"title": "Revisi Judul", "content": "Mengubah judul sesuai arahan dosen pembimbing"}}'
```

### Update Note in Bimbingan Stage

```sh
curl -X PATCH http://localhost:3001/api/student/bimbingan/{stage-id}/notes/{note-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"data": {"title": "Revisi Judul", "content": "Judul disetujui: Penerapan AI pada SIBITA"}, "completedAt": "2026-07-02T12:00:00.000Z"}'
```

### Upload File to Bimbingan Stage

```sh
curl -X POST http://localhost:3001/api/student/bimbingan/{stage-id}/files \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"fileName": "draft-proposal.pdf", "fileUrl": "https://example.com/uploads/draft-proposal.pdf", "fileType": "application/pdf", "fileSize": 2048000}'
```

### List Advisor Chat Messages

```sh
curl -X GET "http://localhost:3001/api/student/chat?limit=20&offset=0" \
  -H "Cookie: better-auth.session_token=..."
```

### Send Message to Advisor

```sh
curl -X POST http://localhost:3001/api/student/chat \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"message": "Selamat pagi Pak, saya sudah mengunggah draf proposal bimbingan tahap 1."}'
```

### Get Lecturer Profile

```sh
curl -X GET http://localhost:3001/api/lecturer/profile \
  -H "Cookie: better-auth.session_token=..."
```

### List Lecturer Advisees

```sh
curl -X GET http://localhost:3001/api/lecturer/students \
  -H "Cookie: better-auth.session_token=..."
```

### List Advisee Bimbingan Stages

```sh
curl -X GET http://localhost:3001/api/lecturer/bimbingan/{student-id} \
  -H "Cookie: better-auth.session_token=..."
```

### Create Note in Advisee Stage

```sh
curl -X POST http://localhost:3001/api/lecturer/bimbingan/{student-id}/{stage-id}/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"data": {"title": "Catatan Dosen", "content": "Silakan lanjut ke bab berikutnya"}}'
```

### List Chat Threads for Lecturer

```sh
curl -X GET http://localhost:3001/api/lecturer/chat \
  -H "Cookie: better-auth.session_token=..."
```

### Send Chat Message to Advisee

```sh
curl -X POST http://localhost:3001/api/lecturer/chat/{student-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"message": "Selamat pagi, revisi Anda sudah saya periksa."}'
```

### List All Registrations (Admin)

```sh
curl -X GET "http://localhost:3001/api/admin/registrations?status=pending" \
  -H "Cookie: better-auth.session_token=..."
```

### Approve a Registration (Admin)

```sh
curl -X PATCH http://localhost:3001/api/admin/registrations/{registration-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"status": "approved"}'
```

### List All Lecturers (Admin)

```sh
curl -X GET http://localhost:3001/api/admin/lecturers \
  -H "Cookie: better-auth.session_token=..."
```

### List All Students (Admin)

```sh
curl -X GET http://localhost:3001/api/admin/students \
  -H "Cookie: better-auth.session_token=..."
```

### Assign Advisor to Student (Admin)

```sh
curl -X PATCH http://localhost:3001/api/admin/students/{student-id}/advisor \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"advisorId": "lecturer-user-id"}'
```

### Get Superadmin Dashboard

```sh
curl -X GET http://localhost:3001/api/superadmin/dashboard \
  -H "Cookie: better-auth.session_token=..."
```

### Create Admin Account (Superadmin)

```sh
curl -X POST http://localhost:3001/api/superadmin/admins \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "Admin Baru", "email": "admin.baru@sibita.com"}'
```

### Create Lecturer Account (Superadmin)

```sh
curl -X POST http://localhost:3001/api/superadmin/lecturers \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "Dr. Dosen Baru", "email": "dosen.baru@sibita.com", "nidn": "0012345678", "campus": "Universitas Negeri", "department": "Teknik Informatika"}'
```

### List All Users (Superadmin)

```sh
curl -X GET "http://localhost:3001/api/superadmin/users?role=lecturer" \
  -H "Cookie: better-auth.session_token=..."
```

### Change User Role (Superadmin)

```sh
curl -X PATCH http://localhost:3001/api/superadmin/users/{user-id}/role \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"role": "lecturer"}'
```

### Delete User (Superadmin)

```sh
curl -X DELETE http://localhost:3001/api/superadmin/users/{user-id} \
  -H "Cookie: better-auth.session_token=..."
```

## License

Private — All rights reserved.
