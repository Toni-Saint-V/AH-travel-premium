import { Check, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const scenarios = [
  {
    path: 'best' as const,
    icon: Check,
    label: 'Лучший путь',
    title: 'Шенген через Испанию',
    successRate: 94,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
  },
  {
    path: 'alternative' as const,
    icon: AlertTriangle,
    label: 'Альтернатива',
    title: 'Шенген через Францию',
    successRate: 87,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
  },
  {
    path: 'rejected' as const,
    icon: X,
    label: 'Не рекомендуется',
    title: 'Без финансовых документов',
    successRate: 23,
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/30',
  },
]

export function ScenarioPreview() {
  return (
    <section className="py-16 px-4 surface-1">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-2">
          Ранжирование сценариев
        </h2>
        <p className="text-body text-text-mid text-center mb-8">
          AI покажет лучший путь, альтернативы и что не работает
        </p>

        <div className="space-y-3">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon
            return (
              <div
                key={scenario.path}
                className={cn(
                  'p-4 rounded-xl border surface-0',
                  scenario.borderColor,
                  scenario.path === 'best' && 'glow-success'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn(
                    'flex items-center gap-1.5 px-2 py-1 rounded-md',
                    scenario.bgColor
                  )}>
                    <Icon className={cn('w-3.5 h-3.5', scenario.color)} />
                    <span className={cn('text-caption font-medium', scenario.color)}>
                      {scenario.label}
                    </span>
                  </div>
                  <span className={cn(
                    'text-h3',
                    scenario.successRate >= 80 ? 'text-success' :
                    scenario.successRate >= 50 ? 'text-warning' : 'text-danger'
                  )}>
                    {scenario.successRate}%
                  </span>
                </div>
                <h3 className="text-label text-text-high">{scenario.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
