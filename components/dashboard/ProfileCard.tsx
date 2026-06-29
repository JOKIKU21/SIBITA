export default function ProfileCard({ overallProgress }: { overallProgress: number }) {
  return (
    <div className="profile-card">
      <div className="profile-avatar">👤</div>
      <div className="profile-info">
        <div className="profile-name">Tih Indriani</div>
        <div className="profile-meta">Sistem Informasi &middot; Universitas Islam Negeri Mataram</div>
      </div>
      <div className="profile-overall">
        <span className="profile-overall-value">{overallProgress}%</span>
        <span className="profile-overall-label">Progres Keseluruhan</span>
      </div>
    </div>
  );
}
