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
      icon: <MdHome color='gray' className="w-6 h-6" />,
      activeIcon: <MdHome color='#2563eb' className="w-6 h-6" />,
      activeTextColor: 'text-blue-600',
      activeBgColor: 'bg-blue-50',
    },
    { 
      name: t('map'), 
      href: '/map', 
      icon: <MdMap color='gray' className="w-6 h-6" />,
      activeIcon: <MdMap color='#16a34a' className="w-6 h-6" />,
      activeTextColor: 'text-green-600',
      activeBgColor: 'bg-green-50',
    },
    { 
      name: t('events'), 
      href: '/events', 
      icon: <MdEvent color='gray' className="w-6 h-6" />,
      activeIcon: <MdEvent color='#7c3aed' className="w-6 h-6" />,
      activeTextColor: 'text-purple-600',
      activeBgColor: 'bg-purple-50',
    },
    { 
      name: t('chats'), 
      href: '/chats', 
      icon: <MdChat color='gray' className="w-6 h-6" />,
      activeIcon: <MdChat color='#db2777' className="w-6 h-6" />,
      activeTextColor: 'text-pink-600',
      activeBgColor: 'bg-pink-50',
    },
    { 
      name: t('profile'), 
      href: '/profile', 
      icon: <MdPerson color='gray' className="w-6 h-6" />,
      activeIcon: <MdPerson color='#ea580c' className="w-6 h-6" />,
      activeTextColor: 'text-orange-600',
      activeBgColor: 'bg-orange-50',
    }
  ]

  const isActive = (href: string) => {
    const currentPath = pathname || '';
    const localePath = `/${locale}`;
    
    if (href === '/') {
      return currentPath === localePath || currentPath === `${localePath}/`;
    }
    
    return currentPath.startsWith(`${localePath}${href}`);
  }

  const getHref = (href: string) => {
    if (href === '/') {
      return `/${locale}`;
    }
    return `/${locale}${href}`;
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
              href={getHref(item.href)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200
                ${active ? `${item.activeTextColor} ${item.activeBgColor}` : 'text-gray-600 hover:text-gray-900'}`}
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