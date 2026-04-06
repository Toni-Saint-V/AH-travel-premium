import { Check, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const scenarios = [
  {
    path: 'recommended' as const,
    icon: Check,
    label: 'Рекомендуем',
    title: 'Шенген через Испанию',
    confidence: 'Высокая уверенность',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
  },
  {
    path: 'alternative' as const,
    icon: AlertTriangle,
    label: 'Альтернатива',
    title: 'Шенген через Францию',
    confidence: 'Средняя уверенность',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
  },
  {
    path: 'not_recommended' as const,
    icon: X,
    label: 'Не рекомендуется',
    title: 'Без финансовых документов',
    confidence: 'Низкая уверенность',
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
                  scenario.path === 'recommended' && 'glow-success'
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
                  <span className={cn('text-caption', scenario.color)}>
                    {scenario.confidence}
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
