import Link from 'next/link'
import { ChevronRight, FileText, CreditCard, Sparkles } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { JourneyHeader } from '@/components/journey/journey-header'
import { JourneyTimeline } from '@/components/journey/journey-timeline'
import { SurfaceCard } from '@/components/ui/surface-card'
import { SectionHeader } from '@/components/ui/section-header'
import { 
  mockActiveCase, 
  caseStatusLabels, 
  getDocumentStats, 
  getNextAction,
  confidenceLevelLabels
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function JourneyPage() {
  const selectedScenario = mockActiveCase.scenarios.find(s => s.id === mockActiveCase.selectedScenarioId)
  const stats = getDocumentStats(mockActiveCase.documents)
  const nextAction = getNextAction(mockActiveCase)
  
  return (
    <AppShell title="Статус заявки">
      <div className="px-4 pt-4 pb-6">
        <div className="space-y-6">
          {/* Journey Header - destination, goal, status, dates */}
          <JourneyHeader 
            destination={mockActiveCase.destination}
            destinationFlag={mockActiveCase.destinationFlag}
            tripGoal={mockActiveCase.tripGoal}
            status={mockActiveCase.status}
            statusLabel={caseStatusLabels[mockActiveCase.status]}
            travelDates={mockActiveCase.travelDates}
          />

          {/* AI Summary - quick insight */}
          {mockActiveCase.aiSummary && (
            <SurfaceCard className="border-l-2 border-l-accent">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-label text-text-high mb-1">AI-оценка</p>
                  <p className="text-body text-text-mid leading-relaxed">
                    {mockActiveCase.aiSummary}
                  </p>
                </div>
              </div>
            </SurfaceCard>
          )}

          {/* Quick Links */}
          <section>
            <SectionHeader title="Быстрые действия" className="mb-3" />
            <div className="space-y-2">
              <QuickLink 
                href="/app/documents"
                icon={<FileText className="w-5 h-5" />}
                title="Документы"
                subtitle={`${stats.verified}/${stats.total} проверено`}
                highlight={stats.blockers > 0}
              />
              <QuickLink 
                href="/app/result"
                icon={<Sparkles className="w-5 h-5" />}
                title="Оценка и сценарий"
                subtitle={selectedScenario ? `${selectedScenario.title} — ${confidenceLevelLabels[selectedScenario.confidence].toLowerCase()}` : '—'}
              />
              <QuickLink 
                href="/app/checkout"
                icon={<CreditCard className="w-5 h-5" />}
                title="Оплата и оформление"
                subtitle={stats.verified === stats.total ? 'Готово к оплате' : 'Сначала загрузите документы'}
                disabled={stats.verified !== stats.total}
              />
            </div>
          </section>

          {/* Timeline - progress visualization */}
          <section>
            <SectionHeader title="История заявки" className="mb-3" />
            <JourneyTimeline events={mockActiveCase.timeline} />
          </section>
        </div>
      </div>
    </AppShell>
  )
}

function QuickLink({
  href,
  icon,
  title,
  subtitle,
  highlight = false,
  disabled = false,
}: {
  href: string
  icon: React.ReactNode
  title: string
  subtitle: string
  highlight?: boolean
  disabled?: boolean
}) {
  const content = (
    <div className={cn(
      'flex items-center gap-4 p-4 rounded-xl border transition-fast',
      disabled 
        ? 'surface-1 border-border-hairline opacity-50 cursor-not-allowed'
        : 'surface-1 border-border-hairline hover:surface-2',
      highlight && !disabled && 'border-l-2 border-l-warning'
    )}>
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
        highlight ? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-label text-text-high">{title}</p>
        <p className="text-caption text-text-mid truncate">{subtitle}</p>
      </div>
      {!disabled && <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0" />}
    </div>
  )

  if (disabled) {
    return content
  }

  return <Link href={href}>{content}</Link>
}
