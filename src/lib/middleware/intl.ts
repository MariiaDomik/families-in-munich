import createMiddleware from "next-intl/middleware";
import { i18n } from "../../i18n/config";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(i18n);

export function handleI18nMiddleware(request: NextRequest) {
    return intlMiddleware(request);
}