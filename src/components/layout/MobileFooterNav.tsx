'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { MdHome, MdMap, MdEvent, MdChat, MdPerson } from 'react-icons/md';


export default function MobileFooterNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('header.nav')
  const { data: session } = useSession()

  const navigation = [
    { 
      name: t('home'), 
      href: '/', 
      icon: <MdHome className="w-6 h-6" />,
      activeIcon: '🏠'
    },
    { 
      name: t('map'), 
      href: '/map', 
      icon: <MdMap className="w-6 h-6" />,
      activeIcon: '🗺️'
    },
    { 
      name: t('events'), 
      href: '/events', 
      icon: <MdEvent className="w-6 h-6" />,
      activeIcon: '📅'
    },
    { 
      name: t('chats'), 
      href: '/chats', 
      icon: <MdChat className="w-6 h-6" />,
      activeIcon: '💬'
    },
    { 
      name: t('profile'), 
      href: '/profile', 
      icon: <MdPerson className="w-6 h-6" />,
      activeIcon: '👤'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === `/${locale}/`
    }
    return pathname?.startsWith(`/${locale}${href}`)
  }

  // Если пользователь не авторизован, показываем только главную и карту
  const visibleNavigation = session ? navigation : navigation.slice(0, 2)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {visibleNavigation.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={`/${locale}${item.href}`}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                active 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="text-xl mb-1">
                {active ? item.activeIcon : item.icon}
              </div>
              <span className="text-xs font-medium">
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 