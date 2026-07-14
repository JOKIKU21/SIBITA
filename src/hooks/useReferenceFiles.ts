import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { referenceService } from "@/services/reference";

export const referenceKeys = {
  all: ["references"] as const,
  list: (type?: string, search?: string) => [...referenceKeys.all, "list", type || "all", search || ""] as const,
};

/** Hook to fetch reference files from the API. */
export function useReferenceFiles(type?: string, search?: string) {
  return useQuery({
    queryKey: referenceKeys.list(type, search),
    queryFn: () => referenceService.getReferenceFiles(type, search),
    placeholderData: keepPreviousData,
  });
}

/** Hook to create a new reference file */
export function useCreateReferenceFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      type: string;
      fileName: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
      author: string;
    }) => referenceService.createReferenceFile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.all });
    },
  });
}

/** Hook to delete a reference file */
export function useDeleteReferenceFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => referenceService.deleteReferenceFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.all });
    },
  });
}

