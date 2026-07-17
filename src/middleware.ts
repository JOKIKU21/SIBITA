import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAuthPath = ["/masuk", "/daftar", "/verifikasi"].includes(pathname);
  const isOnboardingPath = pathname === "/registrasi" || pathname.startsWith("/registrasi/");

  if (isDashboardPath || isAuthPath || isOnboardingPath) {
    const cookieHeader = request.headers.get("cookie") || "";
    const apiURL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiURL}/api/auth/get-session`, {
        headers: {
          cookie: cookieHeader,
        },
        credentials: "include",
        cache: "no-store",
      });

      const session = res.ok ? await res.json() : null;
      const hasActiveSession = session && session.user;

      const rolePaths: Record<string, string> = {
        student: "/dashboard/mahasiswa",
        lecturer: "/dashboard/dosen",
        admin: "/dashboard/admin",
        superadmin: "/dashboard/superadmin",
      };

      if (hasActiveSession) {
        const role = session.user.role || "student";
        const targetPath = rolePaths[role] || "/dashboard/mahasiswa";

        // Redirect logged-in users away from auth pages to their dashboard
        if (isAuthPath) {
          return NextResponse.redirect(new URL(targetPath, request.url));
        }

        // If they are visiting /registrasi but they are NOT a student, redirect to their role's dashboard
        if (isOnboardingPath && role !== "student") {
          return NextResponse.redirect(new URL(targetPath, request.url));
        }

        // If they are a student visiting /registrasi, redirect to dashboard if profile is already active and they have an advisor
        if (isOnboardingPath && role === "student") {
          try {
            const profileRes = await fetch(`${apiURL}/api/student/profile`, {
              headers: {
                cookie: cookieHeader,
              },
              credentials: "include",
              cache: "no-store",
            });

            if (profileRes.ok) {
              const profile = await profileRes.json();
              if (profile && profile.status === "active" && profile.advisor) {
                return NextResponse.redirect(new URL(targetPath, request.url));
              }
            }
          } catch (e) {
            console.error("Auth middleware profile check on onboarding path failed:", e);
          }
        }

        // Redirect root dashboard path to role-specific dashboard
        if (pathname === "/dashboard" || pathname === "/dashboard/") {
          return NextResponse.redirect(new URL(targetPath, request.url));
        }

        // Route protection based on roles
        const pathRoleMap = [
          { prefix: "/dashboard/mahasiswa", allowedRole: "student" },
          { prefix: "/dashboard/dosen", allowedRole: "lecturer" },
          { prefix: "/dashboard/admin", allowedRole: "admin" },
          { prefix: "/dashboard/superadmin", allowedRole: "superadmin" },
        ];

        for (const rule of pathRoleMap) {
          if (pathname === rule.prefix || pathname.startsWith(rule.prefix + "/")) {
            if (role !== rule.allowedRole) {
              return NextResponse.redirect(new URL(targetPath, request.url));
            }

            // Students must have an active profile AND an assigned advisor to access the dashboard
            if (role === "student") {
              try {
                const profileRes = await fetch(`${apiURL}/api/student/profile`, {
                  headers: {
                    cookie: cookieHeader,
                  },
                  credentials: "include",
                  cache: "no-store",
                });

                if (!profileRes.ok) {
                  // Profile doesn't exist (e.g. 404) or fetch failed
                  return NextResponse.redirect(new URL("/registrasi", request.url));
                }

                const profile = await profileRes.json();
                if (!profile || profile.status !== "active" || !profile.advisor) {
                  return NextResponse.redirect(new URL("/registrasi", request.url));
                }
              } catch (e) {
                console.error("Auth middleware student profile check failed:", e);
                return NextResponse.redirect(new URL("/registrasi", request.url));
              }
            }
          }
        }
      } else {
        if (isDashboardPath || isOnboardingPath) {
          return NextResponse.redirect(new URL("/masuk", request.url));
        }
      }
    } catch (error) {
      console.error("Auth middleware session check failed:", error);
      if (isDashboardPath || isOnboardingPath) {
        return NextResponse.redirect(new URL("/masuk", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/masuk",
    "/daftar",
    "/verifikasi",
    "/registrasi",
    "/registrasi/:path*",
  ],
};
