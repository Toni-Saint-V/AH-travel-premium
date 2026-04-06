'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingShellProps {
  children: ReactNode
  title?: string
  showClose?: boolean
  closeHref?: string
  showBack?: boolean
  onBack?: () => void
  progress?: number
  className?: string
}

/**
 * Shell for onboarding flows (questionnaire, chance check, etc.)
 * No bottom navigation, focused flow with optional progress
 */
export function OnboardingShell({
  children,
  title,
  showClose = true,
  closeHref = '/',
  showBack = false,
  onBack,
  progress,
  className,
}: OnboardingShellProps) {
  return (
    <div className="min-h-screen surface-0 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 surface-0/95 backdrop-blur-sm border-b border-border-hairline pt-safe">
        <div className="flex items-center justify-between h-12 px-4">
          {/* Left: Back or empty */}
          <div className="w-10 flex items-center">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:surface-2 transition-fast"
                aria-label="Назад"
              >
                <ArrowLeft className="w-5 h-5 text-text-mid" />
              </button>
            )}
          </div>

          {/* Center: Title */}
          {title && (
            <h1 className="text-label text-text-high text-center">{title}</h1>
          )}

          {/* Right: Close */}
          <div className="w-10 flex items-center justify-end">
            {showClose && (
              <Link
                href={closeHref}
                className="flex items-center justify-center w-10 h-10 -mr-2 rounded-lg hover:surface-2 transition-fast"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 text-text-mid" />
              </Link>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {typeof progress === 'number' && (
          <div className="h-0.5 bg-border-hairline">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      {/* Content */}
      <main className={cn('flex-1 flex flex-col', className)}>
        {children}
      </main>
    </div>
  )
}
