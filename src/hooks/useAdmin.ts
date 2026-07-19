"use client";

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { adminService } from "@/services/admin";

/** Centralised query keys for admin data — keeps invalidation typo-proof. */
export const adminKeys = {
  all: ["admin"] as const,
  summary: () => [...adminKeys.all, "summary"] as const,
  registrations: (status?: string, search?: string) => [...adminKeys.all, "registrations", status || "all", search || ""] as const,
  registrationDetail: (id: string) => [...adminKeys.all, "registration", id] as const,
  payments: (search?: string) => [...adminKeys.all, "payments", search || ""] as const,
  lecturers: (search?: string) => [...adminKeys.all, "lecturers", search || ""] as const,
  students: (search?: string) => [...adminKeys.all, "students", search || ""] as const,
};

/** Fetch summary stats. */
export function useAdminSummary() {
  return useQuery({
    queryKey: adminKeys.summary(),
    queryFn: () => adminService.getSummary(),
    staleTime: 30_000,
  });
}

/** Fetch student registrations. */
export function useAdminRegistrations(status?: "pending" | "approved" | "rejected", search?: string) {
  return useQuery({
    queryKey: adminKeys.registrations(status, search),
    queryFn: () => adminService.getRegistrations(status, search),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

/** Fetch detail of a student registration. */
export function useAdminRegistrationDetail(id: string) {
  return useQuery({
    queryKey: adminKeys.registrationDetail(id),
    queryFn: () => adminService.getRegistrationDetail(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}

/** Update registration status (approve/reject). */
export function useUpdateRegistrationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) =>
      adminService.updateRegistrationStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.registrations() });
      queryClient.invalidateQueries({ queryKey: adminKeys.registrationDetail(variables.id) });
      queryClient.invalidateQueries({ queryKey: adminKeys.summary() });
      queryClient.invalidateQueries({ queryKey: adminKeys.students() });
    },
  });
}

/** Fetch all payment records. */
export function useAdminPayments(search?: string) {
  return useQuery({
    queryKey: adminKeys.payments(search),
    queryFn: () => adminService.getPayments(search),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

/** Update a payment installment status. */
export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      status,
      note,
    }: {
      paymentId: string;
      status: "processing" | "paid" | "rejected";
      note?: string;
    }) => adminService.updatePaymentStatus(paymentId, status, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.payments() });
    },
  });
}

/** Fetch list of all lecturers. */
export function useAdminLecturers(search?: string) {
  return useQuery({
    queryKey: adminKeys.lecturers(search),
    queryFn: () => adminService.getLecturers(search),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useAdminStudents(search?: string) {
  return useQuery({
    queryKey: adminKeys.students(search),
    queryFn: () => adminService.getStudents(search),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

/** Assign an advisor to a student. */
export function useAssignAdvisor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, advisorId }: { studentId: string; advisorId: string }) =>
      adminService.assignAdvisor(studentId, advisorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.students() });
      queryClient.invalidateQueries({ queryKey: adminKeys.lecturers() });
    },
  });
}

/** Update a student's active status. */
export function useUpdateStudentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, status }: { studentId: string; status: "active" | "nonactive" | "ended" }) =>
      adminService.updateStudentStatus(studentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.students() });
      queryClient.invalidateQueries({ queryKey: adminKeys.summary() });
    },
  });
}
