"use client";

interface StageBarProps {
  currentStage: number;
  completedStages: Set<number>;
  onStageClick: (stage: number) => void;
}

const GROUPS = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16],
];

function stageToGroupIndex(stage: number): number {
  if (stage <= 5) return 0;
  if (stage <= 10) return 1;
  return 2;
}

export default function StageBar({ currentStage, completedStages, onStageClick }: StageBarProps) {
  const activeGroupIndex = stageToGroupIndex(currentStage);
  const activeGroup = GROUPS[activeGroupIndex];

  return (
    <div>
      {/* Stage circles */}
      <div className="stage-bar">
        {activeGroup.map((stageNum) => {
          const isCurrent = stageNum === currentStage;
          const isDone = completedStages.has(stageNum);

          const circleStyle: React.CSSProperties = {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: isDone && !isCurrent ? "#6FE3A6" : isCurrent ? "#fff" : "#D9D9D9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDone && !isCurrent ? "#fff" : isCurrent ? "#2B3BAF" : "#9CA3AF",
            fontWeight: 700,
            fontSize: "18px",
            border: isCurrent ? "3px solid #fff" : "3px solid transparent",
            boxShadow: isCurrent ? "0 0 0 4px rgba(255,255,255,0.25)" : "none",
            transition: "all 0.2s",
          };

          return (
            <button
              key={stageNum}
              onClick={() => onStageClick(stageNum)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                position: "relative",
                zIndex: 1,
                cursor: "pointer",
                background: "none",
                border: "none",
                flex: 1,
              }}
            >
              <div style={circleStyle}>
                {isDone && !isCurrent ? "✓" : stageNum}
              </div>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>
                Tahap {stageNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Group navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => {
            const prevGroupFirstStage = GROUPS[activeGroupIndex - 1]?.[0];
            if (prevGroupFirstStage != null) onStageClick(prevGroupFirstStage);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#2B3BAF",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "6px 4px",
            transition: "opacity 0.2s",
            visibility: activeGroupIndex === 0 ? "hidden" : "visible",
          }}
        >
          ‹ Tahap Sebelumnya
        </button>
        <button
          onClick={() => {
            const nextGroupFirstStage = GROUPS[activeGroupIndex + 1]?.[0];
            if (nextGroupFirstStage != null) onStageClick(nextGroupFirstStage);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#2B3BAF",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "6px 4px",
            transition: "opacity 0.2s",
            visibility: activeGroupIndex === GROUPS.length - 1 ? "hidden" : "visible",
          }}
        >
          Tahap Selanjutnya ›
        </button>
      </div>
    </div>
  );
}
