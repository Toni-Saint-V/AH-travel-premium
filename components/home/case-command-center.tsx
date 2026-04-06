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
        <div className="mb-6">
          {/* Destination context */}
          <div className="flex items-center gap-2 mb-4 text-text-mid">
            <span className="text-xl" suppressHydrationWarning>{caseData.destinationFlag}</span>
            <span className="text-body">{caseData.destination}</span>
            <span className="text-text-low">·</span>
            <span className="text-body text-text-low">{caseData.tripGoal}</span>
          </div>

          {/* Progress - THE number */}
          <div className="mb-4">
            <p className="text-caption text-text-low uppercase tracking-widest mb-2">Прогресс заявки</p>
            <div className="flex items-baseline gap-2">
              <span className="text-[48px] font-semibold text-text-high leading-none tabular-nums">{progress}</span>
              <span className="text-h2 text-text-low">%</span>
            </div>
          </div>

          {/* Progress bar - minimal */}
          <div className="h-1 rounded-full bg-bg-2 overflow-hidden mb-2">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-caption text-accent">{caseStatusLabels[caseData.status]}</span>
            <ChevronRight className="w-4 h-4 text-text-low group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>

      {/* QUICK STATS - minimal row */}
      <div className="flex items-center gap-6 py-4 border-t border-b border-border-hairline">
        <Link href="/app/documents" className="flex-1 hover:opacity-80 transition-opacity">
          <p className="text-caption text-text-low mb-1">Документы</p>
          <p className={cn('text-h3', stats.blockers > 0 ? 'text-warning' : stats.verified === stats.total ? 'text-success' : 'text-text-high')}>
            {stats.verified}/{stats.total}
          </p>
        </Link>
        <div className="w-px h-8 bg-border-hairline" />
        <div className="flex-1">
          <p className="text-caption text-text-low mb-1">До поездки</p>
          <p className={cn('text-h3', daysUntilTrip < 30 ? 'text-warning' : 'text-text-high')}>
            {daysUntilTrip} дн.
          </p>
        </div>
      </div>

      {/* AI Summary - subtle */}
      {caseData.aiSummary && (
        <div className="pl-4 border-l-2 border-accent/30">
          <p className="text-body text-text-mid leading-relaxed">
            {caseData.aiSummary}
          </p>
        </div>
      )}

      {/* Next action - if no blockers */}
      {blockers.length === 0 && (
        <Link 
          href={nextAction.ctaHref}
          className="flex items-center justify-between py-3 -mx-2 px-2 rounded-lg hover:bg-bg-1 transition-fast"
        >
          <div>
            <p className="text-body text-text-high">{nextAction.title}</p>
            <p className="text-caption text-text-mid">{nextAction.description}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-low" />
        </Link>
      )}
    </div>
  )
}
