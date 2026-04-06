'use client'

import Link from 'next/link'
import { ChevronRight, Sparkles } from 'lucide-react'
import { SurfaceCard } from '@/components/ui/surface-card'
import { StatusBadge } from '@/components/ui/status-badge'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Case, caseStatusLabels } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ActiveCaseCardProps {
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
    case 'need_improvement':
      return 'warning'
    case 'waiting_decision':
    case 'applying':
      return 'info'
    default:
      return 'accent'
  }
}

export function ActiveCaseCard({ caseData }: ActiveCaseCardProps) {
  const documentsProgress = caseData.documents.filter(
    d => d.status === 'verified' || d.status === 'uploaded' || d.status === 'reviewing'
  ).length
  const documentsTotal = caseData.documents.length
  const progressPercent = Math.round((documentsProgress / documentsTotal) * 100)

  return (
    <Link href="/app/journey" className="block">
      <SurfaceCard 
        variant="interactive" 
        className="relative overflow-hidden"
      >
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative space-y-4">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{caseData.destinationFlag}</span>
              <div>
                <h3 className="text-h3 text-text-high">{caseData.destination}</h3>
                <p className="text-caption text-text-mid">{caseData.tripGoal}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-low mt-1" />
          </div>

          {/* Status badge */}
          <StatusBadge variant={getStatusVariant(caseData.status)} dot>
            {caseStatusLabels[caseData.status]}
          </StatusBadge>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-caption">
              <span className="text-text-mid">Документы</span>
              <span className="text-text-high">{documentsProgress} из {documentsTotal}</span>
            </div>
            <ProgressBar 
              value={progressPercent} 
              variant={progressPercent === 100 ? 'success' : 'default'}
            />
          </div>

          {/* AI Insight */}
          {caseData.aiInsight && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-caption text-text-mid line-clamp-2">
                {caseData.aiInsight}
              </p>
            </div>
          )}
        </div>
      </SurfaceCard>
    </Link>
  )
}
