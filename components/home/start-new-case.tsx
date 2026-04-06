'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StartNewCase() {
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
