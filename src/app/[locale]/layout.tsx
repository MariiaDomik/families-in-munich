import { hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import "./globals.css";
import ClientProviders from '@/components/common/ClientProviders';
import Header from '@/components/layout/Header';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import MobileFooterNav from '@/components/layout/MobileFooterNav';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  let messages;
  try {
    messages = await (await import(`../../locals/${locale}.json`)).default;
  }
  catch(err) { console.log(err); return notFound()};
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientProviders locale={locale} messages={messages}>
          <Header />
          <main className="pb-16 md:pb-0">
            {children}
          </main>
          <MobileFooterNav />
        </ClientProviders>
      </body>
    </html>
  );
}