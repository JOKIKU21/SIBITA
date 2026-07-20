# SIBITA Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengoptimasi proyek SIBITA (Next.js 16 + React 19) dari sisi performa, keamanan, dan kualitas kode berdasarkan best practices Next.js 16, Vercel React Guidelines, dan Cache Components.

**Architecture:** Proyek SIBITA adalah sistem bimbingan tugas akhir (skripsi) berbasis Next.js 16.2.9 dengan Better Auth untuk autentikasi. Backend terpisah di-proxy melalui Next.js rewrites. Optimasi berfokus pada 8 area: Security, Performance, RSC Boundaries, Error Handling, Metadata/SEO, Caching, Code Quality, dan Accessibility.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, TanStack Query v5, Better Auth v1.6.23, Tailwind CSS v4, TypeScript 5

## Global Constraints

- Next.js 16.2.9 — gunakan fitur terbaru (`cacheComponents`, async `params`/`cookies`/`headers`)
- React 19 — manfaatkan `use()`, `useActionState`, Server Actions jika applicable
- Semua perubahan harus backward-compatible, tidak boleh break fitur existing
- Setiap task harus bisa di-test/verifikasi secara independen
- Pastikan `npm run build` sukses setelah setiap task

---

### Task 1: Deduplikasi Session Fetching dengan `React.cache()`

**Files:**
- Modify: `src/lib/auth-server.ts`

**Interfaces:**
- Produces: `getServerSession()` yang di-wrap `React.cache()` — signature sama, behavior internal berubah

- [ ] **Step 1: Wrap `getServerSession` dengan `React.cache()`**
- [ ] **Step 2: Hapus `credentials: "include"` (dead code di server-side fetch)**
- [ ] **Step 3: Verifikasi build**

---

### Task 2: Optimasi Middleware — Kurangi Backend Round-trips

**Files:**
- Modify: `src/middleware.ts`
- Modify: `src/app/dashboard/mahasiswa/layout.tsx`

**Interfaces:**
- Produces: Middleware yang lebih lean dengan maximal 1 fetch call

- [ ] **Step 1: Pindahkan student profile check dari middleware ke mahasiswa layout**
- [ ] **Step 2: Tambahkan student profile check di mahasiswa layout**
- [ ] **Step 3: Fix security — hapus permissive role fallback**
- [ ] **Step 4: Verifikasi build dan test navigasi**

---

### Task 3: Error Boundaries — `error.tsx`, `global-error.tsx`, `not-found.tsx`

**Files:**
- Create: `src/app/global-error.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/dashboard/error.tsx`
- Create: `src/app/dashboard/admin/error.tsx`
- Create: `src/app/dashboard/dosen/error.tsx`
- Create: `src/app/dashboard/dosen/bimbingan/[userId]/not-found.tsx`
- Create: `src/app/dashboard/mahasiswa/error.tsx`
- Create: `src/app/dashboard/superadmin/error.tsx`

**Interfaces:**
- Produces: Error boundary components untuk setiap route segment utama

- [ ] **Step 1: Buat `global-error.tsx`**
- [ ] **Step 2: Buat `not-found.tsx` root**
- [ ] **Step 3: Buat `error.tsx` untuk setiap dashboard segment**
- [ ] **Step 4: Buat `not-found.tsx` untuk dynamic dosen routes**
- [ ] **Step 5: Verifikasi build**

---

### Task 4: DRY Layout Auth Guards — Extract Shared Utility

**Files:**
- Create: `src/lib/auth-guard.ts`
- Modify: `src/app/dashboard/admin/layout.tsx`
- Modify: `src/app/dashboard/dosen/layout.tsx`
- Modify: `src/app/dashboard/mahasiswa/layout.tsx`
- Modify: `src/app/dashboard/superadmin/layout.tsx`

**Interfaces:**
- Produces: `requireRole(allowedRole: string)` — shared function yang mengembalikan session atau redirect

- [ ] **Step 1: Buat `auth-guard.ts`**
- [ ] **Step 2: Refactor semua 4 dashboard layout untuk menggunakan `requireRole()`**
- [ ] **Step 3: Verifikasi build dan test access control**

---

### Task 5: React Query Hooks — `staleTime`, Missing Hooks, Query Key Consistency

**Files:**
- Modify: `src/hooks/useAdmin.ts`
- Modify: `src/hooks/useLecturer.ts`
- Modify: `src/hooks/useStudent.ts`
- Modify: `src/hooks/useReferenceFiles.ts`

**Interfaces:**
- Produces: Semua hooks dengan `staleTime` yang proper, missing hooks ditambahkan, query keys konsisten

- [ ] **Step 1: Tambahkan `staleTime` ke semua query hooks**
- [ ] **Step 2: Tambahkan `"use client"` ke `useReferenceFiles.ts`**
- [ ] **Step 3: Buat missing hooks**
- [ ] **Step 4: Konsistenkan query keys — gunakan factory pattern di semua hooks**
- [ ] **Step 5: Fix `any` types di hook options**
- [ ] **Step 6: Verifikasi build**

---

### Task 6: Metadata & SEO — `metadataBase`, OG Images, `robots.txt`, `sitemap.xml`

**Files:**
- Modify: `src/app/layout.tsx` (tambah `metadataBase` + title template)
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

**Interfaces:**
- Produces: Comprehensive metadata setup, `robots.txt`, `sitemap.xml`

- [ ] **Step 1: Tambahkan `metadataBase` dan title template di root layout**
- [ ] **Step 2: Buat `robots.ts`**
- [ ] **Step 3: Buat `sitemap.ts`**
- [ ] **Step 4: Verifikasi build**

---

### Task 7: Loading States — `loading.tsx` untuk Semua Route Segments

**Files:**
- Create: `src/app/dashboard/admin/loading.tsx`
- Create: `src/app/dashboard/dosen/loading.tsx`
- Create: `src/app/dashboard/dosen/bimbingan/loading.tsx`
- Create: `src/app/dashboard/superadmin/loading.tsx`
- Create: `src/app/dashboard/loading.tsx`

**Interfaces:**
- Produces: Loading skeleton UI untuk setiap dashboard section

- [ ] **Step 1: Buat template loading skeleton**
- [ ] **Step 2: Buat loading.tsx untuk setiap section**
- [ ] **Step 3: Verifikasi**

---

### Task 8: Code Quality — Fix `any` Types dan `dangerouslySetInnerHTML`

**Files:**
- Modify: `src/components/dashboard/ProfilForm.tsx` (fix `user as any`)
- Modify: `src/components/onboarding/RegistrationFlow.tsx` (fix `activeRegistration` as `any`)
- Modify: `src/components/onboarding/FileDropzone.tsx` (fix `files?: any[]`)
- Modify: `src/components/dashboard/StageCard.tsx` (replace `dangerouslySetInnerHTML` dengan React SVG components)

**Interfaces:**
- Produces: Type-safe components tanpa `any` dan tanpa `dangerouslySetInnerHTML`

- [ ] **Step 1: Define proper types di shared `types/` directory**
- [ ] **Step 2: Replace `any` types dengan proper interfaces**
- [ ] **Step 3: Replace `dangerouslySetInnerHTML` di StageCard**
- [ ] **Step 4: Verifikasi build**

---

### Task 9: Performance — Memoize Computed Values dan Extract Module-level Constants

**Files:**
- Modify: `src/components/Input.tsx` (extract `variantStyles`/`sizeStyles`)
- Modify: `src/components/dashboard/Sidebar.tsx` (extract SVG icons dan `menuConfig`)
- Modify: `src/components/dashboard/ReferensiClient.tsx` (extract helper functions)
- Modify: `src/components/dashboard/StagePageClient.tsx` (add `useMemo` untuk `mergedStages`)
- Modify: `src/components/stage/MahasiswaChatPanel.tsx` (add `useMemo` untuk `chats`)

**Interfaces:**
- Produces: Components dengan proper memoization dan module-level constants

- [ ] **Step 1: Extract objects yang di-recreate setiap render ke module level**
- [ ] **Step 2: Memoize computed values**
- [ ] **Step 3: Extract Sidebar SVG icons ke file terpisah**
- [ ] **Step 4: Verifikasi build**

---

### Task 10: Accessibility Quick Wins

**Files:**
- Modify: `src/components/FileUploader.tsx` (add keyboard nav, ARIA)
- Modify: `src/components/Input.tsx` (add `aria-describedby` untuk errors)
- Modify: `src/components/dashboard/Sidebar.tsx` (add `aria-label`, `aria-current`)
- Modify: `src/components/dashboard/StageCard.tsx` (add `aria-hidden` pada SVGs)

**Interfaces:**
- Produces: Components yang accessible sesuai WCAG 2.1 Level A

- [ ] **Step 1: FileUploader — tambahkan keyboard accessibility**
- [ ] **Step 2: Input — hubungkan error message ke input**
- [ ] **Step 3: Sidebar — tambahkan navigation ARIA attributes**
- [ ] **Step 4: Verifikasi**

---

### Task 11: Next.js Config Enhancement

**Files:**
- Modify: `next.config.ts`

**Interfaces:**
- Produces: Next.js config yang optimal

- [ ] **Step 1: Tambahkan konfigurasi yang direkomendasikan**
- [ ] **Step 2: Verifikasi build**

---

### Task 12: Konsolidasi CSS Design Tokens

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Single source of truth untuk design tokens

- [ ] **Step 1: Audit dan konsolidasi tokens**
- [ ] **Step 2: Ganti hardcoded colors**
- [ ] **Step 3: Verifikasi visual**

---

### Task 13: Hapus/Gate Hardcoded Dummy Data

**Files:**
- Modify: `src/lib/admin-data.ts`
- Modify: `src/lib/superadmin-data.ts`

**Interfaces:**
- Produces: Clean data layer tanpa hardcoded dummy stats

- [ ] **Step 1: Evaluasi penggunaan `getAdminStats()` dan `getSuperAdminStats()`**
- [ ] **Step 2: Remove atau replace hardcoded values**
- [ ] **Step 3: Verifikasi build**
