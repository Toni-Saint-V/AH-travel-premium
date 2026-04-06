import { Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'
import { CaseStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface JourneyHeaderProps {
  destination: string
  destinationFlag: string
  tripGoal: string
  status: CaseStatus
  statusLabel: string
  travelDates: { start: string; end: string }
}

function getStatusVariant(status: CaseStatus) {
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

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  const startStr = startDate.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short' 
  })
  const endStr = endDate.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  })
  
  return `${startStr} — ${endStr}`
}

export function JourneyHeader({
  destination,
  destinationFlag,
  tripGoal,
  status,
  statusLabel,
  travelDates,
}: JourneyHeaderProps) {
  return (
    <div className="surface-1 rounded-xl p-4 border border-border-hairline">
      {/* Main info */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl" suppressHydrationWarning>{destinationFlag}</span>
        <div className="flex-1">
          <h1 className="text-h2 text-text-high">{destination}</h1>
          <p className="text-body text-text-mid">{tripGoal}</p>
        </div>
      </div>

      {/* Status and dates */}
      <div className="flex items-center justify-between pt-3 border-t border-border-hairline">
        <StatusBadge variant={getStatusVariant(status)} dot>
          {statusLabel}
        </StatusBadge>
        
        <div className="flex items-center gap-1.5 text-caption text-text-mid">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDateRange(travelDates.start, travelDates.end)}</span>
        </div>
      </div>
    </div>
  )
}
