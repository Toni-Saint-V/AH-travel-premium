'use client'

import { useState } from 'react'
import { Check, AlertTriangle, X, ChevronRight } from 'lucide-react'
import { Scenario, ScenarioPath } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ScenarioCardsProps {
  scenarios: Scenario[]
}

const pathConfig: Record<ScenarioPath, {
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
  bgColor: string
  borderColor: string
}> = {
  best: {
    icon: Check,
    label: 'Лучший путь',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
  },
  alternative: {
    icon: AlertTriangle,
    label: 'Альтернатива',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
  },
  rejected: {
    icon: X,
    label: 'Не рекомендуется',
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/30',
  },
}

export function ScenarioCards({ scenarios }: ScenarioCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Sort: best first, then alternative, then rejected
  const sortedScenarios = [...scenarios].sort((a, b) => {
    const order: Record<ScenarioPath, number> = { best: 0, alternative: 1, rejected: 2 }
    return order[a.path] - order[b.path]
  })

  return (
    <div className="space-y-3">
      {/* Horizontal scroll container */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
        {sortedScenarios.map((scenario, index) => {
          const config = pathConfig[scenario.path]
          const Icon = config.icon
          const isActive = index === activeIndex

          return (
            <button
              key={scenario.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'flex-shrink-0 w-[85%] max-w-[320px] p-4 rounded-xl border text-left',
                'transition-fast snap-center',
                isActive 
                  ? cn('surface-2', config.borderColor, scenario.path === 'best' && 'glow-success')
                  : 'surface-1 border-border-hairline opacity-70'
              )}
            >
              {/* Path badge */}
              <div className="flex items-center justify-between mb-3">
                <div className={cn(
                  'flex items-center gap-1.5 px-2 py-1 rounded-md',
                  config.bgColor
                )}>
                  <Icon className={cn('w-3.5 h-3.5', config.color)} />
                  <span className={cn('text-caption font-medium', config.color)}>
                    {config.label}
                  </span>
                </div>
                {scenario.recommended && (
                  <span className="text-caption text-accent">Рекомендуем</span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-h3 text-text-high mb-2">{scenario.title}</h3>
              <p className="text-caption text-text-mid mb-4 line-clamp-2">
                {scenario.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div>
                  <div className={cn(
                    'text-h3',
                    scenario.successRate >= 80 ? 'text-success' :
                    scenario.successRate >= 50 ? 'text-warning' : 'text-danger'
                  )}>
                    {scenario.successRate}%
                  </div>
                  <div className="text-caption text-text-low">Шанс одобрения</div>
                </div>
                <div className="w-px h-8 bg-border-hairline" />
                <div>
                  <div className="text-h3 text-text-high">{scenario.processingTime}</div>
                  <div className="text-caption text-text-low">Срок</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-1.5">
        {sortedScenarios.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-fast',
              index === activeIndex ? 'bg-accent w-4' : 'bg-border-strong'
            )}
            aria-label={`Сценарий ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
