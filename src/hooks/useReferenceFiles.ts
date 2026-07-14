import { useQuery, keepPreviousData } from "@tanstack/react-query";
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
