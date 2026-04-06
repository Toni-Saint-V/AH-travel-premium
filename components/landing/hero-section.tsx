'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Subtle background gradient - restrained, not loud */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-accent/8 border border-accent/15">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-caption text-accent font-medium">AI-платформа для путешествий</span>
        </div>

        {/* Headline - strong, clear */}
        <h1 className="text-display text-text-high mb-5 text-balance leading-tight">
          Узнайте свои шансы на визу за 2 минуты
        </h1>

        {/* Subheadline - supporting, calm */}
        <p className="text-body text-text-mid mb-10 max-w-sm mx-auto text-balance leading-relaxed">
          Персональная оценка, понятные риски, пошаговый план сбора документов. От неопределённости к готовности.
        </p>

        {/* Primary CTA - single, clear */}
        <Link
          href="/app/home"
          className={cn(
            'inline-flex items-center justify-center gap-2 h-14 px-10',
            'rounded-xl bg-accent text-white font-semibold text-base',
            'hover:bg-accent/90 active:scale-[0.98]',
            'transition-fast touch-target',
            'shadow-[0_0_40px_rgba(108,99,255,0.25)]'
          )}
        >
          Проверить шансы
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Supporting points - quiet */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <div className="flex items-center gap-1.5 text-caption text-text-low">
            <Clock className="w-3.5 h-3.5" />
            <span>2 минуты</span>
          </div>
          <div className="flex items-center gap-1.5 text-caption text-text-low">
            <Shield className="w-3.5 h-3.5" />
            <span>Бесплатно</span>
          </div>
        </div>
      </div>
    </section>
  )
}
