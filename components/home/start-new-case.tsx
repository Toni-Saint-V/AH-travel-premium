'use client'

import Link from 'next/link'
import { Plus, Zap } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'

interface StartNewCaseProps {
  hasActiveCase: boolean
}

export function StartNewCase({ hasActiveCase }: StartNewCaseProps) {
  if (hasActiveCase) {
    return (
      <section className="space-y-3">
        <SectionHeader 
          title="Новая заявка" 
          subtitle="Начните оформление другой поездки"
        />
        <Link
          href="/app/questionnaire"
          className={cn(
            'flex items-center justify-center gap-2 w-full h-12',
            'rounded-xl border border-dashed border-border-strong',
            'text-label text-text-mid hover:text-text-high hover:border-accent/50',
            'transition-fast touch-target'
          )}
        >
          <Plus className="w-5 h-5" />
          <span>Проверить шансы</span>
        </Link>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mb-6">
        <Zap className="w-8 h-8 text-accent" />
      </div>
      
      <h2 className="text-h2 text-text-high mb-2">
        Узнайте свои шансы
      </h2>
      <p className="text-body text-text-mid mb-8 max-w-[280px]">
        Ответьте на несколько вопросов и получите персональную оценку за 2 минуты
      </p>
      
      <Link
        href="/app/questionnaire"
        className={cn(
          'flex items-center justify-center gap-2 w-full max-w-[280px] h-12',
          'rounded-xl bg-accent text-white font-medium',
          'hover:bg-accent/90 active:scale-[0.98]',
          'transition-fast touch-target'
        )}
      >
        Проверить шансы
      </Link>
    </section>
  )
}
