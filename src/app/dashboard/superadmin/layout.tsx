import { Sidebar } from "@/components/dashboard/Sidebar";
import { requireRole } from "@/lib/auth-guard";
import type { ReactNode } from "react";

export default async function SuperAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole("superadmin");

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
        {children}
      </div>
    </div>
  );
}

