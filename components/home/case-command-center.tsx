'use client'

import Link from 'next/link'
import { ArrowRight, AlertOctagon, ChevronRight } from 'lucide-react'
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

export function CaseCommandCenter({ caseData }: CaseCommandCenterProps) {
  const stats = getDocumentStats(caseData.documents)
  const nextAction = getNextAction(caseData)
  const daysUntilTrip = getDaysUntilTrip(caseData.travelDates.start)
  const progress = getCaseProgress(caseData)
  const blockers = getBlockers(caseData)
  
  return (
    <div className="space-y-8">
      
      {/* BLOCKERS - dramatic when present */}
      {blockers.length > 0 && (
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <AlertOctagon className="w-4 h-4 text-danger" />
            <span className="text-caption text-danger uppercase tracking-widest">Блокирует подачу</span>
          </div>
          <ul className="space-y-1 mb-4">
            {blockers.slice(0, 3).map((blocker, i) => (
              <li key={i} className="text-body text-text-high">{blocker}</li>
            ))}
          </ul>
          <Link
            href={nextAction.ctaHref}
            className="inline-flex items-center gap-2 text-label text-danger hover:underline"
          >
            {nextAction.ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* CASE HERO - destination + progress */}
      <Link href="/app/journey" className="block group">
        <div className="mb-8">
          {/* Destination context - stacked for mobile */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl" suppressHydrationWarning>{caseData.destinationFlag}</span>
              <span className="text-h3 text-text-high">{caseData.destination}</span>
            </div>
            <p className="text-body text-text-mid">{caseData.tripGoal}</p>
          </div>

          {/* Progress - THE number */}
          <div className="mb-5">
            <p className="text-caption text-text-low uppercase tracking-widest mb-3">Прогресс заявки</p>
            <div className="flex items-baseline gap-2">
              <span className="text-[48px] font-semibold text-text-high leading-none tabular-nums">{progress}</span>
              <span className="text-h2 text-text-low">%</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-bg-2 overflow-hidden mb-3">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-label text-accent">{caseStatusLabels[caseData.status]}</span>
            <ChevronRight className="w-5 h-5 text-text-low group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>

      {/* QUICK STATS - stacked cards for mobile clarity */}
      <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-border-hairline">
        <Link href="/app/documents" className="hover:opacity-80 transition-opacity">
          <p className="text-caption text-text-low mb-2">Документы</p>
          <p className={cn('text-h2', stats.blockers > 0 ? 'text-warning' : stats.verified === stats.total ? 'text-success' : 'text-text-high')}>
            {stats.verified}/{stats.total}
          </p>
        </Link>
        <div>
          <p className="text-caption text-text-low mb-2">До поездки</p>
          <p className={cn('text-h2', daysUntilTrip < 30 ? 'text-warning' : 'text-text-high')}>
            {daysUntilTrip} дн.
          </p>
        </div>
      </div>

      {/* AI Summary - subtle */}
      {caseData.aiSummary && (
        <div className="pl-4 border-l-2 border-accent/30 py-1">
          <p className="text-body text-text-mid leading-relaxed">
            {caseData.aiSummary}
          </p>
        </div>
      )}

      {/* Next action - if no blockers */}
      {blockers.length === 0 && (
        <Link 
          href={nextAction.ctaHref}
          className="flex items-center justify-between py-4 rounded-xl surface-1 px-4 hover:surface-2 transition-fast"
        >
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-label text-text-high mb-1">{nextAction.title}</p>
            <p className="text-caption text-text-mid">{nextAction.description}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-text-low flex-shrink-0" />
        </Link>
      )}
    </div>
  )
}
