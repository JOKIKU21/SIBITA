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

export interface LecturersSummaryResponse {
  totalDosen: number;
  dosenAktif: number;
  dosenNonaktif: number;
  totalBimbingan: number;
}

export interface StudentItem {
  id: string;
  name: string;
  email: string;
  campus: string | null;
  nim: string | null;
  studyProgram: string | null;
  phoneNumber: string | null;
  status: "active" | "nonactive" | "ended";
  advisorId: string | null;
  advisorName: string | null;
  currentStageOrder: number;
  currentStageName: string;
  guidanceStatus: "Belum Mulai" | "Berlangsung" | "Menunggu" | "Selesai" | "Terlambat";
  progressPercentage: number;
}

export interface GetStudentsResponse {
  students: StudentItem[];
}

export interface StudentsSummaryResponse {
  totalMahasiswa: number;
  mahasiswaAktif: number;
  menungguBimbingan: number;
  selesaiBimbingan: number;
}

export interface UpdateStudentPayload {
  name?: string;
  email?: string;
  phoneNumber?: string | null;
  nim?: string | null;
  studyProgram?: string | null;
  campus?: string | null;
  advisorId?: string | null;
  status?: "active" | "nonactive" | "ended";
}

export interface StudentStageDetailItem {
  order: number;
  name: string;
  durationDays: number;
}

export interface StudentDetailResponse {
  student: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    image: string | null;
    role: string;
    createdAt: string;
    studentProfile: {
      campus: string | null;
      nim: string | null;
      studyProgram: string | null;
      title: string | null;
      education: string | null;
      status: "active" | "nonactive" | "ended";
      advisorId: string | null;
      advisor?: {
        id: string;
        name: string;
        email: string;
        phoneNumber: string | null;
      } | null;
      notes: Array<{
        id: string;
        stageOrder: number;
        data: any;
        comment: string | null;
        status: "pending" | "approved";
        createdAt: string;
        completedAt: string | null;
      }>;
      files: Array<{
        id: string;
        stageOrder: number;
        fileName: string;
        fileUrl: string;
        fileType: string | null;
        fileSize: number | null;
        type: string;
        createdAt: string;
      }>;
    } | null;
  };
  progress: {
    studentId: string;
    currentStageOrder: number | null;
    startedAt: string;
    status: string;
    finishedAt: string | null;
  } | null;
  stages: StudentStageDetailItem[];
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

// --- Dashboard Visualization Types ---

export interface StageGroup {
  order: number;
  name: string;
  label?: string;
  durationDays?: number;
  count: number;
  percentage: number;
  color?: string;
}

export interface StageDistribution {
  totalStudents: number;
  stages?: StageGroup[];
  groups: StageGroup[];
}

export interface StatusCount {
  count: number;
  percentage: number;
}

export interface RegistrationStatusData {
  total: number;
  approved: StatusCount;
  pending: StatusCount;
  rejected: StatusCount;
}

export interface PaymentStatusData {
  total: number;
  totalAmount: number;
  paidAmount: number;
  paid: StatusCount;
  processing: StatusCount;
  pending: StatusCount;
  rejected: StatusCount;
}

export interface StudentStageInfo {
  order: number;
  status: "completed" | "in_progress" | "pending" | "not_started";
}

export interface StudentProgressItem {
  id: string;
  name: string;
  nim: string;
  studyProgram: string;
  advisorName: string | null;
  progressPercentage: number;
  currentStageOrder: number;
  stages: StudentStageInfo[];
}

export interface AdminDashboardResponse {
  stageDistribution: StageDistribution;
  registrationStatus: RegistrationStatusData;
  paymentStatus: PaymentStatusData;
  studentProgress: StudentProgressItem[];
}

// --- Admin Service Implementation ---

export const adminService = {
  /** Get system summary statistics. */
  getSummary() {
    return apiFetch<AdminSummaryResponse>("/api/admin/summary", {
      method: "GET",
    });
  },

  /** Get comprehensive dashboard visualization data. */
  getDashboard() {
    return apiFetch<AdminDashboardResponse>("/api/admin/dashboard", {
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

  /** Get lecturer summary statistics. */
  getLecturersSummary() {
    return apiFetch<LecturersSummaryResponse>("/api/admin/lecturers/summary", {
      method: "GET",
    });
  },

  /** List all lecturers with optional search query. */
  getLecturers(search?: string) {
    const url = search ? `/api/admin/lecturers?search=${encodeURIComponent(search)}` : "/api/admin/lecturers";
    return apiFetch<GetLecturersResponse>(url, {
      method: "GET",
    });
  },

  /** Get student summary statistics. */
  getStudentsSummary() {
    return apiFetch<StudentsSummaryResponse>("/api/admin/students/summary", {
      method: "GET",
    });
  },

  /** List all students with optional search query, prodi, and status filter. */
  getStudents(search?: string, prodi?: string, status?: string) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (prodi && prodi !== "All") params.append("prodi", prodi);
    if (status && status !== "All") params.append("status", status);
    const queryString = params.toString();
    const url = queryString ? `/api/admin/students?${queryString}` : "/api/admin/students";
    return apiFetch<GetStudentsResponse>(url, {
      method: "GET",
    });
  },

  /** Get detail of a single student. */
  getStudentDetail(studentId: string) {
    return apiFetch<StudentDetailResponse>(`/api/admin/students/${studentId}`, {
      method: "GET",
    });
  },

  /** Update student information. */
  updateStudent(studentId: string, data: UpdateStudentPayload) {
    return apiFetch<{ student: any }>(`/api/admin/students/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  /** Delete student entirely. */
  deleteStudent(studentId: string) {
    return apiFetch<{ message: string }>(`/api/admin/students/${studentId}`, {
      method: "DELETE",
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

  /** Create a new lecturer account. */
  createLecturer(data: { name: string; email: string; password: string; phoneNumber?: string; department?: string }) {
    return apiFetch<{ lecturer: LecturerItem }>('/api/admin/lecturers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
