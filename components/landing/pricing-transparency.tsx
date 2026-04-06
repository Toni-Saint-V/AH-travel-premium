import { Sparkles, Building2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PricingTransparency() {
  return (
    <section id="pricing" className="py-16 px-4 surface-1 scroll-mt-16">
      <div className="max-w-lg mx-auto">
        <h2 className="text-h2 text-text-high text-center mb-2">
          Прозрачное ценообразование
        </h2>
        <p className="text-body text-text-mid text-center mb-8">
          Всегда три отдельных слоя: наш сервис, внешние сборы, опции
        </p>

        <div className="surface-0 rounded-xl border border-border-hairline overflow-hidden">
          {/* Layer 1: AH Travel Service */}
          <div className="p-4 border-b border-border-hairline">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <span className="text-label text-accent">Сервис AH Travel</span>
            </div>
            <p className="text-caption text-text-mid mb-3">
              AI-оценка, подготовка документов, сопровождение
            </p>
            <div className="text-h2 text-text-high">от 4 900 ₽</div>
          </div>

          {/* Layer 2: External Fees */}
          <div className="p-4 border-b border-border-hairline">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-2">
                <Building2 className="w-4 h-4 text-text-mid" />
              </div>
              <span className="text-label text-text-high">Обязательные внешние сборы</span>
            </div>
            <div className="space-y-2 text-caption">
              <div className="flex items-center justify-between">
                <span className="text-text-mid">Консульский сбор</span>
                <span className="text-text-high">8 000 ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-mid">Сервисный сбор ВЦ</span>
                <span className="text-text-high">2 500 ₽</span>
              </div>
            </div>
          </div>

          {/* Layer 3: Add-ons */}
          <div className="p-4 border-b border-border-hairline">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-2">
                <Plus className="w-4 h-4 text-text-mid" />
              </div>
              <span className="text-label text-text-high">Дополнительно</span>
            </div>
            <div className="space-y-2 text-caption">
              <div className="flex items-center justify-between">
                <span className="text-text-mid">VIP-сопровождение</span>
                <span className="text-text-low">+3 500 ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-mid">Страховой полис</span>
                <span className="text-text-low">+1 200 ₽</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 surface-2">
            <div className="flex items-center justify-between">
              <span className="text-h3 text-text-high">Пример итога</span>
              <span className="text-h2 text-accent">от 15 400 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
