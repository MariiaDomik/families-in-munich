'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: ReactNode;
  locale: string;
}

export default function ClientProviders({ children, locale }: Props) {
  return (
    <NextIntlClientProvider locale={locale}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
