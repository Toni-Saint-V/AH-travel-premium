import { AlertTriangle, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const scenarios = [
  {
    path: 'best' as const,
    icon: Check,
    title: 'Шенген через Испанию',
    successRate: 94,
    color: 'text-success',
    iconSurface: 'bg-success/[0.05]',
    iconBorder: 'border-success/16',
    progressFill: 'bg-success',
    cardSurface: 'bg-[linear-gradient(90deg,rgba(15,29,20,0.94)_0%,rgba(14,16,19,0.98)_70%)]',
  },
  {
    path: 'alternative' as const,
    icon: AlertTriangle,
    title: 'Шенген через Францию',
    successRate: 87,
    color: 'text-warning',
    iconSurface: 'bg-warning/[0.05]',
    iconBorder: 'border-warning/16',
    progressFill: 'bg-warning',
    cardSurface: 'bg-[linear-gradient(90deg,rgba(31,24,15,0.94)_0%,rgba(14,16,19,0.98)_70%)]',
  },
  {
    path: 'rejected' as const,
    icon: X,
    title: 'Без финансовых документов',
    successRate: 23,
    color: 'text-danger',
    iconSurface: 'bg-danger/[0.05]',
    iconBorder: 'border-danger/16',
    progressFill: 'bg-danger',
    cardSurface: 'bg-[linear-gradient(90deg,rgba(31,17,21,0.92)_0%,rgba(14,16,19,0.98)_70%)]',
  },
]

export function ScenarioPreview() {
  return (
    <section className="px-4 py-16 surface-1 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-h2 text-text-high">
          Ранжирование сценариев
        </h2>
        <p className="mx-auto mb-8 max-w-md text-center text-body text-text-mid sm:mb-10">
          Сразу видно, какой сценарий сильнее, какой запасной, а какой лучше исключить.
        </p>

        <div className="overflow-hidden rounded-[28px] border border-white/8 surface-0 shadow-[0_24px_64px_rgba(0,0,0,0.42)]">
          <div className="h-px bg-white/6" />

          <ul className="divide-y divide-white/6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon
              const successRate = clampSuccessRate(scenario.successRate)

              return (
                <li
                  key={scenario.path}
                  className={cn(
                    'px-4 py-4 sm:px-6 sm:py-5',
                    scenario.cardSurface
                  )}
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3">
                    <h3 className="min-w-0 max-w-[34rem] text-[17px] font-semibold leading-[1.15] tracking-[-0.018em] text-text-high sm:text-[20px]">
                      {scenario.title}
                    </h3>

                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
                        scenario.iconSurface,
                        scenario.iconBorder
                      )}
                    >
                      <Icon className={cn('h-4.5 w-4.5', scenario.color)} aria-hidden="true" />
                    </div>

                    <div
                      className="col-span-2 flex items-center"
                      role="img"
                      aria-label={`Сила сценария ${scenario.title}: ${successRate}%`}
                    >
                      <div
                        className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        aria-hidden="true"
                      >
                        <div
                          className={cn(
                            'h-full rounded-full shadow-[0_0_16px_rgba(255,255,255,0.06)]',
                            scenario.progressFill
                          )}
                          style={{ width: `${successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function clampSuccessRate(successRate: number) {
  return Math.max(0, Math.min(100, successRate))
}
