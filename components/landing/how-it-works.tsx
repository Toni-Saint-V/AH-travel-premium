import { ClipboardCheck, BarChart3, FileText, Plane } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Проверка шансов',
    description: 'Ответьте на вопросы о себе и поездке',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: BarChart3,
    title: 'Персональный результат',
    description: 'AI оценит профиль и покажет риски',
    color: 'text-accent-2',
    bgColor: 'bg-accent-2/10',
  },
  {
    icon: FileText,
    title: 'Сбор документов',
    description: 'Чек-лист и проверка каждого файла',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Plane,
    title: 'Готово к поездке',
    description: 'Сопровождение до результата',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-2">Как это работает</h2>
        <p className="text-body text-text-mid text-center mb-10">
          От вопроса до готовности за 4 шага
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="flex items-start gap-4 p-4 rounded-xl surface-1 border border-border-hairline"
              >
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-xl',
                    step.bgColor
                  )}>
                    <Icon className={cn('w-6 h-6', step.color)} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-4 bg-border-hairline mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-caption text-text-low">Шаг {index + 1}</span>
                  </div>
                  <h3 className="text-h3 text-text-high mb-0.5">{step.title}</h3>
                  <p className="text-caption text-text-mid">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
