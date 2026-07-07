// ponytail: Server Component layout
import { SuperAdminSidebar } from "@/components/dashboard/superadmin/SuperAdminSidebar";
import type { ReactNode } from "react";

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <SuperAdminSidebar />
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
        {children}
      </div>
    </div>
  );
}
