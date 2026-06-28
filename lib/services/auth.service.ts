import { authClient } from "@/lib/auth-client";

// ─── Types ─────────────────────────────────────────────

export type AuthResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

// Role enum matching the backend schema
export type UserRole = "superadmin" | "admin" | "lecturer" | "student";

// Map backend role → frontend dashboard path
const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  superadmin: "/dashboard/superadmin",
  admin: "/dashboard/admin",
  lecturer: "/dashboard/dosen",
  student: "/dashboard/mahasiswa",
};

export function getDashboardPath(role: UserRole): string {
  return ROLE_DASHBOARD_MAP[role] ?? "/dashboard/mahasiswa";
}

// ─── Sign Up ───────────────────────────────────────────

export async function signUp(
  payload: SignUpPayload,
): Promise<AuthResult<{ email: string }>> {
  try {
    const { data, error } = await authClient.signUp.email({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      return { success: false, error: error.message ?? "Pendaftaran gagal" };
    }

    return { success: true, data: { email: data?.user?.email ?? payload.email } };
  } catch {
    return { success: false, error: "Terjadi kesalahan jaringan" };
  }
}

// ─── Sign In ───────────────────────────────────────────

export async function signIn(
  payload: SignInPayload,
): Promise<AuthResult<{ redirectTo: string }>> {
  try {
    const { data, error } = await authClient.signIn.email({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      return { success: false, error: error.message ?? "Login gagal" };
    }

    const role = (data?.user as { role?: UserRole })?.role ?? "student";
    return { success: true, data: { redirectTo: getDashboardPath(role) } };
  } catch {
    return { success: false, error: "Terjadi kesalahan jaringan" };
  }
}

// ─── Google OAuth ──────────────────────────────────────

export async function signInWithGoogle(): Promise<void> {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
}

// ─── Send Email OTP ────────────────────────────────────

export async function sendEmailOTP(
  email: string,
  type: "email-verification" | "sign-in" | "forget-password" = "email-verification",
): Promise<AuthResult> {
  try {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type,
    });

    if (error) {
      return { success: false, error: error.message ?? "Gagal mengirim OTP" };
    }

    return { success: true, data: null };
  } catch {
    return { success: false, error: "Terjadi kesalahan jaringan" };
  }
}

// ─── Verify Email OTP ──────────────────────────────────

export async function verifyEmailOTP(
  email: string,
  otp: string,
): Promise<AuthResult> {
  try {
    const { error } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });

    if (error) {
      return { success: false, error: error.message ?? "Kode OTP tidak valid" };
    }

    return { success: true, data: null };
  } catch {
    return { success: false, error: "Terjadi kesalahan jaringan" };
  }
}

// ─── Sign Out ──────────────────────────────────────────

export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      return { success: false, error: error.message ?? "Gagal logout" };
    }

    return { success: true, data: null };
  } catch {
    return { success: false, error: "Terjadi kesalahan jaringan" };
  }
}

// ─── Get Session ───────────────────────────────────────

export async function getSession() {
  try {
    const { data, error } = await authClient.getSession();

    if (error || !data) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}
