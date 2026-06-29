import { NextRequest } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ all: string[] }> }
) {
  const { all } = await params;
  const path = all.join("/");
  const search = request.nextUrl.search;

  const headers = new Headers();
  headers.set("content-type", request.headers.get("content-type") ?? "application/json");
  headers.set("cookie", request.headers.get("cookie") ?? "");

  const body = request.method !== "GET" ? await request.text() : undefined;

  const res = await fetch(`${API_URL}/api/auth/${path}${search}`, {
    method: request.method,
    headers,
    body,
  });

  // Forward semua headers dari backend (termasuk Set-Cookie)
  const responseHeaders = new Headers(res.headers);

  return new Response(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;