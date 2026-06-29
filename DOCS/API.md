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

### Role-Based Access

| Role | Permissions |
|------|-------------|
| `superadmin` | Semua akses, termasuk assign role superadmin |
| `admin` | CRUD user, assign role (kecuali superadmin) |
| `lecturer` | Akses fitur dosen (coming soon) |
| `student` | Akses fitur mahasiswa (coming soon) |

### Protected Routes

Use the `authMiddleware` to protect any route. It validates the session and exposes `user` and `session` on the Hono context:

```ts
app.get("/api/protected", authMiddleware, (c) => {
    const user = c.get("user");
    return c.json({ user });
});
```

## API Usage Examples

### Sign Up

```sh
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Sign In

```sh
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Google Sign In

```sh
curl -X POST http://localhost:3000/api/auth/sign-in/social \
  -H "Content-Type: application/json" \
  -d '{"provider": "google", "callbackURL": "http://localhost:3000"}'
```

### Forgot Password (Request Reset Link)

```sh
curl -X POST http://localhost:3000/api/auth/forget-password \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "redirectTo": "http://localhost:5173/reset-password"}'
```

### Reset Password (with Token)

```sh
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"newPassword": "newpassword123", "token": "token-from-email-url"}'
```

### Change Password (while Logged In)

```sh
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"currentPassword": "password123", "newPassword": "newpassword456"}'
```

### Update Profile (student)

```sh
curl -X PATCH http://localhost:3000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "John Updated", "campus": "Universitas Udayana", "studyProgram": "Teknik Informatika", "education": "S1"}'
```

### Update Profile (lecturer)

```sh
curl -X PATCH http://localhost:3000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "Dr. Jane", "nidn": "0012345678", "campus": "Universitas Udayana", "department": "Informatika", "education": "S3"}'
```

### Admin Update User (activate a lecturer, set quota)

```sh
curl -X PATCH http://localhost:3000/api/users/{user-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"role": "lecturer", "status": "active", "quota": 10}'
```

### Admin Update User (assign advisor to a student)

```sh
curl -X PATCH http://localhost:3000/api/users/{student-user-id} \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"status": "active", "advisorId": "lecturer-user-id"}'
```