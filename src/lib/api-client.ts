import { getApiBaseUrl } from "./api-url";

/**
 * Error thrown when the API responds with a non-2xx status. Carries the HTTP
 * status so callers (and React Query) can branch on it — e.g. skip retries on
 * 4xx.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Thin `fetch` wrapper for the SIBITA backend.
 *
 * - Prefixes the resolved API base URL.
 * - Sends the better-auth session cookie (`credentials: "include"`).
 * - Serialises/parses JSON and surfaces backend error messages as `ApiError`.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Permintaan gagal (${res.status}).`;
    try {
      const body = await res.json();
      message = body?.message || body?.error?.message || message;
    } catch {
      // Response body was empty or not JSON — keep the default message.
    }
    throw new ApiError(message, res.status);
  }

  // 204 No Content (and other empty bodies) have nothing to parse.
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
