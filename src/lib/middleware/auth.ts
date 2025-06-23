import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/users", "/users/(.*)",
         "/events", "/events/(.*)",
          "/chats", "/chats/(.*)", "/profile", "/profile/(.*)"];

export function handleAuthMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedPaths.some((path) => pathname.match(path));
    if (isProtected) {
        const userId = request.cookies.get('userid')?.value;
        if (!userId) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}