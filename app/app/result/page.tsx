'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, AlertTriangle, X, ChevronDown } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { mockActiveCase } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const confidenceConfig = {
  high: { label: 'Высокие шансы', color: 'text-success', glow: 'shadow-[0_0_60px_rgba(59,214,113,0.15)]' },
  medium: { label: 'Средние шансы', color: 'text-warning', glow: 'shadow-[0_0_60px_rgba(255,181,71,0.15)]' },
  low: { label: 'Низкие шансы', color: 'text-danger', glow: 'shadow-[0_0_60px_rgba(255,92,124,0.15)]' },
}

export default function ResultPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(mockActiveCase.selectedScenarioId)
  const [showAlternatives, setShowAlternatives] = useState(false)

  const scenarios = mockActiveCase.scenarios
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0]
  const otherScenarios = scenarios.filter(s => s.id !== selectedScenarioId)
  const conf = confidenceConfig[selectedScenario.confidence]

  return (
    <AppShell 
      title="Результат оценки" 
      showBack 
      backHref="/app/questionnaire"
    >
      <div className="px-4 pt-6 pb-8">
        
        {/* HERO: THE DECISION MOMENT - dramatic, singular focus */}
        <section className="mb-10">
          {/* Destination - stacked for mobile */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
              <span className="text-h3 text-text-high">{mockActiveCase.destination}</span>
            </div>
            <p className="text-body text-text-mid">{mockActiveCase.tripGoal}</p>
          </div>

          {/* THE VERDICT - absolute focal point */}
          <div className={cn('py-6', conf.glow)}>
            <p className="text-caption text-text-low uppercase tracking-widest mb-3">Оценка вашего профиля</p>
            <h1 className={cn('text-[40px] font-semibold leading-none tracking-tight mb-5', conf.color)}>
              {conf.label}
            </h1>
            <p className="text-body text-text-mid leading-relaxed">
              {selectedScenario.confidence === 'high' 
                ? 'Ваш профиль соответствует требованиям. Высокая вероятность положительного решения.'
                : selectedScenario.confidence === 'medium'
                ? 'Есть факторы риска, но шансы хорошие при правильной подготовке.'
                : 'Рекомендуем усилить профиль перед подачей.'}
            </p>
          </div>
        </section>

        {/* RECOMMENDED PATH - card style for mobile */}
        <section className="mb-8 p-5 rounded-xl surface-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-caption text-text-low uppercase tracking-widest mb-1">Рекомендуем</p>
              <h3 className="text-h3 text-text-high">{selectedScenario.title}</h3>
            </div>
          </div>
          <p className="text-body text-text-mid mb-3">{selectedScenario.description}</p>
          <p className="text-caption text-text-low">Срок: {selectedScenario.processingTime}</p>
        </section>

        {/* WHY + STRENGTHS/RISKS - quieter, flows naturally */}
        <section className="mb-8 space-y-6">
          <p className="text-body text-text-mid leading-relaxed">
            {selectedScenario.whyThisPath}
          </p>

          {/* Strengths - inline, minimal */}
          {selectedScenario.strengths.length > 0 && (
            <div className="space-y-1.5">
              {selectedScenario.strengths.map(s => (
                <div key={s.id} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success/70 flex-shrink-0 mt-0.5" />
                  <span className="text-body text-text-mid">{s.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* Risks - subtle warning */}
          {selectedScenario.risks.length > 0 && (
            <div className="space-y-1.5">
              {selectedScenario.risks.map(r => (
                <div key={r.id} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning/70 flex-shrink-0 mt-0.5" />
                  <span className="text-body text-text-mid">{r.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* Improvements - if any, subtle highlight */}
          {selectedScenario.whatImproves.length > 0 && (
            <div className="pl-4 border-l-2 border-accent/30">
              <p className="text-caption text-accent mb-1.5">Что повысит шансы</p>
              {selectedScenario.whatImproves.map((item, i) => (
                <p key={i} className="text-caption text-text-mid">{item}</p>
              ))}
            </div>
          )}
        </section>

        {/* ALTERNATIVES - very minimal */}
        {otherScenarios.length > 0 && (
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="flex items-center gap-2 py-3 mb-6 text-caption text-text-low hover:text-text-mid transition-fast"
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform', showAlternatives && 'rotate-180')} />
            {showAlternatives ? 'Скрыть варианты' : `${otherScenarios.length} других вариантов`}
          </button>
        )}
        
        {showAlternatives && otherScenarios.length > 0 && (
          <div className="space-y-2 mb-8">
            {otherScenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => { setSelectedScenarioId(scenario.id); setShowAlternatives(false) }}
                className="flex items-center gap-3 w-full p-3 text-left hover:bg-bg-1 rounded-lg transition-fast"
              >
                {scenario.path === 'alternative' && <AlertTriangle className="w-4 h-4 text-warning/50" />}
                {scenario.path === 'not_recommended' && <X className="w-4 h-4 text-danger/50" />}
                <span className="text-body text-text-mid">{scenario.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* CTA - THE action, dramatic */}
        <div className="mt-auto pt-8">
          <Link
            href="/app/home"
            className={cn(
              'flex items-center justify-center gap-3 w-full h-16',
              'rounded-2xl bg-accent text-white font-semibold text-base',
              'hover:bg-accent/90 active:scale-[0.98]',
              'transition-fast shadow-[0_0_40px_rgba(108,99,255,0.25)]'
            )}
          >
            Начать оформление
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-caption text-text-low text-center mt-4">
            Далее: загрузка документов и сопровождение
          </p>
        </div>
      </div>
    </AppShell>
  )
}
