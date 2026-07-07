// ponytail: Server Component layout — no 'use client', no ProgressProvider needed
import { DosenSidebar } from "@/components/dashboard/dosen/DosenSidebar";
import type { ReactNode } from "react";

export default function DosenDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <DosenSidebar />
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
        {children}
      </div>
    </div>
  );
}
