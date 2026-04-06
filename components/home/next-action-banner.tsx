'use client'

import Link from 'next/link'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { NextAction } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface NextActionBannerProps {
  action: NextAction
}

export function NextActionBanner({ action }: NextActionBannerProps) {
  const isUrgent = action.urgency === 'high'

  return (
    <Link
      href={action.ctaHref}
      className={cn(
        'block w-full p-4 rounded-xl border transition-fast',
        'active:scale-[0.99]',
        isUrgent
          ? 'bg-accent/10 border-accent/30 glow-accent'
          : 'surface-1 border-border-hairline hover:surface-2'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0',
          isUrgent ? 'bg-accent/20' : 'bg-bg-2'
        )}>
          <AlertCircle className={cn(
            'w-5 h-5',
            isUrgent ? 'text-accent' : 'text-text-mid'
          )} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-label text-text-high">{action.title}</h3>
            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
          </div>
          <p className="text-caption text-text-mid mt-1 line-clamp-2">
            {action.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
