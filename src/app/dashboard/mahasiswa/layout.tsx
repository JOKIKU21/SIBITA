import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { getServerSession } from "@/lib/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function MahasiswaDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/masuk");
  }

  if (session.user.role !== "student") {
    const rolePaths: Record<string, string> = {
      student: "/dashboard/mahasiswa",
      lecturer: "/dashboard/dosen",
      admin: "/dashboard/admin",
      superadmin: "/dashboard/superadmin",
    };
    const targetPath = rolePaths[session.user.role] || "/dashboard/mahasiswa";
    redirect(targetPath);
  }

  // Student profile check: redirect to /registrasi if profile not active or has no advisor
  let shouldRedirectToRegistrasi = false;
  try {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";
    const apiURL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const profileRes = await fetch(`${apiURL}/api/student/profile`, {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!profileRes.ok) {
      shouldRedirectToRegistrasi = true;
    } else {
      const profile = await profileRes.json();
      if (!profile || profile.status !== "active" || !profile.advisor) {
        shouldRedirectToRegistrasi = true;
      }
    }
  } catch (error) {
    console.error("Student profile check in layout failed:", error);
    shouldRedirectToRegistrasi = true;
  }

  if (shouldRedirectToRegistrasi) {
    redirect("/registrasi");
  }

  return (
    <ProgressProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}

