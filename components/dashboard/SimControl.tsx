export default function SimControl({
  simulatedDay,
  onAdvance,
}: {
  simulatedDay: number;
  onAdvance: (delta: number) => void;
}) {
  return (
    <div className="sim-control">
      <span className="sim-label">
        Simulasi Hari ke- <strong>{simulatedDay}</strong>
      </span>
      <div className="sim-buttons">
        <button className="sim-btn" onClick={() => onAdvance(-1)}>
          ‹ Mundur 1 Hari
        </button>
        <button className="sim-btn sim-btn-primary" onClick={() => onAdvance(1)}>
          Maju 1 Hari ›
        </button>
      </div>
    </div>
  );
}
