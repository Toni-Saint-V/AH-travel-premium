import { FileCheck, AlertCircle, Clock } from 'lucide-react'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn } from '@/lib/utils'

interface DocumentProgressProps {
  total: number
  verified: number
  needsAction: number
}

export function DocumentProgress({ total, verified, needsAction }: DocumentProgressProps) {
  const percentage = Math.round((verified / total) * 100)
  const inProgress = total - verified - needsAction

  return (
    <div className="surface-1 rounded-xl p-4 border border-border-hairline space-y-4">
      {/* Main progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-h3 text-text-high">Готовность документов</h2>
          <span className="text-h3 text-accent">{percentage}%</span>
        </div>
        <ProgressBar 
          value={percentage} 
          size="lg"
          variant={percentage === 100 ? 'success' : 'default'}
        />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 pt-2 border-t border-border-hairline">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-success" />
          <span className="text-caption text-text-mid">{verified} проверено</span>
        </div>
        {inProgress > 0 && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-2" />
            <span className="text-caption text-text-mid">{inProgress} на проверке</span>
          </div>
        )}
        {needsAction > 0 && (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-danger" />
            <span className="text-caption text-text-mid">{needsAction} требуют действий</span>
          </div>
        )}
      </div>
    </div>
  )
}
