"use client";

interface TopbarProps {
  title: string;
  avatarInitial: string;
}

export default function Topbar({ title, avatarInitial }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <button className="topbar-notif" title="Notifikasi">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#6B7280" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="notif-dot" />
        </button>
        <div className="topbar-avatar">{avatarInitial}</div>
      </div>
    </div>
  );
}
