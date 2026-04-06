import { FileCheck, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn } from '@/lib/utils'

interface DocumentProgressProps {
  total: number
  verified: number
  needsAction: number
  reviewing?: number
}

export function DocumentProgress({ total, verified, needsAction, reviewing = 0 }: DocumentProgressProps) {
  const percentage = total > 0 ? Math.round((verified / total) * 100) : 0
  const allReady = verified === total

  return (
    <div className="surface-1 rounded-xl p-4 border border-border-hairline space-y-4">
      {/* Main progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-h3 text-text-high">Готовность документов</h2>
          <span className={cn(
            'text-h3',
            allReady ? 'text-success' : 'text-accent'
          )}>{percentage}%</span>
        </div>
        <ProgressBar 
          value={percentage} 
          size="lg"
          variant={allReady ? 'success' : 'default'}
        />
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-border-hairline">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="text-caption text-text-mid">{verified} проверено</span>
        </div>
        {reviewing > 0 && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-2" />
            <span className="text-caption text-text-mid">{reviewing} на проверке</span>
          </div>
        )}
        {needsAction > 0 && (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning" />
            <span className="text-caption text-text-mid">{needsAction} требуют действий</span>
          </div>
        )}
      </div>
    </div>
  )
}
