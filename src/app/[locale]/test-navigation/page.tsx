'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function TestNavigationPage() {
  const locale = useLocale()
  const t = useTranslations('header.nav')

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Map', href: '/map' },
    { name: 'Events', href: '/events' },
    { name: 'Chats', href: '/chats' },
    { name: 'Users', href: '/users' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test Navigation Page
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Locale:</strong> {locale}</p>
            <p><strong>Current path:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'SSR'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Navigation Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {navigation.map((item) => (
              <div key={item.href} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{item.name}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Href:</strong> {item.href}</p>
                  <p><strong>Full URL:</strong> /{locale}{item.href}</p>
                  <Link 
                    href={`/${locale}${item.href}`}
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Test Link
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Translation Test</h2>
          <div className="space-y-2">
            <p><strong>Home:</strong> {t('home')}</p>
            <p><strong>Map:</strong> {t('map')}</p>
            <p><strong>Events:</strong> {t('events')}</p>
            <p><strong>Chats:</strong> {t('chats')}</p>
            <p><strong>Users:</strong> {t('users')}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 