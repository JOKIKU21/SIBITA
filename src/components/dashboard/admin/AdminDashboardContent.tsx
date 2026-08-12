"use client";

import { useAdminSummary, useAdminLecturers, useAdminDashboard } from "@/hooks/useAdmin";
import { AdminStatCards } from "./AdminStatCards";
import { DosenBimbinganList } from "./DosenBimbinganList";
import { AdminCharts } from "./AdminCharts";
import { AdminStudentTable } from "./AdminStudentTable";

export function AdminDashboardContent() {
  const { data: summaryData, isLoading: isSummaryLoading, error: summaryError, refetch: refetchSummary } = useAdminSummary();
  const { data: lecturersData, isLoading: isLecturersLoading, error: lecturersError, refetch: refetchLecturers } = useAdminLecturers();
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError, refetch: refetchDashboard } = useAdminDashboard();

  const isLoading = isSummaryLoading || isLecturersLoading || isDashboardLoading;
  const isError = summaryError || lecturersError || dashboardError;

  const handleRetry = () => {
    refetchSummary();
    refetchLecturers();
    refetchDashboard();
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white border border-neutral-border rounded-3.5" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 max-[1100px]:grid-cols-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white border border-neutral-border rounded-3.5" />
          ))}
        </div>
        <div className="h-64 bg-white border border-neutral-border rounded-3.5" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-danger-bg/20 border border-danger/20 rounded-3.5 p-6 text-center text-danger">
        <p className="text-[14px] font-bold mb-3">Gagal mengambil data dashboard admin.</p>
        <button
          onClick={handleRetry}
          className="bg-danger text-white border-none text-[13px] font-bold py-2 px-5 rounded-2.25 cursor-pointer hover:bg-danger-dark transition-colors duration-150"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const defaultStats = {
    totalDosen: 0,
    totalMahasiswa: 0,
    totalBimbinganBerjalan: 0,
    totalBimbingan: 0,
  };

  return (
    <div className="space-y-6">
      <AdminStatCards stats={summaryData || defaultStats} />

      {dashboardData && (
        <AdminCharts
          stageDistribution={dashboardData.stageDistribution}
          registrationStatus={dashboardData.registrationStatus}
          paymentStatus={dashboardData.paymentStatus}
        />
      )}

      <DosenBimbinganList lecturerList={lecturersData?.lecturers || []} />

      {dashboardData && (
        <AdminStudentTable students={dashboardData.studentProgress} />
      )}
    </div>
  );
}
