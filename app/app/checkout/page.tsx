'use client'

import { useState } from 'react'
import { Check, Plus, Shield, CreditCard, Lock } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { SurfaceCard } from '@/components/ui/surface-card'
import { SectionHeader } from '@/components/ui/section-header'
import { mockActiveCase } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function formatPrice(amount: number) {
  return `${amount.toLocaleString('ru-RU')} ₽`
}

export default function CheckoutPage() {
  const { pricing } = mockActiveCase
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    new Set(pricing.addOns.filter(a => a.selected).map(a => a.label))
  )

  const toggleAddOn = (label: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  const externalTotal = pricing.externalFees.reduce((sum, fee) => sum + fee.amount, 0)
  const addOnsTotal = pricing.addOns
    .filter(a => selectedAddOns.has(a.label))
    .reduce((sum, a) => sum + a.amount, 0)
  const grandTotal = pricing.serviceFee + externalTotal + addOnsTotal

  return (
    <AppShell 
      title="Оформление"
      showBack
      backHref="/app/journey"
    >
      <div className="px-4 pt-4 pb-6">
        {/* Case Summary */}
        <SurfaceCard className="mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{mockActiveCase.destinationFlag}</span>
            <div>
              <h2 className="text-h3 text-text-high">{mockActiveCase.destination}</h2>
              <p className="text-caption text-text-mid">{mockActiveCase.tripGoal}</p>
            </div>
          </div>
        </SurfaceCard>

        <div className="space-y-6">
          {/* Layer 1: AH Travel Service */}
          <section>
            <SectionHeader 
              title="Сервис AH Travel" 
              subtitle="AI-оценка, подготовка, сопровождение"
              className="mb-3"
            />
            <SurfaceCard className="border-l-2 border-l-accent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-label text-text-high">Полное сопровождение</p>
                  <p className="text-caption text-text-mid mt-1">
                    Проверка документов, запись в ВЦ, консультации
                  </p>
                </div>
                <span className="text-h3 text-accent">{formatPrice(pricing.serviceFee)}</span>
              </div>
            </SurfaceCard>
          </section>

          {/* Layer 2: External Fees */}
          <section>
            <SectionHeader 
              title="Обязательные внешние сборы" 
              subtitle="Оплачиваются отдельно в визовом центре"
              className="mb-3"
            />
            <SurfaceCard>
              <div className="space-y-3">
                {pricing.externalFees.map((fee) => (
                  <div key={fee.label} className="flex items-center justify-between">
                    <span className="text-body text-text-mid">{fee.label}</span>
                    <span className="text-body text-text-high">{formatPrice(fee.amount)}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-border-hairline flex items-center justify-between">
                  <span className="text-label text-text-mid">Итого внешние сборы</span>
                  <span className="text-label text-text-high">{formatPrice(externalTotal)}</span>
                </div>
              </div>
            </SurfaceCard>
          </section>

          {/* Layer 3: Add-ons */}
          <section>
            <SectionHeader 
              title="Дополнительные услуги" 
              subtitle="Выберите при необходимости"
              className="mb-3"
            />
            <div className="space-y-2">
              {pricing.addOns.map((addOn) => {
                const isSelected = selectedAddOns.has(addOn.label)
                return (
                  <button
                    key={addOn.label}
                    onClick={() => toggleAddOn(addOn.label)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl border transition-fast text-left',
                      isSelected
                        ? 'surface-2 border-accent/30'
                        : 'surface-1 border-border-hairline hover:surface-2'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-fast',
                        isSelected
                          ? 'bg-accent border-accent'
                          : 'border-border-strong'
                      )}>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Plus className="w-4 h-4 text-text-low" />
                        )}
                      </div>
                      <span className="text-body text-text-high">{addOn.label}</span>
                    </div>
                    <span className={cn(
                      'text-body',
                      isSelected ? 'text-accent' : 'text-text-mid'
                    )}>
                      +{formatPrice(addOn.amount)}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Total */}
          <SurfaceCard variant="elevated" className="surface-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-h3 text-text-high">К оплате</span>
              <span className="text-h2 text-accent">{formatPrice(grandTotal)}</span>
            </div>
            <p className="text-caption text-text-low">
              Внешние сборы ({formatPrice(externalTotal)}) оплачиваются отдельно при подаче
            </p>
          </SurfaceCard>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="flex items-center gap-2 text-caption text-text-low">
              <Shield className="w-4 h-4" />
              <span>Безопасная оплата</span>
            </div>
            <div className="flex items-center gap-2 text-caption text-text-low">
              <Lock className="w-4 h-4" />
              <span>Защита данных</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button
            className={cn(
              'flex items-center justify-center gap-2 w-full h-14',
              'rounded-xl bg-accent text-white font-semibold',
              'hover:bg-accent/90 active:scale-[0.98]',
              'transition-fast touch-target',
              'shadow-[0_0_30px_rgba(108,99,255,0.2)]'
            )}
          >
            <CreditCard className="w-5 h-5" />
            Оплатить {formatPrice(grandTotal - externalTotal)}
          </button>
          <p className="text-caption text-text-low text-center mt-3">
            Нажимая кнопку, вы соглашаетесь с условиями оферты
          </p>
        </div>
      </div>
    </AppShell>
  )
}
