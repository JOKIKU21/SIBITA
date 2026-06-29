import { NextRequest } from "next/server";

const API_URL = process.env.BETTER_AUTH_BACKEND_URL ?? "http://localhost:3001";

/**
 * Proxy all Better Auth requests to the backend.
 *
 * Why: The backend runs on a different origin (e.g. localhost:3001).
 * If the client calls the backend directly, auth cookies are set on
 * the backend domain — the frontend proxy/middleware can't read them.
 *
 * By proxying through /api/auth/*, cookies are set on the frontend
 * origin, so the proxy.ts (Next.js 16 middleware) and server
 * components can access them.
 */
async function handler(request: NextRequest) {
  const url = new URL(request.url);
  const targetPath = url.pathname; // /api/auth/...
  const targetUrl = `${API_URL}${targetPath}${url.search}`;

  const headers = new Headers(request.headers);
  // Remove host header to avoid issues with the backend
  headers.delete("host");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  // Forward body for non-GET/HEAD requests
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
    // @ts-expect-error -- Required for streaming body in edge runtime
    init.duplex = "half";
  }

  const response = await fetch(targetUrl, init);

  const responseHeaders = new Headers(response.headers);
  // Remove encoding and length headers because fetch() automatically decompresses the response body.
  // Keeping them would cause the browser to fail decoding the decompressed body stream.
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.delete("transfer-encoding");

  // Create a new response, forwarding status, headers, and body
  const proxyResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });

  return proxyResponse;
}

export { handler as GET, handler as POST };
