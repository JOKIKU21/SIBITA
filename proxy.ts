import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  // Ambil cookie session dari request, kirim ke Hono untuk validasi
  const cookieHeader = request.headers.get("cookie") ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: cookieHeader,
        },
      }
    );

    const session = await res.json();

    if (!session?.user) {
      return NextResponse.redirect(new URL("/masuk", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", session.user.id);
    response.headers.set("x-user-email", session.user.email);
    return response;

  } catch {
    return NextResponse.redirect(new URL("/masuk", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};