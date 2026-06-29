"use client";

import { useState, useCallback } from "react";

interface TaskPanelProps {
  currentStage: number;
}

const TASKS_PER_STAGE: Record<number, string[]> = {
  1: [
    "Menentukan topik penelitian",
    "Menentukan permasalahan penelitian",
    "Menentukan judul penelitian",
  ],
  2: [
    "Menyusun BAB I (Pendahuluan)",
    "Menyusun BAB II (Tinjauan Pustaka)",
    "Menyusun BAB III (Metode Penelitian)",
  ],
  3: ["Mengajukan proposal untuk review dosen pembimbing"],
  4: ["Memperbaiki proposal sesuai dengan masukan dosen pembimbing"],
  5: ["Menyiapkan presentasi ujian proposal"],
  6: ["Membuat instrumen penelitian"],
  7: ["Meminta validasi instrumen kepada dosen pembimbing"],
  8: ["Mengumpulkan data penelitian sesuai instrumen"],
  9: ["Melakukan analisis data dengan metode yang dipilih"],
  10: [
    "Menulis hasil penelitian",
    "Menulis hasil dan interpretasi data",
  ],
  11: ["Mengajukan Bab IV untuk review dosen pembimbing"],
  12: ["Memperbaiki Bab IV untuk review dosen pembimbing"],
  13: [
    "Menulis kesimpulan penelitian",
    "Menulis saran dan rekomendasi",
  ],
  14: ["Menggabungkan seluruh naskah menjadi satu dokumen utuh"],
  15: ["Mengajukan naskah akhir untuk review dosen pembimbing"],
  16: [
    "Melengkapi seluruh persyaratan administrasi sidang",
    "Mengikuti sidang tugas akhir",
    "Melakukan revisi naskah akhir",
  ],
};

export default function TaskPanel({ currentStage }: TaskPanelProps) {
  const tasks = TASKS_PER_STAGE[currentStage] || [];
  const [prevStage, setPrevStage] = useState(currentStage);
  const [checked, setChecked] = useState<boolean[]>(() => new Array(tasks.length).fill(false));

  if (currentStage !== prevStage) {
    setPrevStage(currentStage);
    setChecked(new Array(tasks.length).fill(false));
  }

  const toggle = useCallback((i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }, []);

  const total = tasks.length;
  const done = checked.filter(Boolean).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="panel">
      <div className="panel-header">Daftar Tugas</div>
      <div className="task-progress">
        <div className="task-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="task-list">
        {tasks.map((task, i) => (
          <label
            key={`${currentStage}-${i}`}
            className={`task-item ${checked[i] ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
            />
            {task}
          </label>
        ))}
      </div>
    </div>
  );
}
