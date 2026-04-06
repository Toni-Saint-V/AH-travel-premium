import Link from 'next/link'
import { ChevronRight, FileText, CreditCard, Sparkles, Calendar, Check, Clock } from 'lucide-react'
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
      <div className="px-4 pt-4 pb-6">
        
        {/* HERO: Destination + Status - dominant */}
        <section className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl" suppressHydrationWarning>{mockActiveCase.destinationFlag}</span>
              <div>
                <h1 className="text-display text-text-high">{mockActiveCase.destination}</h1>
                <p className="text-body text-text-mid">{mockActiveCase.tripGoal}</p>
              </div>
            </div>
          </div>

          {/* Status + Days */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-label text-accent">
                {caseStatusLabels[mockActiveCase.status]}
              </span>
            </div>
            <div className={cn(
              'flex items-center gap-1.5 text-label',
              daysUntilTrip < 30 ? 'text-warning' : 'text-text-mid'
            )}>
              <Calendar className="w-4 h-4" />
              <span>{daysUntilTrip} дней до поездки</span>
            </div>
          </div>
        </section>

        {/* AI Summary - if present, distinct */}
        {mockActiveCase.aiSummary && (
          <section className="mb-6 p-4 rounded-xl bg-accent/5 border border-accent/10">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-body text-text-mid">
                {mockActiveCase.aiSummary}
              </p>
            </div>
          </section>
        )}

        {/* Quick Actions - simplified, clear hierarchy */}
        <section className="mb-8">
          <h2 className="text-label text-text-mid uppercase tracking-wider mb-3">Действия</h2>
          <div className="space-y-2">
            {/* Documents - primary if blockers */}
            <Link href="/app/documents" className="block">
              <div className={cn(
                'flex items-center justify-between p-4 rounded-xl border transition-fast hover:surface-2',
                stats.blockers > 0 
                  ? 'surface-1 border-warning/30 bg-warning/5'
                  : allDocsReady
                  ? 'surface-1 border-success/30 bg-success/5'
                  : 'surface-1 border-border-hairline'
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    stats.blockers > 0 ? 'bg-warning/10' : allDocsReady ? 'bg-success/10' : 'bg-accent/10'
                  )}>
                    <FileText className={cn(
                      'w-5 h-5',
                      stats.blockers > 0 ? 'text-warning' : allDocsReady ? 'text-success' : 'text-accent'
                    )} />
                  </div>
                  <div>
                    <p className="text-label text-text-high">Документы</p>
                    <p className={cn(
                      'text-caption',
                      stats.blockers > 0 ? 'text-warning' : allDocsReady ? 'text-success' : 'text-text-mid'
                    )}>
                      {stats.blockers > 0 
                        ? `${stats.blockers} требуют внимания`
                        : allDocsReady 
                        ? 'Все готово'
                        : `${stats.verified}/${stats.total} проверено`
                      }
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-low" />
              </div>
            </Link>

            {/* Scenario */}
            <Link href="/app/result" className="block">
              <div className="flex items-center justify-between p-4 rounded-xl surface-1 border border-border-hairline hover:surface-2 transition-fast">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-label text-text-high">Оценка</p>
                    <p className="text-caption text-text-mid">
                      {selectedScenario 
                        ? confidenceLevelLabels[selectedScenario.confidence]
                        : '—'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-low" />
              </div>
            </Link>

            {/* Checkout - disabled if docs not ready */}
            {allDocsReady ? (
              <Link href="/app/checkout" className="block">
                <div className="flex items-center justify-between p-4 rounded-xl surface-1 border-2 border-success/30 bg-success/5 hover:bg-success/10 transition-fast">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-label text-success">Перейти к оплате</p>
                      <p className="text-caption text-text-mid">Документы готовы</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-success" />
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl surface-1 border border-border-hairline opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg-2 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-text-low" />
                  </div>
                  <div>
                    <p className="text-label text-text-mid">Оплата</p>
                    <p className="text-caption text-text-low">Сначала загрузите документы</p>
                  </div>
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
