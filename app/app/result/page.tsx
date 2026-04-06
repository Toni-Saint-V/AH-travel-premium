import { AppShell } from '@/components/layout/app-shell'
import { ScenarioCards } from '@/components/result/scenario-cards'
import { RiskList } from '@/components/result/risk-list'
import { SignalList } from '@/components/result/signal-list'
import { AIReasoningCard } from '@/components/result/ai-reasoning-card'
import { PricingBreakdownCard } from '@/components/result/pricing-breakdown-card'
import { ResultCTA } from '@/components/result/result-cta'
import { SectionHeader } from '@/components/ui/section-header'
import { mockActiveCase } from '@/lib/mock-data'

export default function ResultPage() {
  const bestScenario = mockActiveCase.scenarios.find(s => s.path === 'best')
  const alternativeScenario = mockActiveCase.scenarios.find(s => s.path === 'alternative')

  return (
    <AppShell 
      title="Результат оценки" 
      showBack 
      backHref="/app/home"
    >
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mockActiveCase.destinationFlag}</span>
            <h1 className="text-h2 text-text-high">{mockActiveCase.destination}</h1>
          </div>
          <p className="text-body text-text-mid">
            Мы проанализировали ваш профиль и подготовили персональные рекомендации
          </p>
        </header>

        {/* Scenario Cards - horizontal scroll */}
        <section>
          <SectionHeader 
            title="Рекомендованные пути" 
            subtitle="Листайте, чтобы увидеть все варианты"
            className="mb-3"
          />
          <ScenarioCards scenarios={mockActiveCase.scenarios} />
        </section>

        {/* AI Reasoning */}
        <AIReasoningCard insight={mockActiveCase.aiInsight || ''} />

        {/* Risks for best path */}
        {bestScenario && bestScenario.risks.length > 0 && (
          <section>
            <SectionHeader 
              title="Риски" 
              subtitle="На что обратить внимание"
              className="mb-3"
            />
            <RiskList risks={bestScenario.risks} />
          </section>
        )}

        {/* Positive Signals */}
        {bestScenario && bestScenario.positiveSignals.length > 0 && (
          <section>
            <SectionHeader 
              title="Позитивные сигналы" 
              subtitle="Сильные стороны вашего профиля"
              className="mb-3"
            />
            <SignalList signals={bestScenario.positiveSignals} />
          </section>
        )}

        {/* Pricing Breakdown */}
        <section>
          <SectionHeader 
            title="Стоимость" 
            subtitle="Прозрачная структура расходов"
            className="mb-3"
          />
          <PricingBreakdownCard pricing={mockActiveCase.pricing} />
        </section>

        {/* CTA */}
        <ResultCTA />
      </div>
    </AppShell>
  )
}
