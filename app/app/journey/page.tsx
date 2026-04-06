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
          {/* Flag + destination - quiet context */}
          <div className="flex items-center gap-2 mb-6 text-text-mid">
            <span className="text-xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
            <span className="text-body">{mockActiveCase.destination}</span>
            <span className="text-text-low">·</span>
            <span className="text-body text-text-low">{mockActiveCase.tripGoal}</span>
          </div>

          {/* Status - THE focal point */}
          <div className="mb-6">
            <p className="text-caption text-text-low uppercase tracking-widest mb-2">Статус заявки</p>
            <h1 className="text-[32px] font-semibold text-text-high leading-tight">
              {caseStatusLabels[mockActiveCase.status]}
            </h1>
          </div>

          {/* Days countdown */}
          <div className={cn(
            'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
            daysUntilTrip < 30 ? 'bg-warning/10' : 'bg-bg-1'
          )}>
            <Calendar className={cn('w-4 h-4', daysUntilTrip < 30 ? 'text-warning' : 'text-text-low')} />
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

        {/* Quick Actions - minimal list style */}
        <section className="mb-8">
          <p className="text-caption text-text-low uppercase tracking-widest mb-4">Действия</p>
          <div className="space-y-1">
            {/* Documents */}
            <Link 
              href="/app/documents" 
              className="flex items-center justify-between py-3 -mx-2 px-2 rounded-lg hover:bg-bg-1 transition-fast"
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-2 h-2 rounded-full', stats.blockers > 0 ? 'bg-warning' : allDocsReady ? 'bg-success' : 'bg-text-low')} />
                <span className="text-body text-text-high">Документы</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn('text-caption', stats.blockers > 0 ? 'text-warning' : allDocsReady ? 'text-success' : 'text-text-mid')}>
                  {stats.blockers > 0 ? `${stats.blockers} требуют внимания` : allDocsReady ? 'Готово' : `${stats.verified}/${stats.total}`}
                </span>
                <ChevronRight className="w-4 h-4 text-text-low" />
              </div>
            </Link>

            {/* Scenario */}
            <Link 
              href="/app/result" 
              className="flex items-center justify-between py-3 -mx-2 px-2 rounded-lg hover:bg-bg-1 transition-fast"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-body text-text-high">Оценка шансов</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caption text-text-mid">
                  {selectedScenario ? confidenceLevelLabels[selectedScenario.confidence] : '—'}
                </span>
                <ChevronRight className="w-4 h-4 text-text-low" />
              </div>
            </Link>

            {/* Checkout */}
            {allDocsReady ? (
              <Link 
                href="/app/checkout" 
                className="flex items-center justify-between py-3 -mx-2 px-2 rounded-lg hover:bg-bg-1 transition-fast"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-body text-success">Оплата</span>
                </div>
                <ChevronRight className="w-4 h-4 text-success" />
              </Link>
            ) : (
              <div className="flex items-center justify-between py-3 -mx-2 px-2 opacity-40">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-text-low" />
                  <span className="text-body text-text-mid">Оплата</span>
                </div>
                <span className="text-caption text-text-low">После документов</span>
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
