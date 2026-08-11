// ponytail: Server Component — main dashboard assembly
import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AdminStatCards } from "./AdminStatCards";
import { AdminCharts } from "./AdminCharts";
import { AdminStudentTable } from "./AdminStudentTable";

export function AdminDashboardContent() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F8FF]">
      <Sidebar roleOverride="admin" isDummy={true} />
      <div className="flex-1 min-w-0 max-[600px]:w-full p-7 max-[600px]:p-4">
        
        {/* Header section */}
        <div className="flex justify-between items-start mb-6 max-[600px]:flex-col max-[600px]:gap-4">
          <div>
            <h1 className="text-[22px] font-extrabold text-neutral-text mb-1 font-display">Dashboard Admin</h1>
            <p className="text-[13px] text-neutral-muted font-medium">Ringkasan dosen, bimbingan, dan progres mahasiswa.</p>
          </div>
          
          {/* Simple Date Picker Mock */}
          <button className="flex items-center gap-2 bg-white border border-neutral-border rounded-lg px-4 py-2 text-[13px] font-medium text-neutral-text shadow-sm hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-neutral-muted">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            19 Mei - 26 Mei 2025
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-neutral-muted ml-1">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <AdminStatCards />
        <AdminCharts />
        <AdminStudentTable />
      </div>
    </div>
  );
}
