'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/common/Icon'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from '../common/LocaleSwitcher'
import { 
  MdHome, 
  MdMap, 
  MdEvent, 
  MdChat, 
  MdSearch, 
  MdPerson, 
  MdLogout, 
  MdMenu, 
  MdClose,
  MdLogin,
  MdPersonAdd
} from "react-icons/md";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  const authT = useTranslations('auth');

  // Отладочная информация
  console.log('Header Debug:', {
    pathname,
    locale,
    session: !!session
  });

  const navigation = [
    { name: t('header.nav.home'), href: '/', icon: 'home' },
    { name: t('header.nav.map'), href: '/map', icon: 'map' },
    { name: t('header.nav.events'), href: '/events', icon: 'calendar' },
    { name: t('header.nav.chats'), href: '/chats', icon: 'message-circle' },
    { name: t('header.nav.users'), href: '/users', icon: 'search' },
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

  // Отладочная информация для навигации
  navigation.forEach(item => {
    console.log(`Navigation item ${item.name}:`, {
      href: item.href,
      fullHref: getHref(item.href),
      isActive: isActive(item.href)
    });
  });

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push(`/${locale}/login`)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MdHome className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{t('header.siteName')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.href === '/' && <MdHome className="w-4 h-4" />}
                {item.href === '/map' && <MdMap className="w-4 h-4" />}
                {item.href === '/events' && <MdEvent className="w-4 h-4" />}
                {item.href === '/chats' && <MdChat className="w-4 h-4" />}
                {item.href === '/users' && <MdSearch className="w-4 h-4" />}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/${locale}/profile`}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <MdPerson className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('header.nav.profile')}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <MdLogout className="w-4 h-4" />
                  <span className="hidden sm:inline">{authT('logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href={`/${locale}/login`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {authT('login')}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  {authT('register')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
            </button>
            
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.href === '/' && <MdHome className="w-5 h-5" />}
                  {item.href === '/map' && <MdMap className="w-5 h-5" />}
                  {item.href === '/events' && <MdEvent className="w-5 h-5" />}
                  {item.href === '/chats' && <MdChat className="w-5 h-5" />}
                  {item.href === '/users' && <MdSearch className="w-5 h-5" />}
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {session ? (
                <>
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <Link
                      href={`/${locale}/profile`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <MdPerson className="w-5 h-5" />
                      <span>{t('header.nav.profile')}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <MdLogout className="w-5 h-5" />
                      <span>{authT('logout')}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/${locale}/login`}
                    className="p-2 rounded-full text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <MdLogin className="w-6 h-6" />
                  </Link>
                  <Link
                    href={`/${locale}/register`}
                    className="p-2 rounded-full text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <MdPersonAdd className="w-6 h-6" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 