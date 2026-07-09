"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lecturerService } from "@/services/lecturer";

/** Centralised query keys for lecturer data — keeps invalidation typo-proof. */
export const lecturerKeys = {
  all: ["lecturer"] as const,
  profile: () => [...lecturerKeys.all, "profile"] as const,
  summary: () => [...lecturerKeys.all, "summary"] as const,
  students: () => [...lecturerKeys.all, "students"] as const,
};

/** Read the current lecturer's profile. */
export function useLecturerProfile(options?: any) {
  return useQuery({
    queryKey: lecturerKeys.profile(),
    queryFn: () => lecturerService.getProfile(),
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
  });
}

/** Read all students guided by this lecturer. */
export function useLecturerStudents() {
  return useQuery({
    queryKey: lecturerKeys.students(),
    queryFn: () => lecturerService.getStudents(),
  });
}

/** Read a specific student's bimbingan progress. */
export function useLecturerStudentProgress(studentId: string) {
  return useQuery({
    queryKey: [...lecturerKeys.students(), studentId] as const,
    queryFn: () => lecturerService.getStudentProgress(studentId),
    enabled: !!studentId,
  });
}

/** Read a specific student's stage details. */
export function useLecturerStudentStageDetail(studentId: string, stageId?: string) {
  return useQuery({
    queryKey: [...lecturerKeys.students(), studentId, "detail", stageId || ""] as const,
    queryFn: () => lecturerService.getStudentStageDetail(studentId, stageId!),
    enabled: !!studentId && !!stageId,
  });
}
