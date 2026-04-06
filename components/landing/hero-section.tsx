'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent-2/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/20">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-caption text-accent font-medium">AI-платформа для путешествий</span>
        </div>

        {/* Headline */}
        <h1 className="text-display text-text-high mb-4 text-balance">
          Узнайте свои шансы на визу за 2 минуты
        </h1>

        {/* Subheadline */}
        <p className="text-body text-text-mid mb-8 max-w-md mx-auto text-balance leading-relaxed">
          Персональная оценка, понятные риски, пошаговый план сбора документов. 
          От неопределённости к готовности к поездке.
        </p>

        {/* CTA */}
        <Link
          href="/check"
          className={cn(
            'inline-flex items-center justify-center gap-2 h-14 px-8',
            'rounded-xl bg-accent text-white font-medium text-lg',
            'hover:bg-accent/90 active:scale-[0.98]',
            'transition-fast touch-target',
            'shadow-[0_0_30px_rgba(108,99,255,0.3)]'
          )}
        >
          Проверить шансы
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Supporting points */}
        <div className="flex items-center justify-center gap-6 mt-8">
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
