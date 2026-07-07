"use client";

// ponytail: feedback textarea + approve checkbox per tahapan
import { useState } from "react";

interface DosenFeedbackFormProps {
  tahapanNumber: number;
  tahapanName: string;
  initialFeedback?: string;
  initialApproved?: boolean;
}

export function DosenFeedbackForm({
  tahapanNumber,
  tahapanName,
  initialFeedback = "",
  initialApproved = false,
}: DosenFeedbackFormProps) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [approved, setApproved] = useState(initialApproved);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    // ponytail: frontend-only, no API call
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="border border-neutral-border rounded-3 p-5 bg-white">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-bg text-brand text-[12px] font-bold shrink-0">
            {tahapanNumber}
          </span>
          <h4 className="text-[14px] font-bold text-neutral-text">{tahapanName}</h4>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={approved}
            onChange={(e) => setApproved(e.target.checked)}
            className="w-4.5 h-4.5 rounded-1 border-2 border-neutral-border accent-success cursor-pointer"
          />
          <span className={`text-[12.5px] font-bold transition-colors duration-150 ${approved ? "text-success" : "text-neutral-muted group-hover:text-neutral-text"}`}>
            {approved ? "Disetujui ✓" : "Setujui Tahapan"}
          </span>
        </label>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Tulis catatan/feedback untuk mahasiswa..."
        rows={3}
        className="w-full bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-[13px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light resize-y"
      />

      <div className="flex items-center justify-between mt-3">
        <div className="text-[11.5px] text-neutral-muted">
          {feedback.length > 0 ? `${feedback.length} karakter` : "Belum ada catatan"}
        </div>
        <div className="flex items-center gap-2">
          {saved ? (
            <span className="text-[12px] text-success font-semibold animate-pulse">Tersimpan ✓</span>
          ) : null}
          <button
            type="button"
            onClick={handleSave}
            className="bg-brand text-white border-none py-2 px-4 rounded-2 text-[12.5px] font-bold cursor-pointer transition-[background] duration-200 hover:bg-brand-dark"
          >
            Simpan Catatan
          </button>
        </div>
      </div>
    </div>
  );
}
