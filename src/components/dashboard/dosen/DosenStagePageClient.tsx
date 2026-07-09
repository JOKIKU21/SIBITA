"use client";

import Link from "next/link";
import type { Stage } from "@/lib/stages";
import { getStageMetadata } from "@/lib/stages";
import { StageForm } from "@/components/dashboard/StageForm";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import {
  useLecturerStudents,
  useLecturerStudentProgress,
  useLecturerStudentStageDetail,
} from "@/hooks/useLecturer";
import { DosenNoteInput } from "@/components/dashboard/dosen/DosenNoteInput";
import { DosenFileUpload } from "@/components/dashboard/dosen/DosenFileUpload";
import { ApprovalCheckbox } from "@/components/dashboard/dosen/ApprovalCheckbox";

interface DosenStagePageClientProps {
  userId: string;
  stage: Omit<Stage, "icon">;
}

export function DosenStagePageClient({ userId, stage }: DosenStagePageClientProps) {
  // 1. Fetch student progress list to get the UUID of this stage
  const { data: progressData, isLoading: isProgressLoading } = useLecturerStudentProgress(userId);
  const backendStage = progressData?.stages?.find((s) => s.order === stage.n);
  const stageId = backendStage?.id;
  const metadata = getStageMetadata(stage.n, backendStage);

  // 2. Fetch notes & files for this stage
  const { data: detailData, isLoading: isDetailLoading } = useLecturerStudentStageDetail(userId, stageId);
  const existingNote = detailData?.notes?.[0];
  const existingFiles = detailData?.files || [];

  // 3. Fetch student list to get name, NIM, and current active stage
  const { data: studentsData, isLoading: isStudentsLoading } = useLecturerStudents();
  const student = (studentsData?.students ?? []).find((s) => s.studentId === userId);
  const studentName = student?.name || "Mahasiswa";
  const studentNim = student?.nim || "";

  const activeOrder = student?.currentStage?.order ?? 0;
  const isApproved = activeOrder > stage.n || (student?.progressPercentage === 100);

  const isLoading = isProgressLoading || isDetailLoading || isStudentsLoading;

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <Link
          href={`/dashboard/dosen/bimbingan/${userId}`}
          className="inline-flex items-center gap-1.5 bg-transparent border-none text-neutral-muted text-[13px] font-semibold cursor-pointer p-0 mb-4.5 transition-[color] duration-150 hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Progress Mahasiswa
        </Link>

        <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 mb-6">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="inline-block bg-white/18 text-white text-[12.5px] font-bold py-1.25 px-3.5 rounded-full">
              Tahap {stage.n}
            </span>
            <span className="text-white/80 text-[13px] font-medium border-l border-white/20 pl-3">
              {studentName} {studentNim ? `(${studentNim})` : ""}
            </span>
          </div>
          <div className="text-white text-5.5 font-extrabold leading-[1.3] font-display">{metadata.name}</div>
          <div className="text-white/80 text-3.5 mt-3 leading-normal font-normal">
            {metadata.desc}
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-neutral-muted font-medium bg-white rounded-3.5 border border-neutral-border animate-pulse">
            Memuat detail tahapan mahasiswa...
          </div>
        ) : (
          <div className="grid grid-cols-[1.4fr_1fr] gap-5 items-stretch max-[980px]:grid-cols-1">
            {/* Kolom Kiri: Detail & Form Dosen */}
            <div className="flex flex-col gap-5">
              <StageForm
                stage={stage}
                stageId={stageId}
                existingNote={existingNote}
                existingFiles={existingFiles}
                readOnly={true}
              />
              <DosenNoteInput initialNote="" />
              <DosenFileUpload />
              <ApprovalCheckbox initialApproved={isApproved} />
            </div>

            {/* Kolom Kanan: Chat Panel */}
            <div className="flex flex-col">
              <ChatPanel stageId={stageId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
