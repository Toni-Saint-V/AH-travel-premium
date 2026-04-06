'use client'

import { ReactNode } from 'react'
import { BottomNav } from '@/components/navigation/bottom-nav'
import { TopBar } from '@/components/navigation/top-bar'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  backHref?: string
  rightAction?: ReactNode
  hideNav?: boolean
  hideTopBar?: boolean
  transparentTopBar?: boolean
  className?: string
}

export function AppShell({
  children,
  title,
  showBack,
  backHref,
  rightAction,
  hideNav = false,
  hideTopBar = false,
  transparentTopBar = false,
  className,
}: AppShellProps) {
  return (
    <div className="min-h-screen surface-0">
      {!hideTopBar && (
        <TopBar
          title={title}
          showBack={showBack}
          backHref={backHref}
          rightAction={rightAction}
          transparent={transparentTopBar}
        />
      )}
      
      <main
        className={cn(
          'min-h-screen',
          !hideTopBar && 'pt-[calc(48px+var(--safe-top,0px))]',
          !hideNav && 'pb-[calc(56px+max(16px,var(--safe-bottom,0px)))]',
          className
        )}
      >
        {children}
      </main>
      
      {!hideNav && <BottomNav />}
    </div>
  )
}
