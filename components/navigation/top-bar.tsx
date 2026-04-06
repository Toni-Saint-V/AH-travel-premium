'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title?: string
  showBack?: boolean
  backHref?: string
  rightAction?: React.ReactNode
  transparent?: boolean
  className?: string
}

export function TopBar({
  title,
  showBack = false,
  backHref,
  rightAction,
  transparent = false,
  className,
}: TopBarProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 pt-safe',
        transparent ? 'bg-transparent' : 'surface-0 border-b border-border-hairline',
        className
      )}
    >
      <div className="flex items-center justify-between h-12 px-4 max-w-lg mx-auto">
        {/* Left slot */}
        <div className="w-10 flex items-center justify-start">
          {showBack && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 -ml-2 text-text-mid hover:text-text-high transition-fast touch-target"
              aria-label="Назад"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Center - Title */}
        {title && (
          <h1 className="text-label text-text-high truncate max-w-[200px]">
            {title}
          </h1>
        )}

        {/* Right slot */}
        <div className="w-10 flex items-center justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  )
}

export function TopBarAction({ 
  onClick, 
  icon: Icon = MoreVertical,
  label = 'Действия' 
}: { 
  onClick?: () => void
  icon?: React.ComponentType<{ className?: string }>
  label?: string 
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 -mr-2 text-text-mid hover:text-text-high transition-fast touch-target"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  )
}
