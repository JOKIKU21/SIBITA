import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

export async function proxy(request: NextRequest) {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: Object.fromEntries(await headers()),
        },
    })

    if(!session) {
        return NextResponse.redirect(new URL("/masuk", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};