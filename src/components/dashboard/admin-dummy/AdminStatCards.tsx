// ponytail: Server Component — pure presentation. Extracted StatCard for reusability. Data can be passed as props later for real-time updates.
import React from 'react';

export function StatCard({ title, value, icon, iconBg, subStats, extra }: any) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 leading-none">{value}</div>
          <div className="text-xs font-medium text-gray-500 mt-1">{title}</div>
        </div>
      </div>
      
      <div className="flex gap-4 mt-6">
        {subStats.map((stat: any, i: number) => (
          <div key={i} className="flex-1">
            <div className={`text-lg font-semibold ${stat.valueClass || 'text-gray-900'}`}>{stat.value}</div>
            <div className="text-[11px] text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
      {extra}
    </div>
  );
}

export function AdminStatCards() {
  const cards = [
    {
      title: "Total Dosen",
      value: "1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-600">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-blue-100",
      subStats: [
        { label: "Bimbingan Hari Ini", value: "0" },
        { label: "Total Tahapan", value: "17" }
      ]
    },
    {
      title: "Total Mahasiswa",
      value: "3",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-600">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-green-100",
      subStats: [
        { label: "Aktif Bimbingan", value: "1" },
        { label: "Selesai", value: "2" }
      ]
    },
    {
      title: "Bimbingan Berjalan",
      value: "2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-600">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-orange-100",
      subStats: [
        { label: "Lewat Deadline", value: "2", valueClass: "text-red-600 font-bold" },
        { label: "Akan Dimulai", value: "0" }
      ]
    },
    {
      title: "Total Bimbingan",
      value: "2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-teal-600">
          <path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12v5c0 2 2.67 4 6 4s6-2 6-4v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      iconBg: "bg-teal-100",
      subStats: [
        { label: "Progres Keseluruhan", value: "0%" }
      ],
      extra: (
        <div className="absolute right-4 bottom-4 text-teal-200 opacity-50">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path d="M0 40L15 25L30 30L60 0V40H0Z" fill="currentColor" />
            <path d="M0 40L15 25L30 30L60 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
}
