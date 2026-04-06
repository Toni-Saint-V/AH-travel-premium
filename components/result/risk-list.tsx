'use client'

import { useState } from 'react'
import { AlertTriangle, ChevronDown, Lightbulb } from 'lucide-react'
import { Risk } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface RiskListProps {
  risks: Risk[]
}

const severityConfig = {
  high: {
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/20',
    label: 'Высокий',
  },
  medium: {
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
    label: 'Средний',
  },
  low: {
    color: 'text-accent-2',
    bgColor: 'bg-accent-2/10',
    borderColor: 'border-accent-2/20',
    label: 'Низкий',
  },
}

export function RiskList({ risks }: RiskListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {risks.map((risk) => {
        const config = severityConfig[risk.severity]
        const isExpanded = expandedId === risk.id

        return (
          <div
            key={risk.id}
            className={cn(
              'rounded-xl border transition-fast overflow-hidden',
              config.borderColor,
              'surface-1'
            )}
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : risk.id)}
              className="w-full flex items-start gap-3 p-4 text-left"
            >
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0',
                config.bgColor
              )}>
                <AlertTriangle className={cn('w-4 h-4', config.color)} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn('text-caption font-medium', config.color)}>
                    {config.label}
                  </span>
                </div>
                <h4 className="text-label text-text-high">{risk.title}</h4>
              </div>

              <ChevronDown className={cn(
                'w-5 h-5 text-text-low flex-shrink-0 transition-transform',
                isExpanded && 'rotate-180'
              )} />
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-body text-text-mid mb-3 pl-11">
                  {risk.description}
                </p>
                
                {risk.recommendation && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10 ml-11">
                    <Lightbulb className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-caption text-text-mid">
                      {risk.recommendation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
