import { Sidebar } from "@/components/dashboard/Sidebar";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/masuk");
  }

  if (session.user.role !== "admin") {
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
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
        {children}
      </div>
    </div>
  );
}

