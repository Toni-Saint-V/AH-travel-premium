import Link from 'next/link'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { NextAction } from '@/lib/mock-data'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'

interface JourneyNextActionProps {
  action: NextAction
}

export function JourneyNextAction({ action }: JourneyNextActionProps) {
  const isUrgent = action.urgency === 'high'

  return (
    <section>
      <SectionHeader 
        title="Следующий шаг" 
        className="mb-3"
      />
      
      <Link
        href={action.ctaHref}
        className={cn(
          'flex items-center gap-4 p-4 rounded-xl border transition-fast',
          'active:scale-[0.99]',
          isUrgent
            ? 'surface-2 border-accent/40 glow-accent'
            : 'surface-1 border-border-hairline hover:surface-2'
        )}
      >
        <div className={cn(
          'flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0',
          isUrgent ? 'bg-accent/15' : 'bg-bg-2'
        )}>
          <AlertCircle className={cn(
            'w-6 h-6',
            isUrgent ? 'text-accent' : 'text-text-mid'
          )} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-h3 text-text-high mb-1">{action.title}</h3>
          <p className="text-caption text-text-mid line-clamp-2">{action.description}</p>
        </div>

        <div className={cn(
          'flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0',
          isUrgent ? 'bg-accent text-white' : 'bg-bg-2 text-text-mid'
        )}>
          <ArrowRight className="w-5 h-5" />
        </div>
      </Link>
    </section>
  )
}
