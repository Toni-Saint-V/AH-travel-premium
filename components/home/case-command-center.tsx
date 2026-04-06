'use client'

import Link from 'next/link'
import { 
  ArrowRight, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { SurfaceCard } from '@/components/ui/surface-card'
import { StatusBadge } from '@/components/ui/status-badge'
import { ProgressBar } from '@/components/ui/progress-bar'
import { 
  Case, 
  caseStatusLabels, 
  getDocumentStats, 
  getNextAction, 
  getDaysUntilTrip,
  getCaseProgress,
  getBlockers
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface CaseCommandCenterProps {
  caseData: Case
}

function getStatusVariant(status: Case['status']) {
  switch (status) {
    case 'approved':
    case 'travel_ready':
    case 'completed':
      return 'success'
    case 'rejected':
      return 'danger'
    case 'collecting_documents':
    case 'documents_ready':
      return 'accent'
    case 'waiting_decision':
    case 'applying':
      return 'info'
    default:
      return 'accent'
  }
}

export function CaseCommandCenter({ caseData }: CaseCommandCenterProps) {
  const stats = getDocumentStats(caseData.documents)
  const nextAction = getNextAction(caseData)
  const daysUntilTrip = getDaysUntilTrip(caseData.travelDates.start)
  const progress = getCaseProgress(caseData)
  const blockers = getBlockers(caseData)
  
  return (
    <div className="space-y-4">
      {/* Blockers Banner - highest priority, always visible when present */}
      {blockers.length > 0 && (
        <div className="surface-1 rounded-xl p-4 border border-danger/20 bg-danger/5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-danger" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label text-danger mb-1">Что мешает подаче</p>
              <ul className="space-y-1">
                {blockers.slice(0, 2).map((blocker, i) => (
                  <li key={i} className="text-caption text-text-mid">{blocker}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Next Action - primary CTA */}
      <Link href={nextAction.ctaHref}>
        <SurfaceCard 
          variant="interactive"
          className={cn(
            'border-l-2',
            nextAction.type === 'blocker' && 'border-l-warning',
            nextAction.type === 'recommended' && 'border-l-accent',
            nextAction.type === 'info' && 'border-l-accent-2'
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              nextAction.type === 'blocker' && 'bg-warning/10',
              nextAction.type === 'recommended' && 'bg-accent/10',
              nextAction.type === 'info' && 'bg-accent-2/10'
            )}>
              {nextAction.type === 'blocker' && <AlertCircle className="w-5 h-5 text-warning" />}
              {nextAction.type === 'recommended' && <CheckCircle2 className="w-5 h-5 text-accent" />}
              {nextAction.type === 'info' && <Clock className="w-5 h-5 text-accent-2" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label text-text-high mb-0.5">{nextAction.title}</p>
              <p className="text-caption text-text-mid line-clamp-2">{nextAction.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0 mt-2" />
          </div>
        </SurfaceCard>
      </Link>

      {/* Case Card - destination, status, progress */}
      <Link href="/app/journey">
        <SurfaceCard variant="interactive" className="relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl" suppressHydrationWarning>{caseData.destinationFlag}</span>
                <div>
                  <h3 className="text-h3 text-text-high">{caseData.destination}</h3>
                  <p className="text-caption text-text-mid">{caseData.tripGoal}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-low mt-1" />
            </div>

            {/* Status */}
            <StatusBadge variant={getStatusVariant(caseData.status)} dot>
              {caseStatusLabels[caseData.status]}
            </StatusBadge>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-caption">
                <span className="text-text-mid">Общий прогресс</span>
                <span className="text-text-high">{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </div>

            {/* AI Summary */}
            {caseData.aiSummary && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-caption text-text-mid line-clamp-2">
                  {caseData.aiSummary}
                </p>
              </div>
            )}
          </div>
        </SurfaceCard>
      </Link>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Documents */}
        <Link href="/app/documents" className="block">
          <div className="surface-1 rounded-xl p-3 border border-border-hairline hover:surface-2 transition-fast">
            <FileText className={cn(
              'w-5 h-5 mb-2',
              stats.blockers > 0 ? 'text-warning' : stats.verified === stats.total ? 'text-success' : 'text-accent'
            )} />
            <div className={cn(
              'text-h3',
              stats.blockers > 0 ? 'text-warning' : stats.verified === stats.total ? 'text-success' : 'text-text-high'
            )}>
              {stats.verified}/{stats.total}
            </div>
            <div className="text-caption text-text-low mt-0.5">Документы</div>
          </div>
        </Link>

        {/* Days until trip */}
        <div className="surface-1 rounded-xl p-3 border border-border-hairline">
          <Calendar className={cn(
            'w-5 h-5 mb-2',
            daysUntilTrip < 30 ? 'text-warning' : 'text-text-mid'
          )} />
          <div className={cn(
            'text-h3',
            daysUntilTrip < 30 ? 'text-warning' : 'text-text-high'
          )}>
            {daysUntilTrip} дн.
          </div>
          <div className="text-caption text-text-low mt-0.5">До поездки</div>
        </div>

        {/* Scenario confidence */}
        <Link href="/app/result" className="block">
          <div className="surface-1 rounded-xl p-3 border border-border-hairline hover:surface-2 transition-fast">
            <Sparkles className="w-5 h-5 mb-2 text-accent" />
            <div className="text-h3 text-text-high">
              {caseData.scenarios.find(s => s.id === caseData.selectedScenarioId)?.confidence === 'high' 
                ? 'Высокая' 
                : caseData.scenarios.find(s => s.id === caseData.selectedScenarioId)?.confidence === 'medium'
                ? 'Средняя'
                : 'Низкая'}
            </div>
            <div className="text-caption text-text-low mt-0.5">Оценка</div>
          </div>
        </Link>
      </div>

      {/* View full journey link */}
      <Link 
        href="/app/journey"
        className="flex items-center justify-center gap-2 py-3 text-accent text-label hover:underline"
      >
        Подробный статус заявки
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
