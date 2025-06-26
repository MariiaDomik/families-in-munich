import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { i18n } from "../../i18n/config";

// Регулярки для путей с учётом локали
const protectedRegexes = [
  /^\/[a-z]{2}(?:-[A-Z]{2})?\/users(\/.*)?$/,
  /^\/[a-z]{2}(?:-[A-Z]{2})?\/events(\/.*)?$/,
  /^\/[a-z]{2}(?:-[A-Z]{2})?\/chats(\/.*)?$/,
  /^\/[a-z]{2}(?:-[A-Z]{2})?\/profile(\/.*)?$/
];

export async function handleAuthMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRegexes.some((regex) => regex.test(pathname));

  if (isProtected) {
    // Получаем токен сессии (JWT) из куки/заголовка
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      // Извлекаем локаль из первого сегмента пути
      const segments = pathname.split('/').filter(Boolean); // ['', 'ru', ...] => ['ru', ...]
      let locale = segments[0];
      if (!i18n.locales.includes(locale)) {
        locale = i18n.defaultLocale;
      }
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}