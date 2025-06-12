import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const userId = request.cookies.get("userid")?.value;
    // const userId = true;
    if (!userId)
        return NextResponse.redirect(new URL("/login", request.url))
    return NextResponse.next();
}

export const config = {
    matcher: [ "/users", "/users/(.*)",
         "/events", "/events/(.*)",
          "/chats", "/chats/(.*)"
        ]
}