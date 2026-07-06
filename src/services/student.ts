import { apiFetch } from "@/lib/api-client";

export interface StudentAdvisor {
  name: string;
  email: string;
}

/** Shape returned by `GET /api/student/profile`. */
export interface StudentProfile {
  name: string;
  nim: string;
  email: string;
  education: string;
  phoneNumber: string;
  studyProgram: string;
  campus: string;
  advisor: StudentAdvisor | null;
  status: string;
}

/**
 * Fields accepted by `PATCH /api/users/profile`. Everything is optional so the
 * form can send a partial update; NIM, email, phone and advisor are managed by
 * the backend and are not editable here.
 */
export interface UpdateProfilePayload {
  name?: string;
  campus?: string;
  studyProgram?: string;
  education?: string;
}

/** Body for `POST /api/auth/change-password`. */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const studentService = {
  /** Fetch the signed-in student's profile. */
  getProfile() {
    return apiFetch<StudentProfile>("/api/student/profile", { method: "GET" });
  },

  /** Update the editable subset of the student's profile. */
  updateProfile(payload: UpdateProfilePayload) {
    return apiFetch<StudentProfile>("/api/users/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** Change the password for the current session. */
  changePassword(payload: ChangePasswordPayload) {
    return apiFetch<unknown>("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
