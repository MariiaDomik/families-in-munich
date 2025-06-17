import { i18n } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = params;
  if (!i18n.locales.includes(locale))
    notFound();

  let messages;
  try {
    messages = (await import(`@/locales/${locale}.json`)).default;
    console.log(messages);
  } catch (error) {
    console.log(error);
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <h1> Layout loaded</h1>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
};
