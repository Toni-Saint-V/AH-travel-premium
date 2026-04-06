'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ResultCTA() {
  return (
    <div className="sticky bottom-[calc(56px+max(16px,var(--safe-bottom,0px)))] left-0 right-0 -mx-4 px-4 py-4 surface-0 border-t border-border-hairline">
      <Link
        href="/app/documents"
        className={cn(
          'flex items-center justify-center gap-2 w-full h-12',
          'rounded-xl bg-accent text-white font-medium',
          'hover:bg-accent/90 active:scale-[0.98]',
          'transition-fast touch-target'
        )}
      >
        Начать сбор документов
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
