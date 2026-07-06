"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "@/lib/api-client";

/**
 * App-wide TanStack Query provider.
 *
 * The `QueryClient` is created lazily in state so it is instantiated once per
 * browser tab and never re-created across renders (a new client on every render
 * would drop the cache). Defaults are tuned for this dashboard: data stays
 * fresh for a minute, we don't refetch on window focus, and 4xx responses are
 * not retried (they won't succeed on retry).
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (error instanceof ApiError && error.status < 500) {
                return false;
              }
              return failureCount < 2;
            },
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
