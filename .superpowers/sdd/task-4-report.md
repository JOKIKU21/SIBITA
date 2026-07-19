# Task 4 Report: DRY Layout Auth Guards — Extract Shared Utility

## Overview
We refactored all 4 dashboard layout files (`admin`, `dosen`, `mahasiswa`, `superadmin`) to extract duplicate auth guard code into a shared `src/lib/auth-guard.ts` helper function `requireRole(allowedRole: string)`.

## Changes Implemented
1. **Created `src/lib/auth-guard.ts`**:
   - Implemented `requireRole(allowedRole: string)` helper.
   - It fetches the active session using `getServerSession()`.
   - Redirects to `/masuk` if not authenticated.
   - Redirects to the user's correct dashboard path (using role-to-path mapping) if the user's role does not match the allowed role.
   - Returns the active session when allowedRole matches.
2. **Refactored Layouts**:
   - `src/app/dashboard/admin/layout.tsx`: Replaced individual session retrieval and checks with `await requireRole("admin")`.
   - `src/app/dashboard/dosen/layout.tsx`: Replaced checks with `await requireRole("lecturer")`.
   - `src/app/dashboard/mahasiswa/layout.tsx`: Replaced checks with `await requireRole("student")`, preserving the student profile check correctly.
   - `src/app/dashboard/superadmin/layout.tsx`: Replaced checks with `await requireRole("superadmin")`.

## Files Changed
- `src/lib/auth-guard.ts` (New file)
- `src/app/dashboard/admin/layout.tsx` (Modified)
- `src/app/dashboard/dosen/layout.tsx` (Modified)
- `src/app/dashboard/mahasiswa/layout.tsx` (Modified)
- `src/app/dashboard/superadmin/layout.tsx` (Modified)

## Verification
- Ran `npm run build` locally.
- Build succeeded without any TypeScript compiler or Next.js build errors.
- Verified that all layouts compile successfully with the new `requireRole` helper.

## Self-Review Findings
- **Completeness**: All 4 layouts were refactored, and the student layout profile check from Task 2 was retained intact.
- **Quality**: The shared utility avoids code duplication and centralizes the role-to-dashboard redirection mapping.
- **Testing**: Application compiles cleanly.
