'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, AlertTriangle, X, TrendingUp, ChevronDown } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { mockActiveCase, confidenceLevelLabels, ScenarioPath } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const confidenceConfig = {
  high: { label: 'Высокие шансы', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
  medium: { label: 'Средние шансы', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  low: { label: 'Низкие шансы', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
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
      <div className="px-4 pt-4 pb-8">
        
        {/* HERO: Confidence Level - THE dominant element */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
            <div>
              <h1 className="text-h2 text-text-high">{mockActiveCase.destination}</h1>
              <p className="text-caption text-text-mid">{mockActiveCase.tripGoal}</p>
            </div>
          </div>

          {/* THE NUMBER - must dominate */}
          <div className={cn(
            'rounded-2xl p-6 border',
            conf.bg, conf.border
          )}>
            <p className="text-caption text-text-mid mb-2">Оценка вашего профиля</p>
            <div className={cn('text-display mb-1', conf.color)}>
              {conf.label}
            </div>
            <p className="text-body text-text-mid">
              {selectedScenario.confidence === 'high' 
                ? 'Ваш профиль соответствует требованиям. Высокая вероятность положительного решения.'
                : selectedScenario.confidence === 'medium'
                ? 'Есть факторы риска, но шансы на успех хорошие при правильной подготовке.'
                : 'Рекомендуем усилить профиль перед подачей для повышения шансов.'}
            </p>
          </div>
        </section>

        {/* RECOMMENDED PATH - secondary but clear */}
        <section className="mb-6">
          <h2 className="text-label text-text-mid uppercase tracking-wider mb-3">Рекомендуем</h2>
          <div className="surface-1 rounded-xl p-4 border border-border-hairline">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-h3 text-text-high">{selectedScenario.title}</h3>
                <p className="text-body text-text-mid mt-1">{selectedScenario.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-caption text-text-mid">
              <span>Срок: <span className="text-text-high">{selectedScenario.processingTime}</span></span>
            </div>
          </div>
        </section>

        {/* WHY - reasoning without collapse */}
        <section className="mb-6">
          <h2 className="text-label text-text-mid uppercase tracking-wider mb-3">Почему этот путь</h2>
          <p className="text-body text-text-mid leading-relaxed mb-4">
            {selectedScenario.whyThisPath}
          </p>

          {/* Strengths - compact */}
          {selectedScenario.strengths.length > 0 && (
            <div className="mb-4">
              <p className="text-label text-success mb-2">Сильные стороны</p>
              <div className="space-y-2">
                {selectedScenario.strengths.map(s => (
                  <div key={s.id} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-body text-text-high">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risks - compact */}
          {selectedScenario.risks.length > 0 && (
            <div className="mb-4">
              <p className="text-label text-warning mb-2">На что обратить внимание</p>
              <div className="space-y-2">
                {selectedScenario.risks.map(r => (
                  <div key={r.id} className="flex items-start gap-2">
                    <AlertTriangle className={cn(
                      'w-4 h-4 flex-shrink-0 mt-0.5',
                      r.severity === 'high' ? 'text-danger' : 'text-warning'
                    )} />
                    <div>
                      <span className="text-body text-text-high">{r.title}</span>
                      {r.recommendation && (
                        <p className="text-caption text-text-mid mt-0.5">{r.recommendation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements - if any */}
          {selectedScenario.whatImproves.length > 0 && (
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
              <p className="text-label text-accent mb-2">Что повысит шансы</p>
              <div className="space-y-1.5">
                {selectedScenario.whatImproves.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-caption text-text-mid">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ALTERNATIVES - collapsed by default, minimal */}
        {otherScenarios.length > 0 && (
          <section className="mb-8">
            <button
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <span className="text-label text-text-mid">
                {showAlternatives ? 'Скрыть' : 'Показать'} другие варианты ({otherScenarios.length})
              </span>
              <ChevronDown className={cn(
                'w-5 h-5 text-text-low transition-transform',
                showAlternatives && 'rotate-180'
              )} />
            </button>
            
            {showAlternatives && (
              <div className="space-y-2 pt-2">
                {otherScenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenarioId(scenario.id)
                      setShowAlternatives(false)
                    }}
                    className="w-full p-3 rounded-lg surface-1 border border-border-hairline text-left hover:surface-2 transition-fast"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {scenario.path === 'alternative' && (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                      {scenario.path === 'not_recommended' && (
                        <X className="w-4 h-4 text-danger" />
                      )}
                      <span className="text-label text-text-high">{scenario.title}</span>
                    </div>
                    <p className="text-caption text-text-mid line-clamp-1">{scenario.description}</p>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CTA - dominant, clear */}
        <div className="space-y-3">
          <Link
            href="/app/home"
            className={cn(
              'flex items-center justify-center gap-2 w-full h-14',
              'rounded-xl bg-accent text-white font-semibold text-base',
              'hover:bg-accent/90 active:scale-[0.98] active:translate-y-px',
              'transition-fast'
            )}
          >
            Начать оформление
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-caption text-text-low text-center">
            Далее: загрузка документов и сопровождение до решения
          </p>
        </div>
      </div>
    </AppShell>
  )
}
