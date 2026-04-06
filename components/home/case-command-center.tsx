'use client'

import Link from 'next/link'
import { 
  ArrowRight, 
  AlertOctagon, 
  FileText, 
  Calendar, 
  ChevronRight,
  Sparkles
} from 'lucide-react'
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
  const selectedScenario = caseData.scenarios.find(s => s.id === caseData.selectedScenarioId)
  
  return (
    <div className="space-y-5">
      
      {/* BLOCKERS - Highest visual priority when present */}
      {blockers.length > 0 && (
        <div className="rounded-2xl border-2 border-danger/30 bg-danger/5 p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertOctagon className="w-6 h-6 text-danger flex-shrink-0" />
            <div>
              <p className="text-label text-danger">Что мешает подаче</p>
            </div>
          </div>
          <ul className="space-y-1.5 ml-9">
            {blockers.slice(0, 3).map((blocker, i) => (
              <li key={i} className="text-body text-text-high">{blocker}</li>
            ))}
          </ul>
          <Link
            href={nextAction.ctaHref}
            className="flex items-center gap-1 ml-9 mt-3 text-label text-danger hover:underline"
          >
            {nextAction.ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* CASE CARD - The main entity, always visible */}
      <Link href="/app/journey" className="block">
        <div className="surface-1 rounded-2xl border border-border-hairline p-5 hover:surface-2 transition-fast">
          {/* Header with destination */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl" suppressHydrationWarning>{caseData.destinationFlag}</span>
              <div>
                <h2 className="text-h2 text-text-high">{caseData.destination}</h2>
                <p className="text-caption text-text-mid">{caseData.tripGoal}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-low mt-1" />
          </div>

          {/* Status badge - inline, not separate component for simplicity */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-caption font-medium text-accent">
              {caseStatusLabels[caseData.status]}
            </span>
          </div>

          {/* Progress - THE dominant number */}
          <div className="mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-caption text-text-mid">Общий прогресс</span>
              <span className="text-h2 text-text-high">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* AI Summary - if present */}
          {caseData.aiSummary && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-caption text-text-mid">
                {caseData.aiSummary}
              </p>
            </div>
          )}
        </div>
      </Link>

      {/* QUICK STATS - Secondary, compact */}
      <div className="grid grid-cols-3 gap-3">
        {/* Documents */}
        <Link href="/app/documents" className="block">
          <div className={cn(
            'rounded-xl p-4 border transition-fast hover:surface-2',
            stats.blockers > 0 
              ? 'surface-1 border-warning/30 bg-warning/5' 
              : stats.verified === stats.total 
              ? 'surface-1 border-success/30 bg-success/5'
              : 'surface-1 border-border-hairline'
          )}>
            <FileText className={cn(
              'w-5 h-5 mb-2',
              stats.blockers > 0 ? 'text-warning' : stats.verified === stats.total ? 'text-success' : 'text-text-mid'
            )} />
            <div className={cn(
              'text-h2',
              stats.blockers > 0 ? 'text-warning' : stats.verified === stats.total ? 'text-success' : 'text-text-high'
            )}>
              {stats.verified}/{stats.total}
            </div>
            <div className="text-caption text-text-low mt-0.5">Документы</div>
          </div>
        </Link>

        {/* Days until trip */}
        <div className={cn(
          'rounded-xl p-4 border',
          daysUntilTrip < 30 
            ? 'surface-1 border-warning/30 bg-warning/5' 
            : 'surface-1 border-border-hairline'
        )}>
          <Calendar className={cn(
            'w-5 h-5 mb-2',
            daysUntilTrip < 30 ? 'text-warning' : 'text-text-mid'
          )} />
          <div className={cn(
            'text-h2',
            daysUntilTrip < 30 ? 'text-warning' : 'text-text-high'
          )}>
            {daysUntilTrip}
          </div>
          <div className="text-caption text-text-low mt-0.5">Дней до поездки</div>
        </div>

        {/* Confidence */}
        <Link href="/app/result" className="block">
          <div className={cn(
            'rounded-xl p-4 border transition-fast hover:surface-2',
            selectedScenario?.confidence === 'high' 
              ? 'surface-1 border-success/30 bg-success/5'
              : selectedScenario?.confidence === 'medium'
              ? 'surface-1 border-warning/30 bg-warning/5'
              : 'surface-1 border-border-hairline'
          )}>
            <Sparkles className={cn(
              'w-5 h-5 mb-2',
              selectedScenario?.confidence === 'high' ? 'text-success' :
              selectedScenario?.confidence === 'medium' ? 'text-warning' : 'text-text-mid'
            )} />
            <div className={cn(
              'text-label',
              selectedScenario?.confidence === 'high' ? 'text-success' :
              selectedScenario?.confidence === 'medium' ? 'text-warning' : 'text-text-high'
            )}>
              {selectedScenario?.confidence === 'high' ? 'Высокие' :
               selectedScenario?.confidence === 'medium' ? 'Средние' : 'Низкие'}
            </div>
            <div className="text-caption text-text-low mt-0.5">Шансы</div>
          </div>
        </Link>
      </div>

      {/* Next action link - if no blockers, show as simple link */}
      {blockers.length === 0 && (
        <Link 
          href={nextAction.ctaHref}
          className="flex items-center justify-between p-4 rounded-xl surface-1 border border-border-hairline hover:surface-2 transition-fast"
        >
          <div>
            <p className="text-label text-text-high">{nextAction.title}</p>
            <p className="text-caption text-text-mid">{nextAction.description}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-text-low" />
        </Link>
      )}
    </div>
  )
}
