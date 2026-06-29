import { getCookieCache } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const session = await getCookieCache(request);
	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
	return NextResponse.next();
}