'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Route, FileText, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { href: '/app/home', label: 'Главная', icon: Home },
  { href: '/app/journey', label: 'Путь', icon: Route },
  { href: '/app/documents', label: 'Документы', icon: FileText },
  { href: '/app/profile', label: 'Профиль', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 surface-1 border-t border-border-hairline pb-safe"
      role="navigation"
      aria-label="Основная навигация"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full touch-target',
                'transition-fast',
                isActive 
                  ? 'text-accent' 
                  : 'text-text-low hover:text-text-mid'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={cn(
                'w-5 h-5 mb-0.5',
                isActive && 'drop-shadow-[0_0_8px_rgba(108,99,255,0.5)]'
              )} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
