import Link from 'next/link'
import { ChevronRight, Calendar } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { JourneyTimeline } from '@/components/journey/journey-timeline'
import { 
  mockActiveCase, 
  caseStatusLabels, 
  getDocumentStats, 
  getDaysUntilTrip,
  confidenceLevelLabels
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function JourneyPage() {
  const selectedScenario = mockActiveCase.scenarios.find(s => s.id === mockActiveCase.selectedScenarioId)
  const stats = getDocumentStats(mockActiveCase.documents)
  const daysUntilTrip = getDaysUntilTrip(mockActiveCase.travelDates.start)
  const allDocsReady = stats.verified === stats.total
  
  return (
    <AppShell title="Статус заявки" showBack backHref="/app/home">
      <div className="px-4 pt-6 pb-6">
        
        {/* HERO: Destination - dramatic, progress-focused */}
        <section className="mb-10">
          {/* Flag + destination - stacked for mobile */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
              <span className="text-h3 text-text-high">{mockActiveCase.destination}</span>
            </div>
            <p className="text-body text-text-mid">{mockActiveCase.tripGoal}</p>
          </div>

          {/* Status - THE focal point */}
          <div className="mb-6">
            <p className="text-caption text-text-low uppercase tracking-widest mb-3">Статус заявки</p>
            <h1 className="text-[32px] font-semibold text-text-high leading-tight">
              {caseStatusLabels[mockActiveCase.status]}
            </h1>
          </div>

          {/* Days countdown */}
          <div className={cn(
            'inline-flex items-center gap-3 px-4 py-3 rounded-xl',
            daysUntilTrip < 30 ? 'bg-warning/10' : 'bg-bg-1'
          )}>
            <Calendar className={cn('w-5 h-5', daysUntilTrip < 30 ? 'text-warning' : 'text-text-low')} />
            <span className={cn('text-label', daysUntilTrip < 30 ? 'text-warning' : 'text-text-mid')}>
              {daysUntilTrip} дней до поездки
            </span>
          </div>
        </section>

        {/* AI Summary - subtle, inline */}
        {mockActiveCase.aiSummary && (
          <section className="mb-8 pl-4 border-l-2 border-accent/30">
            <p className="text-body text-text-mid leading-relaxed">
              {mockActiveCase.aiSummary}
            </p>
          </section>
        )}

        {/* Quick Actions - card style for mobile clarity */}
        <section className="mb-8">
          <p className="text-caption text-text-low uppercase tracking-widest mb-4">Действия</p>
          <div className="space-y-3">
            {/* Documents */}
            <Link 
              href="/app/documents" 
              className="flex items-center justify-between p-4 rounded-xl surface-1 hover:surface-2 transition-fast"
            >
              <div>
                <p className="text-label text-text-high mb-1">Документы</p>
                <p className={cn('text-caption', stats.blockers > 0 ? 'text-warning' : allDocsReady ? 'text-success' : 'text-text-mid')}>
                  {stats.blockers > 0 ? `${stats.blockers} требуют внимания` : allDocsReady ? 'Все готово' : `${stats.verified} из ${stats.total} проверено`}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0" />
            </Link>

            {/* Scenario */}
            <Link 
              href="/app/result" 
              className="flex items-center justify-between p-4 rounded-xl surface-1 hover:surface-2 transition-fast"
            >
              <div>
                <p className="text-label text-text-high mb-1">Оценка шансов</p>
                <p className="text-caption text-text-mid">
                  {selectedScenario ? confidenceLevelLabels[selectedScenario.confidence] : '—'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0" />
            </Link>

            {/* Checkout */}
            {allDocsReady ? (
              <Link 
                href="/app/checkout" 
                className="flex items-center justify-between p-4 rounded-xl surface-1 border border-success/20 hover:surface-2 transition-fast"
              >
                <div>
                  <p className="text-label text-success mb-1">Перейти к оплате</p>
                  <p className="text-caption text-text-mid">Документы готовы</p>
                </div>
                <ChevronRight className="w-5 h-5 text-success flex-shrink-0" />
              </Link>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl surface-1 opacity-50">
                <div>
                  <p className="text-label text-text-mid mb-1">Оплата</p>
                  <p className="text-caption text-text-low">Сначала загрузите документы</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Timeline - secondary, collapsible feel */}
        <section>
          <h2 className="text-label text-text-low uppercase tracking-wider mb-3">История</h2>
          <JourneyTimeline events={mockActiveCase.timeline} />
        </section>
      </div>
    </AppShell>
  )
}
