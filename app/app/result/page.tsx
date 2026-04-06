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
      <div className="px-4 pt-4 pb-6">
        {/* Hero Header - stronger visual weight */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{mockActiveCase.destinationFlag}</span>
            <div>
              <h1 className="text-h2 text-text-high">{mockActiveCase.destination}</h1>
              <p className="text-caption text-text-mid">{mockActiveCase.tripGoal}</p>
            </div>
          </div>
          <p className="text-body text-text-mid leading-relaxed">
            Персональный анализ вашего профиля завершён. Мы подготовили рекомендации для успешного получения визы.
          </p>
        </header>

        <div className="space-y-8">
          {/* Scenario Cards - PRIMARY FOCUS, horizontal scroll */}
          <section>
            <SectionHeader 
              title="Рекомендованные сценарии" 
              subtitle="Листайте для просмотра альтернатив"
              className="mb-4"
            />
            <ScenarioCards scenarios={mockActiveCase.scenarios} />
          </section>

          {/* AI Reasoning - high visual hierarchy */}
          <AIReasoningCard insight={mockActiveCase.aiInsight || ''} />

          {/* Risks for best path */}
          {bestScenario && bestScenario.risks.length > 0 && (
            <section>
              <SectionHeader 
                title="Риски и рекомендации" 
                subtitle="На что обратить внимание"
                className="mb-4"
              />
              <RiskList risks={bestScenario.risks} />
            </section>
          )}

          {/* Positive Signals */}
          {bestScenario && bestScenario.positiveSignals.length > 0 && (
            <section>
              <SectionHeader 
                title="Сильные стороны профиля" 
                subtitle="Факторы в вашу пользу"
                className="mb-4"
              />
              <SignalList signals={bestScenario.positiveSignals} />
            </section>
          )}

          {/* Pricing Breakdown - 3 layers always visible */}
          <section>
            <SectionHeader 
              title="Стоимость" 
              subtitle="Три слоя: сервис, внешние сборы, опции"
              className="mb-4"
            />
            <PricingBreakdownCard pricing={mockActiveCase.pricing} />
          </section>
        </div>

        {/* Sticky CTA */}
        <ResultCTA />
      </div>
    </AppShell>
  )
}
