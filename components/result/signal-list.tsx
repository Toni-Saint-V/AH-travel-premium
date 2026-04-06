import { CheckCircle2 } from 'lucide-react'
import { Signal } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface SignalListProps {
  signals: Signal[]
}

export function SignalList({ signals }: SignalListProps) {
  return (
    <div className="space-y-2">
      {signals.map((signal) => (
        <div
          key={signal.id}
          className="flex items-start gap-3 p-4 rounded-xl surface-1 border border-success/20"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-label text-text-high mb-0.5">{signal.title}</h4>
            <p className="text-caption text-text-mid">{signal.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
