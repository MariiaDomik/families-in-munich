import { NextRequest, NextResponse } from "next/server";
import { handleAuthMiddleware } from "./lib/middleware/auth";
import { handleI18nMiddleware } from "./lib/middleware/intl";

export function middleware(request: NextRequest) {
    const i18nResponse = handleI18nMiddleware(request);
    if (i18nResponse?.redirected || i18nResponse?.status !== 200) 
        return i18nResponse;
    console.log("middleware");
    
    const authResponse = handleAuthMiddleware(request);
    
    return authResponse || i18nResponse;
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
    // matcher: ['/:path*']
};