interface StageData {
  n: number;
  name: string;
  days: number;
}

interface StageStatus {
  pct: number;
  colorKey: string;
  label: string;
  startDay: number;
  deadlineDay: number;
}

interface ProgressTableProps {
  stages: StageData[];
  stageStatuses: Record<number, StageStatus>;
  onOpenStage: (n: number) => void;
}

export default function ProgressTable({ stages, stageStatuses, onOpenStage }: ProgressTableProps) {
  return (
    <div className="progress-table">
      <div className="progress-table-head">
        <div className="pt-col pt-col-step">TAHAPAN</div>
        <div className="pt-col pt-col-progress">PROGRES</div>
        <div className="pt-col pt-col-status">STATUS</div>
        <div className="pt-col pt-col-action"></div>
      </div>
      <div>
        {stages.map((s) => {
          const status = stageStatuses[s.n] || {
            pct: 0,
            colorKey: "grey",
            label: "Belum Mulai",
            startDay: 0,
            deadlineDay: 0,
          };
          return (
            <div className="progress-row" key={s.n}>
              <div className="pt-col-step">
                <span className="pt-step-badge">Tahap {s.n}</span>
                <div className="pt-step-name">{s.name}</div>
                <div className="pt-step-days">
                  {s.days} Hari &middot; Hari ke-{status.startDay}–{status.deadlineDay}
                </div>
              </div>
              <div className="pt-col-progress">
                <div className="pt-progress-track">
                  <div
                    className={`pt-progress-fill fill-${status.colorKey}`}
                    style={{ width: `${status.pct}%` }}
                  />
                </div>
                <div className="pt-progress-text">{status.pct}%</div>
              </div>
              <div className="pt-col-status">
                <span className={`pt-status-pill status-${status.colorKey}`}>
                  <span className="pt-status-dot" />
                  {status.label}
                </span>
              </div>
              <div className="pt-col-action">
                <button className="pt-open-btn" onClick={() => onOpenStage(s.n)}>
                  Buka ›
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
