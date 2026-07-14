import { apiFetch } from "@/lib/api-client";

export interface ReferenceFile {
  id: string;
  title: string;
  description: string;
  type: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReferenceFilesResponse {
  referenceFiles: ReferenceFile[];
}

export const referenceService = {
  /** Fetch references files with optional type filter and search query */
  getReferenceFiles(type?: string, search?: string) {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (search) params.append("search", search);
    const queryString = params.toString();
    const url = queryString ? `/api/reference-files?${queryString}` : "/api/reference-files";
    return apiFetch<GetReferenceFilesResponse>(url, {
      method: "GET",
    });
  },
};
