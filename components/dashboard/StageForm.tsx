"use client";

import { useState } from "react";

interface StageFormProps {
  currentStage: number;
  onComplete: (stage: number) => void;
}

/* ── Checklist sub-component ── */
function ChecklistBlock({
  id,
  items,
}: {
  id: string;
  items: string[];
}) {
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));
  const total = items.length;
  const done = checked.filter(Boolean).length;

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="dform-group">
      <label>
        Checklist Revisi<span className="req">*</span>
      </label>
      <div className="checklist-progress">
        {done}/{total} item selesai
      </div>
      <div className="checklist-box" id={id}>
        {items.map((item, i) => (
          <label
            key={i}
            className={`checklist-item ${checked[i] ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

/* ── Compare revision sub-component ── */
function CompareRevision({
  oldText,
  newText,
}: {
  oldText: string;
  newText: string;
}) {
  return (
    <>
      <div className="panel-header" style={{ borderTop: "1px solid var(--border)" }}>Perbandingan Revisi</div>
      <div className="panel-body">
        <div className="compare-grid">
          <div className="compare-card compare-old">
            <h4>Versi Sebelumnya</h4>
            <p>{oldText}</p>
          </div>
          <div className="compare-card compare-new">
            <h4>Versi Terbaru</h4>
            <p>{newText}</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Dropzone ── */
function Dropzone() {
  return <div className="dropzone">Choose a file or drag &amp; drop it here</div>;
}

/* ── Form actions ── */
function FormActions({ stage, onComplete }: { stage: number; onComplete: (s: number) => void }) {
  return (
    <div className="dform-actions">
      <button className="btn-cancel" type="button">
        Batal
      </button>
      <button className="btn-done" type="button" onClick={() => onComplete(stage)}>
        Selesai
      </button>
    </div>
  );
}

/* ── Stage form definitions ── */
const STAGE_FORMS: Record<
  number,
  { title: string; render: (onComplete: (s: number) => void) => React.ReactNode }
> = {
  1: {
    title: "Diskusi Konsep dan Judul Penelitian",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Topik Penelitian<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Permasalahan Penelitian<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Judul Penelitian<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Alasan Penelitian<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={1} onComplete={onComplete} />
      </div>
    ),
  },
  2: {
    title: "Penyusunan Proposal Penelitian",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Ringkasan Proposal<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Tujuan Penelitian<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Kontribusi yang Diharapkan<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={2} onComplete={onComplete} />
      </div>
    ),
  },
  3: {
    title: "Konsultasi Dosen Pembimbing (ke-1)",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Catatan Diskusi<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Pertanyaan untuk Pembimbing<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={3} onComplete={onComplete} />
      </div>
    ),
  },
  4: {
    title: "Revisi Proposal Penelitian",
    render: (onComplete) => (
      <>
        <div className="panel-body">
          <div className="dform-group">
            <label>Ringkasan Revisi<span className="req">*</span></label>
            <textarea className="dform-textarea" />
          </div>
          <div className="dform-group">
            <label>Unggah Dokumen<span className="req">*</span></label>
            <Dropzone />
          </div>
          <FormActions stage={4} onComplete={onComplete} />
        </div>
        <CompareRevision
          oldText="Bab I masih belum mencakup latar belakang yang komprehensif. Pernyataan masalah kurang spesifik dan tujuan penelitian belum terukur."
          newText="Bab I telah diperluas dengan latar belakang yang kuat. Pernyataan masalah diperinci dan tujuan penelitian menggunakan indikator yang terukur."
        />
      </>
    ),
  },
  5: {
    title: "Persiapan dan Ujian Proposal",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Pilih Jadwal Ujian<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Unggah Proposal Final<span className="req">*</span></label>
          <Dropzone />
        </div>
        <div className="dform-group">
          <label>Unggah PPT Ujian<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={5} onComplete={onComplete} />
      </div>
    ),
  },
  6: {
    title: "Penyusunan Instrumen Penelitian",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Jenis Instrumen<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Metode Validasi<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={6} onComplete={onComplete} />
      </div>
    ),
  },
  7: {
    title: "Konsultasi Dosen Pembimbing (ke-2)",
    render: (onComplete) => (
      <>
        <div className="panel-body">
          <div className="dform-group">
            <label>Ringkasan Revisi<span className="req">*</span></label>
            <textarea className="dform-textarea" />
          </div>
          <div className="dform-group">
            <label>Unggah Dokumen<span className="req">*</span></label>
            <Dropzone />
          </div>
          <FormActions stage={7} onComplete={onComplete} />
        </div>
        <CompareRevision
          oldText="Instrumen penelitian masih belum sepenuhnya mencerminkan indikator pada variabel penelitian. Beberapa butir pertanyaan bersifat ambigu dan berpotensi menimbulkan interpretasi ganda."
          newText="Instrumen telah disesuaikan dengan indikator variabel penelitian. Redaksi pertanyaan diperjelas sehingga lebih mudah dipahami dan meminimalkan bias interpretasi."
        />
      </>
    ),
  },
  8: {
    title: "Pengambilan Data Penelitian",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Progres Pegambilan Data<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Jumlah Partisipan<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={8} onComplete={onComplete} />
      </div>
    ),
  },
  9: {
    title: "Pengolahan Data Penelitian",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Metode Analisis<span className="req">*</span></label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Ringkasan Temuan<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={9} onComplete={onComplete} />
      </div>
    ),
  },
  10: {
    title: "Penyusunan BAB IV",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Temuan Utama<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Ringkasan Pembahasan<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={10} onComplete={onComplete} />
      </div>
    ),
  },
  11: {
    title: "Konsultasi Dosen Pembimbing (ke-3)",
    render: (onComplete) => (
      <>
        <div className="panel-body">
          <div className="dform-group">
            <label>Ringkasan Revisi<span className="req">*</span></label>
            <textarea className="dform-textarea" />
          </div>
          <div className="dform-group">
            <label>Unggah Dokumen<span className="req">*</span></label>
            <Dropzone />
          </div>
          <FormActions stage={11} onComplete={onComplete} />
        </div>
        <CompareRevision
          oldText="Tabel dan grafik telah disajikan, namun beberapa visualisasi belum memiliki interpretasi yang memadai. Pembaca masih kesulitan memahami makna dari data yang ditampilkan."
          newText="Setiap tabel dan grafik telah dilengkapi dengan interpretasi yang jelas serta penjelasan mengenai implikasi hasil penelitian, sehingga informasi yang disajikan lebih mudah dipahami."
        />
      </>
    ),
  },
  12: {
    title: "Revisi BAB IV",
    render: (onComplete) => (
      <div className="panel-body">
        <ChecklistBlock
          id="checklist-12"
          items={[
            "Perbaikan sistematika penulisan hasil penelitian",
            "Penambahan analisis statistik yang diminta",
            "Revisi interpretasi data sesuai masukan",
            "Pembaruan tabel dan grafik",
            "Koreksi referensi pada Bab IV",
          ]}
        />
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={12} onComplete={onComplete} />
      </div>
    ),
  },
  13: {
    title: "Penyusunan BAB V",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Ringkasan Kesimpulan<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Saran<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={13} onComplete={onComplete} />
      </div>
    ),
  },
  14: {
    title: "PENYUSUNAN BAB I sd BAB V",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Catatan Draft Final<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={14} onComplete={onComplete} />
      </div>
    ),
  },
  15: {
    title: "Konsultasi Dosen Pembimbing (ke-4)",
    render: (onComplete) => (
      <div className="panel-body">
        <div className="dform-group">
          <label>Ringkasan Revisi<span className="req">*</span></label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={15} onComplete={onComplete} />
      </div>
    ),
  },
  16: {
    title: "Persiapan Ujian Akhir & Revisi Naskah Akhir",
    render: (onComplete) => (
      <div className="panel-body">
        <ChecklistBlock
          id="checklist-16"
          items={[
            "Naskah tugas akhir telah disetujui oleh pembimbing",
            "Dokumen administrasi lengkap",
            "Slide presentasi sudah siap",
            "Formulir pendaftaran sidang telah diisi",
            "Bukti bebas teori",
          ]}
        />
        <div className="dform-group">
          <label>Hasil Ujian</label>
          <input className="dform-input" type="text" />
        </div>
        <div className="dform-group">
          <label>Ringkasan Revisi Akhir</label>
          <textarea className="dform-textarea" />
        </div>
        <div className="dform-group">
          <label>Unggah Dokumen<span className="req">*</span></label>
          <Dropzone />
        </div>
        <FormActions stage={16} onComplete={onComplete} />
      </div>
    ),
  },
};

export default function StageForm({ currentStage, onComplete }: StageFormProps) {
  const form = STAGE_FORMS[currentStage];
  if (!form) return null;

  return (
    <div className="panel">
      <div className="panel-header">{form.title}</div>
      {form.render(onComplete)}
    </div>
  );
}
