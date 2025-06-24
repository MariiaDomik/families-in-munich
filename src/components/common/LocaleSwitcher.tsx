'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import clsx from 'clsx';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'ru', label: 'RU' }
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleSwitch = (locale: string) => {
    
    const segments = pathname?.split('/') || [];
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleSwitch(code)}
          className={clsx(
            'px-2 py-1 rounded text-xs font-semibold transition',
            code === currentLocale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
          )}
          aria-current={code === currentLocale ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
}