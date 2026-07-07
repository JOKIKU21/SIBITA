// ponytail: Server Component layout — no 'use client'
import { AdminSidebar } from "@/components/dashboard/admin/AdminSidebar";
import type { ReactNode } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
        {children}
      </div>
    </div>
  );
}
