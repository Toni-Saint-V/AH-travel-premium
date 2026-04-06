import { Check, Circle, Clock } from 'lucide-react'
import { TimelineEvent } from '@/lib/mock-data'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'

interface JourneyTimelineProps {
  events: TimelineEvent[]
}

export function JourneyTimeline({ events }: JourneyTimelineProps) {
  return (
    <section>
      <SectionHeader 
        title="История и план" 
        subtitle="Этапы оформления"
        className="mb-4"
      />
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border-hairline" />
        
        <div className="space-y-0">
          {events.map((event, index) => {
            const isCompleted = event.status === 'completed'
            const isCurrent = event.status === 'current'
            const isUpcoming = event.status === 'upcoming'
            const isLast = index === events.length - 1

            return (
              <div 
                key={event.id} 
                className={cn(
                  'relative flex gap-4 pb-6',
                  isLast && 'pb-0'
                )}
              >
                {/* Timeline dot */}
                <div className={cn(
                  'relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0',
                  isCompleted && 'bg-success',
                  isCurrent && 'bg-accent glow-accent',
                  isUpcoming && 'bg-bg-2 border border-border-strong'
                )}>
                  {isCompleted && <Check className="w-4 h-4 text-white" />}
                  {isCurrent && <Circle className="w-3 h-3 text-white fill-white" />}
                  {isUpcoming && <Clock className="w-3.5 h-3.5 text-text-low" />}
                </div>

                {/* Content */}
                <div className={cn(
                  'flex-1 pt-1',
                  isUpcoming && 'opacity-50'
                )}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn(
                      'text-caption',
                      isCurrent ? 'text-accent' : 'text-text-low'
                    )}>
                      {event.date}
                    </span>
                  </div>
                  <h4 className={cn(
                    'text-label',
                    isCurrent ? 'text-text-high' : isCompleted ? 'text-text-mid' : 'text-text-low'
                  )}>
                    {event.title}
                  </h4>
                  {event.description && (
                    <p className="text-caption text-text-low mt-0.5">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
