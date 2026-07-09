"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentService,
  type ChangePasswordPayload,
  type StudentProfile,
  type UpdateProfilePayload,
} from "@/services/student";

/** Centralised query keys for student profile data — keeps invalidation typo-proof. */
export const studentKeys = {
  all: ["student"] as const,
  profile: () => [...studentKeys.all, "profile"] as const,
};

/** Centralised query keys for student bimbingan data. */
export const bimbinganKeys = {
  all: ["student", "bimbingan"] as const,
  list: () => [...bimbinganKeys.all, "list"] as const,
  detail: (stageId: string) => [...bimbinganKeys.all, "detail", stageId] as const,
};

/** Read the current student's profile. */
export function useStudentProfile(options?: any) {
  return useQuery({
    queryKey: studentKeys.profile(),
    queryFn: () => studentService.getProfile(),
    ...options,
  });
}

/**
 * Update the profile. On success we seed the cache with the server's response
 * (when it echoes the profile back) and invalidate so any stale reader refetches.
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      studentService.updateProfile(payload),
    onSuccess: (updated) => {
      if (updated && typeof updated === "object" && "name" in updated) {
        queryClient.setQueryData<StudentProfile>(studentKeys.profile(), updated);
      }
      queryClient.invalidateQueries({ queryKey: studentKeys.profile() });
    },
  });
}

/** Change the signed-in user's password. */
export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      studentService.changePassword(payload),
  });
}

/** Get overall bimbingan stages and progress. */
export function useStudentBimbingan() {
  return useQuery({
    queryKey: bimbinganKeys.list(),
    queryFn: () => studentService.getBimbingan(),
  });
}

/** Get detail notes and files for a specific stage. */
export function useStudentBimbinganDetail(stageId?: string) {
  return useQuery({
    queryKey: bimbinganKeys.detail(stageId || ""),
    queryFn: () => studentService.getBimbinganDetail(stageId!),
    enabled: !!stageId,
  });
}

/** Create a new note. */
export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stageId, data }: { stageId: string; data: Record<string, unknown> }) =>
      studentService.createNote(stageId, data),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Update an existing note (data and/or completedAt). */
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stageId,
      noteId,
      payload,
    }: {
      stageId: string;
      noteId: string;
      payload: { data?: Record<string, unknown>; completedAt?: string | null };
    }) => studentService.updateNote(stageId, noteId, payload),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Add a file to the stage. */
export function useCreateFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stageId,
      payload,
    }: {
      stageId: string;
      payload: { fileName: string; fileUrl: string; fileType?: string; fileSize?: number };
    }) => studentService.createFile(stageId, payload),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Delete a file from the stage. */
export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stageId, fileId }: { stageId: string; fileId: string }) =>
      studentService.deleteFile(stageId, fileId),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: bimbinganKeys.detail(stageId) });
    },
  });
}

/** Fetch chat messages for a specific stage. */
export function useChatMessages(stageId?: string) {
  return useQuery({
    queryKey: ["student", "chat", stageId || ""],
    queryFn: () => studentService.getChatMessages(stageId!),
    enabled: !!stageId,
  });
}

/** Send a chat message. */
export function useSendChatMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stageId,
      payload,
    }: {
      stageId: string;
      payload: { message?: string; fileName?: string; fileUrl?: string; fileType?: string; fileSize?: number };
    }) => studentService.sendChatMessage(stageId, payload),
    onSuccess: (_, { stageId }) => {
      queryClient.invalidateQueries({ queryKey: ["student", "chat", stageId] });
    },
  });
}
