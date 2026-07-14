import { apiFetch } from "@/lib/api-client";

// --- Types for Admin Service ---

export interface AdminSummaryResponse {
  totalDosen: number;
  totalMahasiswa: number;
  totalBimbinganBerjalan: number;
  totalBimbingan: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role?: string;
}

export interface StudentDetail {
  userId: string;
  nim: string;
  studyProgram: string;
  campus: string;
  user: UserInfo;
}

export interface FileItem {
  id: string;
  registrationId: string;
  name: string;
  url: string;
  key?: string;
  createdAt: string;
}

export interface PaymentItem {
  id: string;
  registrationId: string;
  installment: number;
  amount: number;
  status: "paid" | "pending" | "processing" | "rejected";
  paidAt: string | null;
  files: any[];
}

export interface RegistrationItem {
  id: string;
  studentId: string;
  status: "pending" | "approved" | "rejected";
  totalAmount: number;
  paymentOption: "installment" | "full";
  createdAt: string;
  student: StudentDetail;
  files: FileItem[];
  payments: PaymentItem[];
  approvedBy?: string | null;
  approvedAt?: string | null;
  rejectedReason?: string | null;
  approver?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface RegistrationDetailItem extends RegistrationItem {
  approvedBy: string | null;
  approvedAt: string | null;
  rejectedReason?: string | null;
  approver?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface GetRegistrationsResponse {
  registrations: RegistrationItem[];
}

export interface GetRegistrationDetailResponse {
  registration: RegistrationDetailItem;
}

export interface AdminInstallmentItem {
  id: string;
  installment: number;
  amount: number;
  status: "paid" | "pending" | "processing" | "rejected";
  paidAt: string | null;
}

export interface AdminPaymentRecord {
  registrationId: string;
  studentId: string;
  studentName: string;
  totalAmount: number;
  paidAmount: number;
  paymentOption: "installment" | "full";
  status: "pending" | "approved" | "rejected";
  payments: AdminInstallmentItem[];
}

export interface GetAdminPaymentsResponse {
  payments: AdminPaymentRecord[];
}

export interface UpdatePaymentStatusResponse {
  payment: {
    id: string;
    registrationId: string;
    installment: number;
    amount: number;
    status: "paid" | "pending" | "processing" | "rejected";
    paidAt: string | null;
    note?: string | null;
    createdAt: string;
  };
}

export interface LecturerItem {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  activeAdviseeCount: number;
}

export interface GetLecturersResponse {
  lecturers: LecturerItem[];
}

export interface StudentItem {
  id: string;
  name: string;
  email: string;
  campus: string;
  nim: string;
  studyProgram: string;
  phoneNumber: string;
  status: "active" | "nonactive" | "ended";
  progressPercentage: number;
  advisorName: string | null;
}

export interface GetStudentsResponse {
  students: StudentItem[];
}

export interface StudentProfileDetail {
  campus: string;
  nim: string;
  studyProgram: string;
  title: string | null;
  education: string | null;
  status: "active" | "nonactive" | "ended";
  advisorId: string | null;
  advisor?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface StudentWithProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  studentProfile: StudentProfileDetail | null;
}

export interface AssignAdvisorResponse {
  student: StudentWithProfile;
}

export interface UpdateStudentStatusResponse {
  student: StudentWithProfile;
}

// --- Admin Service Implementation ---

export const adminService = {
  /** Get system summary statistics. */
  getSummary() {
    return apiFetch<AdminSummaryResponse>("/api/admin/summary", {
      method: "GET",
    });
  },

  /** List student registrations with optional status filter and search query. */
  getRegistrations(status?: "pending" | "approved" | "rejected", search?: string) {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    const queryString = params.toString();
    const url = queryString ? `/api/admin/registrations?${queryString}` : "/api/admin/registrations";
    return apiFetch<GetRegistrationsResponse>(url, {
      method: "GET",
    });
  },

  /** Get details of a single registration. */
  getRegistrationDetail(id: string) {
    return apiFetch<GetRegistrationDetailResponse>(`/api/admin/registrations/${id}`, {
      method: "GET",
    });
  },

  /** Approve or reject a student registration. */
  updateRegistrationStatus(id: string, status: "approved" | "rejected") {
    return apiFetch<GetRegistrationDetailResponse>(`/api/admin/registrations/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** Fetch all payment records with optional search query for admin management. */
  getPayments(search?: string) {
    const url = search ? `/api/admin/payments?search=${encodeURIComponent(search)}` : "/api/admin/payments";
    return apiFetch<GetAdminPaymentsResponse>(url, {
      method: "GET",
    });
  },

  /** Update a specific payment installment status. */
  updatePaymentStatus(paymentId: string, status: "processing" | "paid" | "rejected", note?: string) {
    return apiFetch<UpdatePaymentStatusResponse>(`/api/admin/payments/${paymentId}`, {
      method: "PATCH",
      body: JSON.stringify({ status, note }),
    });
  },

  /** List all lecturers with optional search query. */
  getLecturers(search?: string) {
    const url = search ? `/api/admin/lecturers?search=${encodeURIComponent(search)}` : "/api/admin/lecturers";
    return apiFetch<GetLecturersResponse>(url, {
      method: "GET",
    });
  },

  /** List all students with optional search query. */
  getStudents(search?: string) {
    const url = search ? `/api/admin/students?search=${encodeURIComponent(search)}` : "/api/admin/students";
    return apiFetch<GetStudentsResponse>(url, {
      method: "GET",
    });
  },

  /** Assign a thesis advisor to a student. */
  assignAdvisor(studentId: string, advisorId: string) {
    return apiFetch<AssignAdvisorResponse>(`/api/admin/students/${studentId}/advisor`, {
      method: "PATCH",
      body: JSON.stringify({ advisorId }),
    });
  },

  /** Update a student's active status. */
  updateStudentStatus(studentId: string, status: "active" | "nonactive" | "ended") {
    return apiFetch<UpdateStudentStatusResponse>(`/api/admin/students/${studentId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
