import { Check, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function DecisionPreview() {
  return (
    <section className="py-16 px-4 surface-1">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-2">
          Пример вашего результата
        </h2>
        <p className="text-body text-text-mid text-center mb-8">
          Через 2 минуты вы получите персональную оценку
        </p>

        {/* Mock Result Card */}
        <div className="surface-0 rounded-2xl border border-border-hairline overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border-hairline">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" suppressHydrationWarning>🇪🇸</span>
              <div>
                <h3 className="text-h3 text-text-high">Испания</h3>
                <p className="text-caption text-text-mid">Туристическая виза</p>
              </div>
            </div>
            
            {/* Chance Score */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-label text-success">Высокие шансы</span>
              </div>
              <span className="text-h2 text-success">94%</span>
            </div>
          </div>

          {/* Key Points */}
          <div className="p-4 space-y-3">
            {/* Positive */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10 flex-shrink-0">
                <Check className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-label text-text-high">Сильные стороны</p>
                <p className="text-caption text-text-mid">Стабильный доход, недвижимость в собственности</p>
              </div>
            </div>

            {/* Risk */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning/10 flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-label text-text-high">На что обратить внимание</p>
                <p className="text-caption text-text-mid">Первая шенгенская виза — добавьте детальный маршрут</p>
              </div>
            </div>

            {/* AI Insight */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10">
              <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-caption text-text-mid">
                Рекомендую подать через Испанию напрямую. Это оптимальный путь с учётом вашего профиля.
              </p>
            </div>
          </div>

          {/* Next Step */}
          <div className="p-4 border-t border-border-hairline surface-2">
            <p className="text-caption text-text-low mb-2">Следующий шаг:</p>
            <p className="text-label text-text-high">Загрузите 6 документов для подачи заявления</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/app/questionnaire"
          className={cn(
            'flex items-center justify-center gap-2 w-full h-12 mt-6',
            'rounded-xl bg-accent text-white font-medium',
            'hover:bg-accent/90 active:scale-[0.98]',
            'transition-fast touch-target'
          )}
        >
          Получить свою оценку
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
