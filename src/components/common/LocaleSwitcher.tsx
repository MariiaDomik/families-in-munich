'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'ru', label: 'RU' }
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const currentIdx = locales.findIndex(l => l.code === currentLocale);
  const nextLocale = locales[(currentIdx + 1) % locales.length];

  const handleSwitch = () => {
    const segments = pathname?.split('/') || [];
    segments[1] = nextLocale.code;
    router.push(segments.join('/'));
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 px-3 py-1 border-2 rounded-full bg-transparent text-xs font-semibold transition border-gradient-to-r from-blue-400 to-purple-500 text-blue-700 hover:from-purple-500 hover:to-blue-400"
      style={{ 
        borderImage: 'linear-gradient(90deg, #60a5fa, #a78bfa) 1',
        borderRadius: '9999px'
      }}
      aria-label="Switch language"
    >
      <span className="font-bold uppercase tracking-wide">{currentLocale.toUpperCase()}</span>
    </button>
  );
}