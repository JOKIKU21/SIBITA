/**
 * Resolve the base URL of the SIBITA backend API.
 *
 * On the client we honour `NEXT_PUBLIC_API_URL`, but when it points at
 * localhost we swap in the page's own protocol so an https dev server keeps
 * talking https (mixed-content otherwise). On the server we fall back to the
 * env value, then to the local default.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    if (!apiURL) {
      return window.location.origin;
    }
    if (apiURL.includes("localhost")) {
      try {
        const url = new URL(apiURL);
        url.protocol = window.location.protocol;
        return url.origin;
      } catch {
        return window.location.origin;
      }
    }
    return apiURL;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
}
