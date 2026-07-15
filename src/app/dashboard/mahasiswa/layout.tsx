import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { getServerSession } from "@/lib/auth-server";
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

