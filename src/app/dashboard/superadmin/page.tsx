// ponytail: Server Component — dashboard with gradient cards + ringkasan admin
import { SuperAdminStatCards } from "@/components/dashboard/superadmin/SuperAdminStatCards";
import { AdminRingkasanTable } from "@/components/dashboard/superadmin/AdminRingkasanTable";
import { getSuperAdminStats } from "@/lib/superadmin-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Super Admin | SIBITA",
};

export default function SuperAdminDashboardPage() {
  const stats = getSuperAdminStats();

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Dashboard Super Admin</h2>
          <p className="text-3.5 text-neutral-muted">Ringkasan keseluruhan sistem SIBITA.</p>
        </div>

        <SuperAdminStatCards stats={stats} />

        <AdminRingkasanTable />
      </div>
    </div>
  );
}
