import Link from 'next/link'
import { Sparkles, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface JourneyAIStatusProps {
  insight: string
  scenarioTitle: string
  successRate: number
}

export function JourneyAIStatus({ insight, scenarioTitle, successRate }: JourneyAIStatusProps) {
  return (
    <Link 
      href="/app/result"
      className="block surface-1 rounded-xl p-4 border border-accent/20 hover:border-accent/40 transition-fast glow-accent"
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 flex-shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-label text-text-high">Выбранный путь</h3>
            <ChevronRight className="w-4 h-4 text-text-low flex-shrink-0" />
          </div>
          
          <p className="text-body text-accent mb-2">{scenarioTitle}</p>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className={cn(
                'w-2 h-2 rounded-full',
                successRate >= 80 ? 'bg-success' :
                successRate >= 50 ? 'bg-warning' : 'bg-danger'
              )} />
              <span className="text-caption text-text-mid">
                {successRate}% шанс одобрения
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {insight && (
        <p className="text-caption text-text-mid mt-3 pt-3 border-t border-border-hairline line-clamp-2">
          {insight}
        </p>
      )}
    </Link>
  )
}
