'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, AlertTriangle, X, Sparkles, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { SurfaceCard } from '@/components/ui/surface-card'
import { SectionHeader } from '@/components/ui/section-header'
import { PricingBreakdownCard } from '@/components/result/pricing-breakdown-card'
import { mockActiveCase, confidenceLevelLabels, ScenarioPath } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const pathConfig: Record<ScenarioPath, {
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
  bgColor: string
}> = {
  recommended: {
    icon: Check,
    label: 'Рекомендуем',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  alternative: {
    icon: AlertTriangle,
    label: 'Альтернатива',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  not_recommended: {
    icon: X,
    label: 'Не рекомендуется',
    color: 'text-danger',
    bgColor: 'bg-danger/10',
  },
}

const confidenceConfig: Record<string, { color: string; bgColor: string }> = {
  high: { color: 'text-success', bgColor: 'bg-success/10' },
  medium: { color: 'text-warning', bgColor: 'bg-warning/10' },
  low: { color: 'text-danger', bgColor: 'bg-danger/10' },
}

export default function ResultPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(mockActiveCase.selectedScenarioId)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['reasoning']))

  const scenarios = mockActiveCase.scenarios
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0]
  const otherScenarios = scenarios.filter(s => s.id !== selectedScenarioId)

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  return (
    <AppShell 
      title="Ваш результат" 
      showBack 
      backHref="/app/questionnaire"
    >
      <div className="px-4 pt-4 pb-6">
        {/* Hero Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
            <div>
              <h1 className="text-h2 text-text-high">{mockActiveCase.destination}</h1>
              <p className="text-caption text-text-mid">{mockActiveCase.tripGoal}</p>
            </div>
          </div>
          <p className="text-body text-text-mid leading-relaxed">
            Анализ вашего профиля завершён. Ниже — персональные рекомендации и оценка шансов.
          </p>
        </header>

        <div className="space-y-6">
          {/* SELECTED SCENARIO - Dominant recommendation */}
          <section>
            <SectionHeader 
              title="Рекомендованный путь" 
              className="mb-4"
            />
            <SelectedScenarioCard 
              scenario={selectedScenario}
              onSelectAnother={() => toggleSection('alternatives')}
            />
          </section>

          {/* AI REASONING - Why this path */}
          <CollapsibleSection
            title="Почему этот путь"
            subtitle="AI-анализ вашего профиля"
            icon={<Sparkles className="w-5 h-5 text-accent" />}
            isExpanded={expandedSections.has('reasoning')}
            onToggle={() => toggleSection('reasoning')}
          >
            <div className="space-y-4">
              <p className="text-body text-text-mid leading-relaxed">
                {selectedScenario.whyThisPath}
              </p>

              {/* Strengths */}
              {selectedScenario.strengths.length > 0 && (
                <div>
                  <p className="text-label text-success mb-2">Сильные стороны профиля</p>
                  <ul className="space-y-2">
                    {selectedScenario.strengths.map(s => (
                      <li key={s.id} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-body text-text-high">{s.title}</span>
                          <p className="text-caption text-text-mid">{s.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risks */}
              {selectedScenario.risks.length > 0 && (
                <div>
                  <p className="text-label text-warning mb-2">На что обратить внимание</p>
                  <ul className="space-y-2">
                    {selectedScenario.risks.map(r => (
                      <li key={r.id} className="flex items-start gap-2">
                        <AlertTriangle className={cn(
                          'w-4 h-4 flex-shrink-0 mt-0.5',
                          r.severity === 'high' ? 'text-danger' : 'text-warning'
                        )} />
                        <div>
                          <span className="text-body text-text-high">{r.title}</span>
                          <p className="text-caption text-text-mid">{r.description}</p>
                          {r.recommendation && (
                            <p className="text-caption text-accent mt-1">{r.recommendation}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What improves outcome */}
              {selectedScenario.whatImproves.length > 0 && (
                <div>
                  <p className="text-label text-accent mb-2">Что повысит шансы</p>
                  <ul className="space-y-1.5">
                    {selectedScenario.whatImproves.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-body text-text-mid">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* ALTERNATIVE PATHS */}
          {otherScenarios.length > 0 && (
            <CollapsibleSection
              title="Другие варианты"
              subtitle={`${otherScenarios.length} альтернативных путей`}
              isExpanded={expandedSections.has('alternatives')}
              onToggle={() => toggleSection('alternatives')}
            >
              <div className="space-y-3">
                {otherScenarios.map(scenario => (
                  <AlternativeScenarioCard 
                    key={scenario.id}
                    scenario={scenario}
                    onSelect={() => setSelectedScenarioId(scenario.id)}
                  />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* PRICING */}
          <section>
            <SectionHeader 
              title="Стоимость" 
              subtitle="Сервис, сборы, опции"
              className="mb-4"
            />
            <PricingBreakdownCard pricing={mockActiveCase.pricing} />
          </section>
        </div>

        {/* CTA */}
        <div className="mt-8 space-y-4">
          <Link
            href="/app/home"
            className={cn(
              'flex items-center justify-center gap-2 w-full h-14',
              'rounded-xl bg-accent text-white font-semibold',
              'hover:bg-accent/90 active:scale-[0.98]',
              'transition-fast touch-target',
              'shadow-[0_0_30px_rgba(108,99,255,0.2)]'
            )}
          >
            Начать оформление
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-caption text-text-low text-center">
            Вы сможете загрузить документы и задать вопросы на следующем шаге
          </p>
        </div>
      </div>
    </AppShell>
  )
}

// Selected Scenario Card - dominant visual
function SelectedScenarioCard({ 
  scenario, 
  onSelectAnother 
}: { 
  scenario: typeof mockActiveCase.scenarios[0]
  onSelectAnother: () => void
}) {
  const pathCfg = pathConfig[scenario.path]
  const confCfg = confidenceConfig[scenario.confidence]
  const Icon = pathCfg.icon

  return (
    <SurfaceCard className="relative overflow-hidden">
      {/* Glow for recommended */}
      {scenario.path === 'recommended' && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-success/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      )}
      
      <div className="relative space-y-4">
        {/* Path badge and confidence */}
        <div className="flex items-center justify-between">
          <div className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-md',
            pathCfg.bgColor
          )}>
            <Icon className={cn('w-4 h-4', pathCfg.color)} />
            <span className={cn('text-caption font-medium', pathCfg.color)}>
              {pathCfg.label}
            </span>
          </div>
          
          <div className={cn(
            'px-2.5 py-1 rounded-md',
            confCfg.bgColor
          )}>
            <span className={cn('text-caption font-medium', confCfg.color)}>
              {confidenceLevelLabels[scenario.confidence]}
            </span>
          </div>
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-h3 text-text-high mb-1">{scenario.title}</h3>
          <p className="text-body text-text-mid">{scenario.description}</p>
        </div>

        {/* Processing time */}
        <div className="flex items-center gap-2 text-caption text-text-mid">
          <span>Срок рассмотрения:</span>
          <span className="text-text-high">{scenario.processingTime}</span>
        </div>

        {/* Select another */}
        <button
          onClick={onSelectAnother}
          className="text-caption text-accent hover:underline"
        >
          Рассмотреть другие варианты
        </button>
      </div>
    </SurfaceCard>
  )
}

// Alternative Scenario Card - compact
function AlternativeScenarioCard({ 
  scenario,
  onSelect
}: { 
  scenario: typeof mockActiveCase.scenarios[0]
  onSelect: () => void
}) {
  const pathCfg = pathConfig[scenario.path]
  const Icon = pathCfg.icon

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full p-4 rounded-xl border text-left transition-fast',
        'surface-1 border-border-hairline hover:surface-2'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={cn(
          'flex items-center gap-1.5 px-2 py-0.5 rounded',
          pathCfg.bgColor
        )}>
          <Icon className={cn('w-3.5 h-3.5', pathCfg.color)} />
          <span className={cn('text-caption font-medium', pathCfg.color)}>
            {pathCfg.label}
          </span>
        </div>
        <span className="text-caption text-text-mid">{scenario.processingTime}</span>
      </div>
      
      <h4 className="text-label text-text-high mb-1">{scenario.title}</h4>
      <p className="text-caption text-text-mid line-clamp-2">{scenario.description}</p>
    </button>
  )
}

// Collapsible Section
function CollapsibleSection({
  title,
  subtitle,
  icon,
  isExpanded,
  onToggle,
  children
}: {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <section className="surface-1 rounded-xl border border-border-hairline overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:surface-2 transition-fast"
      >
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="text-h3 text-text-high">{title}</h3>
            {subtitle && <p className="text-caption text-text-mid">{subtitle}</p>}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-text-mid" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-mid" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          {children}
        </div>
      )}
    </section>
  )
}
