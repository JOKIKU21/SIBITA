"use client";

import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { lecturerService, type GetLecturerProfileResponse } from "@/services/lecturer";

/** Centralised query keys for lecturer data — keeps invalidation typo-proof. */
export const lecturerKeys = {
  all: ["lecturer"] as const,
  profile: () => [...lecturerKeys.all, "profile"] as const,
  summary: () => [...lecturerKeys.all, "summary"] as const,
  students: () => [...lecturerKeys.all, "students"] as const,
  studentProgress: (studentId: string) => [...lecturerKeys.students(), studentId] as const,
  studentStageDetail: (studentId: string, stageId?: string) => [...lecturerKeys.students(), studentId, "detail", stageId || ""] as const,
  chatThreads: () => [...lecturerKeys.all, "chatThreads"] as const,
  chatMessages: (studentId: string, stageId?: string) => [...lecturerKeys.all, "chat", studentId, stageId || ""] as const,
};

/** Read the current lecturer's profile. */
export function useLecturerProfile(options?: Omit<UseQueryOptions<GetLecturerProfileResponse>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: lecturerKeys.profile(),
    queryFn: () => lecturerService.getProfile(),
    staleTime: 5 * 60_000,
    ...options,
  });
}

/** Update the current lecturer's profile. */
export function useUpdateLecturerProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      name?: string;
      nidn?: string;
      campus?: string;
      department?: string;
      phoneNumber?: string;
    }) => lecturerService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lecturerKeys.profile() });
    },
  });
}

/** Read the lecturer's dashboard stats summary. */
export function useLecturerDashboardSummary() {
  return useQuery({
    queryKey: lecturerKeys.summary(),
    queryFn: () => lecturerService.getDashboardSummary(),
    staleTime: 30_000,
  });
}

/** Read all students guided by this lecturer. */
export function useLecturerStudents() {
  return useQuery({
    queryKey: lecturerKeys.students(),
    queryFn: () => lecturerService.getStudents(),
    staleTime: 30_000,
  });
}

/** Read a specific student's bimbingan progress. */
export function useLecturerStudentProgress(studentId: string) {
  return useQuery({
    queryKey: lecturerKeys.studentProgress(studentId),
    queryFn: () => lecturerService.getStudentProgress(studentId),
    enabled: !!studentId,
    staleTime: 30_000,
  });
}

/** Read a specific student's stage details. */
export function useLecturerStudentStageDetail(studentId: string, stageId?: string) {
  return useQuery({
    queryKey: lecturerKeys.studentStageDetail(studentId, stageId),
    queryFn: () => lecturerService.getStudentStageDetail(studentId, stageId!),
    enabled: !!studentId && !!stageId,
    staleTime: 30_000,
  });
}

/** Fetch chat messages for a specific student and stage. */
export function useLecturerChatMessages(studentId: string, stageId?: string) {
  return useQuery({
    queryKey: lecturerKeys.chatMessages(studentId, stageId),
    queryFn: () => lecturerService.getChatMessages(studentId, stageId!),
    enabled: !!studentId && !!stageId,
    staleTime: 5_000,
  });
}

/** Send a chat message to a student. */
export function useLecturerSendChatMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      stageId,
      payload,
    }: {
      studentId: string;
      stageId: string;
      payload: { message?: string; fileName?: string; fileUrl?: string; fileType?: string; fileSize?: number };
    }) => lecturerService.sendChatMessage(studentId, stageId, payload),
    onSuccess: (_, { studentId, stageId }) => {
      queryClient.invalidateQueries({ queryKey: lecturerKeys.chatMessages(studentId, stageId) });
      queryClient.invalidateQueries({ queryKey: lecturerKeys.chatThreads() });
    },
  });
}

/** Fetch all chat threads for the lecturer. */
export function useLecturerChatThreads() {
  return useQuery({
    queryKey: lecturerKeys.chatThreads(),
    queryFn: () => lecturerService.getChatThreads(),
    staleTime: 10_000,
  });
}

/** Mutation to approve a student's stage bimbingan and advance progress. */
export function useLecturerApproveStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      stageId,
    }: {
      studentId: string;
      stageId: string;
    }) => lecturerService.approveStage(studentId, stageId),
    onSuccess: (_, { studentId, stageId }) => {
      // Invalidate both the stage details and student progress / lists
      queryClient.invalidateQueries({ queryKey: lecturerKeys.studentStageDetail(studentId, stageId) });
      queryClient.invalidateQueries({ queryKey: lecturerKeys.studentProgress(studentId) });
      queryClient.invalidateQueries({ queryKey: lecturerKeys.students() });
    },
  });
}
